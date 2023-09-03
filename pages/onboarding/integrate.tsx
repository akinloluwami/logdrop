import OnboardingLayout from "@/layouts/Onboarding";
import useOnboardingStore from "@/stores/onboardingStore";
import { useRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { axios } from "@/configs/axios";

const Integrate = () => {
  const { steps, updateSteps, updateCurrentStep } = useOnboardingStore();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/onboarding/api-key");
        setApiKey(data.key);
      } catch (error) {}
    })();
  }, []);

  const handleNext = () => {
    const updatedSteps = [...steps];
    updatedSteps[1].isDone = true;

    const currentStepIndex = steps.findIndex((step) => step.id === steps[1].id);

    if (currentStepIndex !== -1 && currentStepIndex + 1 < steps.length) {
      updateCurrentStep(steps[currentStepIndex + 1].id);
    }
    updateSteps(updatedSteps);
    router.push(steps[currentStepIndex + 1].route);
  };

  let emptyResponseCounter = 0;

  const checkIntegration = async () => {
    try {
      const { data } = await axios("/onboarding/integration");
      return { data };
    } catch (error) {}
  };

  const handleVerifyIntegration = () => {
    setLoading(true);

    const makeAPICall = () => {
      checkIntegration()
        .then((response: any) => {
          if (response.data.logs.length === 0) {
            setTimeout(makeAPICall, 5000);
          } else {
            handleNext();
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    };

    makeAPICall();
  };

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
              <code>{`const snapMiddleware = snap("${apiKey}")`}</code> <br />
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

        <button
          className="bg-gradient-to-l from-purple-900 to-purple-500 w-full py-3 text-white px-4 rounded-full mt-10 font-semibold border-2 border-transparent hover:border-white/40 transition-colors flex items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed"
          onClick={handleVerifyIntegration}
          disabled={loading || steps[1].isDone}
        >
          {!steps[1].isDone ? (
            loading ? (
              <>
                <CgSpinnerTwo className="animate-spin mr-2" size={20} />{" "}
                Verifying integration...
              </>
            ) : (
              "Verify Integration"
            )
          ) : (
            <>
              <HiOutlineCheckCircle className="mr-2" size={20} />
              Integration verified
            </>
          )}
        </button>
      </div>
    </OnboardingLayout>
  );
};

export default Integrate;
