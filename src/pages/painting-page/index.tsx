/* eslint-disable react-hooks/rules-of-hooks */
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path as needed

// Type definitions for your painting data
interface PaintingData {
  id: string;
  title: string;
  author: string;
  style: "vertical" | "horizontal";
  thumbnail: string;
  content: string;
  status: {
    active: boolean;
    order: number;
  };
  image?: string; // Adding this since your current code uses data.image
}

const PaintingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [paintings, setPaintings] = useState<PaintingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch paintings from Firebase
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        setLoading(true);

        // Get all paintings from the collection
        const paintingsQuery = query(collection(db, "paintings"));
        const querySnapshot = await getDocs(paintingsQuery);
        const paintingsData: PaintingData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<PaintingData, "id">;
          paintingsData.push({
            id: doc.id,
            ...data,
          });
        });

        // Filter only active paintings and sort by order in JavaScript
        const activePaintings = paintingsData
          .filter((painting) => painting.status.active === true)
          .sort((a, b) => a.status.order - b.status.order);

        setPaintings(activePaintings);
      } catch (err) {
        console.error("Error fetching paintings:", err);
        setError("Failed to load paintings");
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  // Debug: Log the data to see what's happening
  console.log("URL ID:", id);
  console.log("Paintings:", paintings);
  console.log(
    "Painting IDs:",
    paintings.map((p) => p.id)
  );

  // Get current painting and navigation info
  const currentIndex = paintings.findIndex((painting) => painting.id === id);
  const currentPainting = currentIndex !== -1 ? paintings[currentIndex] : null;
  const prevPainting = currentIndex > 0 ? paintings[currentIndex - 1] : null;
  const nextPainting =
    currentIndex < paintings.length - 1 ? paintings[currentIndex + 1] : null;

  // More debug info
  console.log("Current index:", currentIndex);
  console.log("Current painting:", currentPainting);

  // Loading state
  if (loading) {
    return (
      <div className="w-screen h-screen overflow-hidden bg-[#efe2d3] p-4 md:p-8 flex items-center justify-center">
        <div className="text-[#414f08] text-xl">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-screen h-screen overflow-hidden bg-[#efe2d3] p-4 md:p-8 flex items-center justify-center">
        <div className="text-[#414f08] text-xl">{error}</div>
      </div>
    );
  }

  // Determine if the current painting is vertical
  const isVertical = currentPainting?.style === "vertical";

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#efe2d3] p-4 md:p-8 flex flex-col">
      {/* Top Left Section: Logo + Back Button */}
      <div className="flex flex-col items-start gap-4 mb-4">
        <img
          src="/images/logo_dark.png"
          alt="logo"
          className="w-[100px] md:w-[150px] h-auto"
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
      {currentPainting ? (
        <div
          className={`flex gap-6 overflow-hidden flex-1 ${
            isVertical ? "flex-col md:flex-row" : "flex-col md:flex-row"
          }`}
        >
          {/* Image Section */}
          <div
            className={`flex items-center justify-center ${
              isVertical
                ? "md:flex-[2]" // Less space for vertical images
                : "md:flex-[3]" // More space for horizontal images
            }`}
          >
            <img
              src={currentPainting.thumbnail}
              alt="painting"
              className={`rounded-[30px] border-4 border-[#414F08] shadow-xl ${
                isVertical
                  ? "w-auto h-full max-h-[70vh] md:max-h-[85vh] max-w-[90%]" // Vertical: constrain by height
                  : "w-full max-w-[90%] md:max-w-[90%] h-auto max-h-[70vh] md:max-h-[85vh]" // Horizontal: constrain by width
              }`}
            />
          </div>

          {/* Text Section */}
          <div
            className={`flex flex-col justify-center px-2 md:px-4 overflow-hidden ${
              isVertical
                ? "md:flex-[3]" // More space for text when image is vertical
                : "md:flex-[2]" // Less space for text when image is horizontal
            }`}
          >
            <h2
              className={`text-[#414F08] text-center mb-2 ${
                isVertical
                  ? "text-3xl md:text-4xl lg:text-5xl" // Smaller text for vertical layout
                  : "text-4xl md:text-6xl" // Larger text for horizontal layout
              }`}
            >
              "{currentPainting.title}"
            </h2>
            <h4
              className={`text-center text-[#414F08] mb-2 ${
                isVertical
                  ? "text-lg md:text-xl" // Smaller subtitle for vertical layout
                  : "text-lg md:text-2xl" // Larger subtitle for horizontal layout
              }`}
            >
              <span className="custom-font">Story from </span>
              <span className="custom-font font-bold">
                {currentPainting.author}
              </span>
            </h4>
            <div
              className={`text-[#414f08] text-justify overflow-auto pr-2 ${
                isVertical
                  ? "text-sm md:text-base max-h-[30vh] md:max-h-[40vh]" // Smaller text and less height for vertical
                  : "text-base md:text-lg max-h-[40vh] md:max-h-[50vh]" // Larger text and more height for horizontal
              }`}
            >
              {currentPainting.content}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                disabled={!prevPainting}
                onClick={() =>
                  prevPainting && navigate(`/painting/${prevPainting.id}`)
                }
                className="flex items-center gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746]
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  rounded-full px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft />
              </button>
              <button
                disabled={!nextPainting}
                onClick={() =>
                  nextPainting && navigate(`/painting/${nextPainting.id}`)
                }
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
