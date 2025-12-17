import { HiOutlineDocumentText, HiOutlineExternalLink } from "react-icons/hi";

export default function DocumentGenerator() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-xl w-full rounded-2xl bg-white shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-3xl">
            <HiOutlineDocumentText />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Automated Document Generator
        </h1>

        <p className="text-gray-600 mb-6">
          Instantly generate legally formatted documents such as Lease
          Agreements, NOCs, and Company Declarations using our automated
          workflow.
        </p>

        <a
          href="https://ai.assetsense.in/form/f3a0a382-186f-4ccc-8b12-831716085d25"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
        >
          <HiOutlineExternalLink className="text-lg" />
          Open Document Generator
        </a>

        <p className="text-xs text-gray-400 mt-6">
          Powered by n8n · Google Docs · Automation
        </p>
      </div>
    </div>
  );
}
