import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/home-page";
import PaintingPage from "./pages/painting-page";
import FormPage from "./pages/form_page";

function LandingPage() {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/home");
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Background image */}
      <img
        src="/images/bg_homepage.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="flex flex-col items-start text-left max-w-6xl w-full">
          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full mb-6 max-w-3xl sm:max-w-2xl md:max-w-xl"
          />

          {/* Description text */}
          <p className="text-[#F7EDE4] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 leading-snug">
            An online gallery honoring the beauty of family women and their
            silent sacrifice for their families.
          </p>

          {/* View button */}
          <div className="w-full flex justify-end">
            <button
              onClick={handleViewClick}
              className="bg-[#414f08] text-[#F7EDE4] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-6 sm:px-8 md:px-10 lg:px-12 py-2 rounded-full transition hover:cursor-pointer"
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-[#999213] text-base sm:text-lg md:text-xl lg:text-2xl z-10">
        Brought to you by The Artist of the Ordinary
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/form_page" element={<FormPage />} />
      <Route path="/painting/:id" element={<PaintingPage />} />
    </Routes>
  );
}
