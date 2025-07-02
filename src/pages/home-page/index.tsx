import { useNavigate } from "react-router";

const HomePage = () => {
  const lstWindow = [
    { id: 1, title: "Window 1", content: "" },
    { id: 2, title: "Window 2", content: "" },
    { id: 3, title: "Window 3", content: "" },
    { id: 4, title: "Window 4", content: "" },
  ];

  const lstWindow_1 = [
    { id: 1, title: "Extra Window 1", content: "" },
    { id: 2, title: "Extra Window 2", content: "" },
  ];

  const groundHeight = 120;

  const navigate = useNavigate();

  const handleView = (id: number) => {
    navigate(`/painting/${id}`);
  };

  const handleCreate = () => {
    navigate(`/form_page`);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#efe2d3]">
      {/* Logo */}
      <img
        src="/src/assets/images/logo_dark.png"
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
          src="/src/assets/images/house.png"
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
            src="/src/assets/images/door.png"
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
          {/* Row 1: lstWindow */}
          <div className="grid grid-cols-4 w-full gap-6">
            {lstWindow.map((window) => (
              <div
                className="flex flex-col items-center justify-center relative group cursor-pointer"
                key={window.id}
              >
                <img
                  src="/src/assets/images/second_window.png"
                  alt={`window-${window.id}`}
                  className="w-[100px] h-auto"
                />
                <button
                  onClick={() => handleView(window.id)}
                  className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] opacity-0 
          group-hover:translate-y-[-100%] group-hover:opacity-100 
          transition-all duration-500 ease-in-out bg-[#414f08] text-white text-sm px-3 py-1 rounded-full z-30 cursor-pointer"
                >
                  View
                </button>
              </div>
            ))}
          </div>

          {/* Row 2: lstWindow_1 under the first two windows */}
          <div className="grid grid-cols-4 w-full gap-6">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center relative group cursor-pointer"
              >
                {lstWindow_1[index] ? (
                  <>
                    <img
                      src="/src/assets/images/first_window.png"
                      alt={`extra-window-${lstWindow_1[index].id}`}
                      className="w-[100px] h-auto"
                    />
                    <button
                      className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[100%] opacity-0 
              group-hover:translate-y-[-100%] group-hover:opacity-100 
              transition-all duration-500 ease-in-out bg-[#414f08] text-white text-sm px-3 py-1 rounded-full z-30 cursor-pointer"
                    >
                      View
                    </button>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ground */}
      <img
        src="/src/assets/images/ground.png"
        alt="ground"
        className="absolute bottom-0 left-0 w-full z-0"
      />
    </div>
  );
};

export default HomePage;
