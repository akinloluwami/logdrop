import { axios } from "@/configs/axios";
import OnboardingLayout from "@/layouts/Onboarding";
import useOnboardingStore from "@/stores/onboardingStore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const Onboarding = () => {
  const { steps, updateSteps, updateCurrentStep } = useOnboardingStore();

  const [name, setName] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledInputs, setDisableInputs] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/onboarding/project");
        if (data.id) {
          setApiUrl(data.apiUrl);
          setName(data.name);
          setDisableInputs(true);
        }
      } catch (error) {}
    })();
  }, []);

  const goToNextStep = () => {
    const updatedSteps = [...steps];
    updatedSteps[0].isDone = true;

    const currentStepIndex = steps.findIndex((step) => step.id === steps[0].id);

    if (currentStepIndex !== -1 && currentStepIndex + 1 < steps.length) {
      updateCurrentStep(steps[currentStepIndex + 1].id);
    }
    updateSteps(updatedSteps);
    router.push(steps[currentStepIndex + 1].route);
  };

  const handleNextClick = async () => {
    if (disabledInputs) {
      goToNextStep();
      return;
    }

    if (!name || !apiUrl) {
      toast.error("Project name and API URL are required");
      return;
    }

    if (apiUrl.includes("http")) {
      toast.error("API URL should not contain http:// or https://");
      return;
    }

    if (apiUrl.includes("www")) {
      toast.error("API URL should not contain www.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/project", {
        name,
        apiUrl,
        from: "onboarding",
      });
      toast.success(data.message);
      goToNextStep();
    } catch (error: any) {
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <OnboardingLayout>
      <div className="">
        <h3 className="text-center text-3xl font-semibold my-4">
          Create your first project.
        </h3>

        <form
          className="flex items-center flex-col gap-5 mt-6 w-[400px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleNextClick();
          }}
        >
          <div className="w-full">
            <p className="font-semibold mb-1">Project name</p>
            <input
              className="w-full rounded-full border border-white/10 py-3 pl-3 pr-5 bg-transparent outline-none focus:border-purple-500 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              type="text"
              value={name}
              placeholder="What's your project called?"
              onChange={(e) => setName(e.target.value)}
              disabled={disabledInputs}
            />
          </div>
          <div className="w-full my-3">
            <p className="font-semibold mb-1">Project URL</p>
            <input
              className="w-full rounded-full border border-white/10 py-3 pl-3 pr-5 bg-transparent outline-none focus:border-purple-500 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
              type="text"
              placeholder="Example: api.logdrop.app or coolapp.io"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value.toLowerCase().trim())}
              disabled={disabledInputs}
            />
          </div>
          <button
            className="font-semibold w-full rounded-full bg-gradient-to-l from-purple-800/90 to-purple-500 py-3 border-2 border-transparent hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <CgSpinner className="animate-spin text-2xl" /> : "Next"}
          </button>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default Onboarding;
