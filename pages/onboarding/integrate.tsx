import OnboardingLayout from "@/layouts/Onboarding";
import useOnboardingStore from "@/stores/onboardingStore";
import { useRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { axios } from "@/configs/axios";
import { BiCopy } from "react-icons/bi";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { toast } from "react-hot-toast";

const Integrate = () => {
  const { steps, updateSteps, updateCurrentStep } = useOnboardingStore();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

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
      <div className="flex flex-col items-center px-5">
        <h3 className="text-center text-3xl font-semibold mt-4">
          Let's record your first API request.
        </h3>
        <p className="text-center text-gray-300 mt-1">
          Follow the steps below to let LogDrop record your first API request.
        </p>

        <div className="flex mt-10 flex-col gap-5 w-full">
          <div className="">
            <div className="absolute">Click here</div>
            <h2 className="mb-2">1. Install the SDK</h2>
            <div className="bg-white/10 px-2 py-3 rounded-md flex items-center justify-between">
              <code>npm i @logdrop/express</code>{" "}
              <button
                onClick={() => {
                  copyToClipboard("npm i @logdrop/express");
                  toast("Copied to clipboard", {
                    duration: 800,
                  });
                }}
              >
                <BiCopy />
              </button>
            </div>
          </div>
          <div className="">
            <h2 className="mb-2">
              2. Initialize the middleware with your API key
            </h2>
            <div className="bg-white/10 px-2 py-3 rounded-md relative">
              {!isClicked && (
                <>
                  <div className="absolute top-1 -right-28 rounded-md p-1 animate-knock bg-purple-800 hidden lg:block">
                    👈🏼 Click here
                  </div>
                  <div className="absolute top-10 right-0 rounded-md p-1 animate-bounce bg-purple-800 lg:hidden">
                    👆🏼 Click here
                  </div>
                </>
              )}
              <button
                className="absolute top-2 right-2 flex items-center text-sm gap-1"
                onClick={() => {
                  setIsClicked(true);
                  copyToClipboard(apiKey);
                  toast.success("API key copied to clipboard", {
                    duration: 1000,
                  });
                }}
              >
                <BiCopy />
                Copy API Key
              </button>
              <code>
                <small className="text-gray-500">// 1. Import modules</small>
              </code>{" "}
              <br />
              <code>{`import express from "express"`}</code> <br />
              <code>{`import { record } from "@logdrop/node"`}</code> <br />{" "}
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
                  // 3. Initialize the LogDrop middleware
                </small>
              </code>
              <br />
              <code>{`app.use(record("YOUR_API_KEY"))`}</code> <br />
              <br />
              <code>
                <small className="text-gray-500">
                  // 4. Send a test request to your API
                </small>
              </code>{" "}
              <br />
              <code>{`app.get("/ping", (req, res) => res.send("Pong!"))`}</code>
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
