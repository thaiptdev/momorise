import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FormPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-[#efe2d3] p-4 md:p-8 overflow-x-hidden">
      <div className="flex flex-col h-full items-start gap-4">
        {/* Logo */}
        <img
          src="/src/assets/images/logo_dark.png"
          alt="logo"
          className="w-[100px] md:w-[150px] h-auto"
        />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#414f08] bg-[#D0D354] hover:bg-[#c3c746] 
            transition-all duration-300 ease-in-out transform hover:scale-105 
            rounded-full px-4 py-2 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Background Image */}
        <img
          src="/src/assets/images/form_bg.png"
          alt="form background"
          className="w-full max-w-[1100px] mx-auto"
        />

        {/* Main Content - overlapping the image slightly */}
        <div className="-mt-24 w-full flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col space-y-8">
            {/* Heading and Description */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-4xl md:text-8xl text-[#414F08]">
                CREATE YOUR <br /> OWN GIFT
              </h2>

              <p className="text-3xl text-[#6C7016]">
                If you are interested in my artworks and also want to have your
                own painting, please fill in the form below.
              </p>
            </div>

            {/* Form Box */}
            <div className="border-[3px] border-[#385E10] rounded-[20px] p-6 md:p-10 bg-[#efe2d3]">
              <form className="flex flex-col space-y-6 text-[#414F08] text-lg">
                {/* Name */}
                <div className="flex flex-col">
                  <label className="italic mb-2 pl-4 text-[#6C7016]">
                    Name
                  </label>
                  <input
                    type="text"
                    className="rounded-full bg-[#B7B748] px-4 py-2 outline-none"
                  />
                </div>

                {/* Number & Email */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex flex-col flex-1">
                    <label className="italic mb-2 pl-4 text-[#6C7016]">
                      Number
                    </label>
                    <input
                      type="text"
                      className="rounded-full bg-[#B7B748] px-4 py-2 outline-none"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="italic mb-2 pl-4 text-[#6C7016]">
                      Email
                    </label>
                    <input
                      type="email"
                      className="rounded-full bg-[#B7B748] px-4 py-2 outline-none"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col">
                  <label className="italic mb-2 pl-4 text-[#6C7016]">
                    Address
                  </label>
                  <input
                    type="text"
                    className="rounded-full bg-[#B7B748] px-4 py-2 outline-none"
                  />
                </div>

                {/* Social Media */}
                <div className="flex flex-col">
                  <label className="italic mb-2 pl-4 text-[#6C7016]">
                    Social Media (any kind)
                  </label>
                  <input
                    type="text"
                    className="rounded-full bg-[#B7B748] px-4 py-2 outline-none"
                  />
                </div>

                <hr className="border-[#385E10] my-4" />

                {/* Story */}
                <div className="flex flex-col">
                  <label className="italic mb-2 pl-4 text-[#6C7016]">
                    Please tell me about your story
                  </label>
                  <textarea
                    rows={10}
                    className="rounded-[30px] bg-[#B7B748] px-4 py-2 outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="w-full flex items-center justify-end">
                  <button
                    type="submit"
                    className="bg-[#385E10] text-[#FCE3C5] rounded-full px-6 py-3 w-fit self-center mt-4 hover:bg-[#2e3905] transition font-bold uppercase"
                  >
                    Submit
                  </button>
                </div>

                {/* Footer Note */}
                <p className="text-center text-lg mt-4 text-[#6C701699] italic">
                  A customized Gift Set costs 150.000 VND
                  <br />A confirmation email will be sent to your email after
                  your submission.
                </p>
              </form>
            </div>

            <p className="text-[#6C7016] font-bold text-3xl text-center">
              Let me help you to cherish your own “momories”!
            </p>

            <p className="text-center text-[#999213] text-xl">
              Brought to you by The Artist of the Ordinary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
