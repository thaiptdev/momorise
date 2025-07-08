import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
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
}

const HomePage = () => {
  const [paintings, setPaintings] = useState<PaintingData[]>([]);
  const [loading, setLoading] = useState(true);

  const groundHeight = 120;
  const navigate = useNavigate();

  // Fetch paintings from Firebase
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        setLoading(true);

        // Create query to get only active paintings, ordered by status.order
        const paintingsQuery = query(
          collection(db, "paintings"),
          where("status.active", "==", true),
          orderBy("status.order", "asc")
        );

        const querySnapshot = await getDocs(paintingsQuery);
        const paintingsData: PaintingData[] = [];

        querySnapshot.forEach((doc) => {
          paintingsData.push({
            id: doc.id,
            ...doc.data(),
          } as PaintingData);
        });

        setPaintings(paintingsData);
      } catch (err) {
        console.error("Error fetching paintings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  const handleView = (paintingId: string) => {
    navigate(`/painting/${paintingId}`);
  };

  const handleCreate = () => {
    navigate(`/form_page`);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-[#efe2d3] flex items-center justify-center">
        <div className="text-[#414f08] text-xl">Loading paintings...</div>
      </div>
    );
  }

  // Split paintings into two rows for display
  const firstRowPaintings = paintings.slice(0, 4); // First 4 paintings
  const secondRowPaintings = paintings.slice(4, 8); // Next 4 paintings

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#efe2d3]">
      {/* Logo */}
      <img
        src="/images/logo_dark.png"
        alt="logo_dark"
        className="absolute top-10 left-10 w-[150px] h-auto z-20"
      />

      {/* Instruction Text */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-[#414f08] text-lg font-medium bg-[#fff7ed] px-4 py-2 rounded-full shadow-md">
        Click on each window to view each painting
      </div>

      {/* House and Windows */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
        style={{ bottom: `${groundHeight - 20}px` }}
      >
        {/* House */}
        <img
          src="/images/house.png"
          alt="house"
          className="h-auto relative"
          style={{
            transform: "scale(1.2)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Door - aligned to house bottom center with hover button */}
        <div className="absolute bottom-0 left-[53%] transform -translate-x-1/2 z-30 group w-[140px]">
          <img
            src="/images/door.png"
            alt="door"
            className="w-full h-auto cursor-pointer"
          />

          {/* Floating button from bottom to center on hover */}
          <button
            onClick={() => handleCreate()}
            className="absolute left-1/2 top-full translate-x-[-50%] translate-y-0 opacity-0
               group-hover:top-1/2 group-hover:translate-y-[-50%] group-hover:opacity-100
               transition-all duration-500 ease-in-out bg-[#414f08] text-white text-sm px-4 py-1 
               rounded-full z-30 whitespace-nowrap cursor-pointer"
          >
            Create Your Own
          </button>
        </div>

        {/* Windows over the house */}
        <div className="absolute bottom-[-80px] left-0 w-full h-full flex flex-col space-y-6 items-center gap-4 z-20">
          {/* Row 1: First 4 paintings */}
          <div className="grid grid-cols-4 w-full gap-6">
            {[0, 1, 2, 3].map((index) => {
              const painting = firstRowPaintings[index];
              return (
                <div
                  className="flex flex-col items-center justify-center relative group cursor-pointer"
                  key={index}
                >
                  <img
                    src="/images/second_window.png"
                    alt={`window-${index + 1}`}
                    className="w-[100px] h-auto"
                  />
                  {painting && (
                    <button
                      onClick={() => handleView(painting.id)}
                      className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] opacity-0 
                        group-hover:translate-y-[-100%] group-hover:opacity-100 
                        transition-all duration-500 ease-in-out bg-[#414f08] text-white text-sm px-3 py-1 rounded-full z-30 cursor-pointer"
                    >
                      View
                    </button>
                  )}
                  {!painting && (
                    <div
                      className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] opacity-0 
                      group-hover:translate-y-[-100%] group-hover:opacity-100 
                      transition-all duration-500 ease-in-out bg-gray-400 text-white text-sm px-3 py-1 rounded-full z-30 cursor-not-allowed"
                    >
                      No Painting
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Row 2: Next 4 paintings */}
          <div className="grid grid-cols-4 w-full gap-6">
            {[0, 1, 2, 3].map((index) => {
              const painting = secondRowPaintings[index];
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center relative group cursor-pointer"
                >
                  {painting ? (
                    <>
                      <img
                        src="/images/first_window.png"
                        alt={`extra-window-${index + 1}`}
                        className="w-[100px] h-auto"
                      />
                      <button
                        onClick={() => handleView(painting.id)}
                        className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] opacity-0 
                          group-hover:translate-y-[-100%] group-hover:opacity-100 
                          transition-all duration-500 ease-in-out bg-[#414f08] text-white text-sm px-3 py-1 rounded-full z-30 cursor-pointer"
                      >
                        View
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src="/images/first_window.png"
                        alt={`empty-window-${index + 1}`}
                        className="w-[100px] h-auto opacity-50"
                      />
                      <div
                        className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] opacity-0 
                        group-hover:translate-y-[-100%] group-hover:opacity-100 
                        transition-all duration-500 ease-in-out bg-gray-400 text-white text-sm px-3 py-1 rounded-full z-30 cursor-not-allowed"
                      >
                        No Painting
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ground */}
      <img
        src="/images/ground.png"
        alt="ground"
        className="absolute bottom-0 left-0 w-full z-0"
      />
    </div>
  );
};

export default HomePage;
