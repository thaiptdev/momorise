import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { paintingData } from "../../data/paintingData";

const PaintingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ids = Object.keys(paintingData).sort();
  const currentIndex = id ? ids.indexOf(id) : -1;
  const prevId = currentIndex > 0 ? ids[currentIndex - 1] : null;
  const nextId = currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null;

  const data = id ? paintingData[id] : undefined;

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#efe2d3] p-4 md:p-8 flex flex-col">
      {/* Top Left Section: Logo + Back Button */}
      <div className="flex flex-col items-start gap-4 mb-4">
        <img
          src="/src/assets/images/logo_dark.png"
          alt="logo"
          className="w-[100px] md:w-[150px] h-auto"
          //   className="absolute top-10 left-10 w-[150px] h-auto z-20"
        />

        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746] 
            transition-all duration-300 ease-in-out transform hover:scale-105 
            rounded-full px-4 py-2 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Main Content Area */}
      {data ? (
        <div className="flex flex-col md:flex-row gap-6 overflow-hidden flex-1">
          {/* Image Section */}
          <div className="md:flex-[3] flex items-center justify-center">
            <img
              src={data.image}
              alt="painting"
              className="w-full max-w-[90%] md:max-w-[90%] h-auto rounded-[30px] border-4 border-[#414F08] shadow-xl"
            />
          </div>

          {/* Text Section */}
          <div className="md:flex-[2] flex flex-col justify-center px-2 md:px-4 overflow-hidden">
            <h2 className="text-[#414F08] text-4xl md:text-6xl text-center mb-2">
              “{data.title}”
            </h2>
            <h4 className="text-center text-[#414F08] text-lg md:text-2xl mb-2">
              <span className="custom-font">Story from </span>
              <span className="custom-font font-bold">{data.author}</span>
            </h4>
            <div className="text-[#414f08] text-base md:text-lg text-justify overflow-auto max-h-[40vh] md:max-h-[50vh] pr-2">
              {data.content}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                disabled={!prevId}
                onClick={() => prevId && navigate(`/painting/${prevId}`)}
                className="flex items-center gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746]
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  rounded-full px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft />
              </button>
              <button
                disabled={!nextId}
                onClick={() => nextId && navigate(`/painting/${nextId}`)}
                className="flex items-center gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746]
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  rounded-full px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[#414f08] text-lg">Painting not found.</p>
      )}
    </div>
  );
};

export default PaintingPage;
