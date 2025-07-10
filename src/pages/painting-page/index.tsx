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
    <div className="w-screen h-screen bg-[#efe2d3] flex flex-col">
      {/* Top Left Section: Logo + Back Button - Fixed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-2 sm:gap-4 p-2 sm:p-4 md:p-6 flex-shrink-0 z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <img
            src="/images/logo_dark.png"
            alt="logo"
            className="w-[80px] sm:w-[100px] md:w-[150px] h-auto"
          />

          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746] 
              transition-all duration-300 ease-in-out transform hover:scale-105 
              rounded-full px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="sm:hidden" />
            <ArrowLeft size={20} className="hidden sm:block" />
            Back
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {currentPainting ? (
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 lg:gap-6 overflow-hidden flex-1 min-h-0 px-2 sm:px-4 md:px-6 pb-2 sm:pb-4 md:pb-6">
          {/* Image Section */}
          <div
            className={`flex items-center justify-center flex-shrink-0 ${
              isVertical
                ? "flex-1 lg:flex-[2] min-h-0" // Less space for vertical images
                : "flex-1 lg:flex-[3] min-h-0" // More space for horizontal images
            }`}
          >
            <img
              src={currentPainting.thumbnail}
              alt="painting"
              className={`rounded-[15px] sm:rounded-[20px] md:rounded-[30px] border-2 sm:border-4 border-[#414F08] shadow-xl object-contain ${
                isVertical
                  ? "w-auto h-full max-h-[35vh] sm:max-h-[45vh] lg:max-h-[75vh] max-w-[95%]" // Reduced max-height for better fit
                  : "max-w-[95%] max-h-[35vh] sm:max-h-[45vh] lg:max-h-[75vh] w-auto h-auto" // Reduced max-height for better fit
              }`}
            />
          </div>

          {/* Text Section */}
          <div
            className={`flex flex-col justify-center px-1 sm:px-2 md:px-4 overflow-hidden min-h-0 ${
              isVertical
                ? "flex-1 lg:flex-[3]" // More space for text when image is vertical
                : "flex-1 lg:flex-[2]" // Less space for text when image is horizontal
            }`}
          >
            <h2
              className={`text-[#414F08] text-center mb-1 sm:mb-2 leading-tight ${
                isVertical
                  ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" // Smaller text for vertical layout
                  : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" // Larger text for horizontal layout
              }`}
            >
              "{currentPainting.title}"
            </h2>
            <h4
              className={`text-center text-[#414F08] mb-1 sm:mb-2 ${
                isVertical
                  ? "text-sm sm:text-base md:text-lg lg:text-xl" // Smaller subtitle for vertical layout
                  : "text-base sm:text-lg md:text-xl lg:text-2xl" // Larger subtitle for horizontal layout
              }`}
            >
              <span className="custom-font">Story from </span>
              <span className="custom-font font-bold">
                {currentPainting.author}
              </span>
            </h4>
            <div
              className={`text-[#414f08] text-justify overflow-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-[#414f08] scrollbar-track-transparent flex-1 min-h-0 ${
                isVertical
                  ? "text-xs sm:text-sm md:text-base" // Smaller text for vertical
                  : "text-sm sm:text-base md:text-lg" // Larger text for horizontal
              }`}
            >
              {currentPainting.content}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 flex-shrink-0">
              <button
                disabled={!prevPainting}
                onClick={() =>
                  prevPainting && navigate(`/painting/${prevPainting.id}`)
                }
                className="flex items-center gap-1 sm:gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746]
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  rounded-full px-3 py-1.5 sm:px-4 sm:py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="sm:hidden" />
                <ArrowLeft size={20} className="hidden sm:block" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <button
                disabled={!nextPainting}
                onClick={() =>
                  nextPainting && navigate(`/painting/${nextPainting.id}`)
                }
                className="flex items-center gap-1 sm:gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746]
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  rounded-full px-3 py-1.5 sm:px-4 sm:py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight size={16} className="sm:hidden" />
                <ArrowRight size={20} className="hidden sm:block" />
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
