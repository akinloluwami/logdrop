import OnboardingLayout from "@/layouts/Onboarding";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Integrate = () => {
  return (
    <OnboardingLayout>
      <div className="flex flex-col items-center">
        <h3 className="text-center text-3xl font-semibold mt-4">
          Let's snapshot your first API request.
        </h3>
        <p className="text-center text-gray-300 mt-1">
          Follow the steps below to let Snaplog capture your first API request.
        </p>

        <div className="flex mt-10 flex-col gap-5">
          <div className="">
            <h2 className="mb-2">1. Install the SDK</h2>
            <div className="bg-white/10 px-2 py-3 rounded-md">
              <code>npm i @snaplog/express</code>
            </div>
          </div>
          <div className="">
            <h2 className="mb-2">
              2. Initialize the middleware with your project ID
            </h2>
            <div className="bg-white/10 px-2 py-3 rounded-md">
              <code>
                <small className="text-gray-500">// 1. Import modules</small>
              </code>{" "}
              <br />
              <code>{`import express from "express"`}</code> <br />
              <code>{`import { snap } from "@snaplog/express"`}</code> <br />{" "}
              <br />
              <code>
                <small className="text-gray-500">
                  // 2. Initialize Express
                </small>
              </code>{" "}
              <br />
              <code>{`const app = express()`}</code> <br />
              <code>{``}</code> <br />
              <code>
                <small className="text-gray-500">
                  // 3. Initialize the Snaplog middleware
                </small>
              </code>{" "}
              <br />
              <code>{`const snapMiddleware = snap("YOUR_PROJECT_ID")`}</code>{" "}
              <br />
              <code>{`app.use(snapMiddleware)`}</code> <br />
              <br />
              <code>
                <small className="text-gray-500">
                  // 4. Send a test request to your API
                </small>
              </code>{" "}
              <br />
              <code>{`app.get("/ping", (req, res) => res.send("Snapshot it!"))`}</code>
            </div>
          </div>
        </div>

        <button className="bg-gradient-to-l from-purple-900 to-purple-500 w-full py-3 text-white px-4 rounded-full mt-10 font-semibold border-2 border-transparent hover:border-white/40 transition-colors">
          Done
        </button>
      </div>
    </OnboardingLayout>
  );
};

export default Integrate;
