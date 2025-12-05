import { FaExclamationTriangle, FaTimes, FaCheck } from "react-icons/fa";

const mistakes = [
  {
    id: 1,
    title: "The Name Mismatch",
    problem: 'PAN says "Rahul K. Sharma", App says "Rahul Kumar Sharma"',
    fix: "Match PAN exactly",
  },
  {
    id: 2,
    title: "The Blurry Document",
    problem: "Phone photos at angles",
    fix: "Scan properly",
  },
  {
    id: 3,
    title: "The Rent Agreement Flaw",
    problem: "Not on Stamp Paper or expired",
    fix: "Use valid Stamp Paper",
  },
];

const CommonMistakesSection = ()=> {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Why 30% of Applications Get Rejected
        </h2>
        <p className="mt-2 text-muted-foreground">
          Avoid these common mistakes that delay your GST registration
        </p>
      </div>

      <div className="space-y-4">
        {mistakes.map((mistake) => (
          <div
            key={mistake.id}
            className="overflow-hidden rounded-xl border-2 border-destructive/20 bg-destructive/5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b text-red-700 bg-red-100 border-destructive/10  px-5 py-3">
              <FaExclamationTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-destructive">
                {mistake.title}
              </h3>
            </div>

            {/* Body */}
            <div className="p-5 bg-red-90/70">
              <div className="grid gap-4 sm:grid-cols-2 ">
                {/* Problem */}
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <FaTimes className="h-3.5 w-3.5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Problem
                    </p>
                    <p className="text-foreground">{mistake.problem}</p>
                  </div>
                </div>

                {/* Fix */}
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20">
                    <FaCheck className="h-3.5 w-3.5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Fix
                    </p>
                    <p className="text-foreground">{mistake.fix}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommonMistakesSection;
