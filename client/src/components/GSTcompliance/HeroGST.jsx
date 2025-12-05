import { FaFileAlt, FaShieldAlt } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";

const HeroSection = () => {
  const onDownloadClick = () => {
    const pdfURL =
      "https://drive.google.com/uc?export=download&id=1GgCXKp6qI9pF5fNOK58-wfwcElsk8agm";
    const fileName = "GST-ChecklistFile.pdf";

    const link = document.createElement("a");
    link.href = pdfURL;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative overflow-hidden bg-[#0056A4] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          <FaFileAlt className="h-4 w-4" />
          GST Registration Guide
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
          The Ultimate GST Registration Checklist
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          Don't let a missing document delay your business launch.{" "}
          <span className="font-semibold text-white">
            12 Documents You Must Have
          </span>{" "}
          to Avoid Rejection.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={onDownloadClick}
            className="flex items-center cursor-pointer gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all duration-300  hover:bg-gray-50 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <IoDownloadOutline className="h-6 w-6" />
            Download PDF Checklist
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-base text-white/80">
          <div className="flex items-center gap-3 rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
            <FaShieldAlt className="h-5 w-5" />
            <span className="font-medium">100% Free</span>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
            <FaFileAlt className="h-3 w-5" />
            <span className="font-medium">Updated for 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
