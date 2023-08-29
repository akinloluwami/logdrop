import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useOnboardingStore from "@/stores/onboardingStore";
import { useRouter } from "next/router";
import { CgSpinnerTwo } from "react-icons/cg";
import Logo from "@/components/Logo";

const simulateStepStatusFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const simulatedData = [
        { isDone: true },
        { isDone: true },
        { isDone: true },
      ];
      resolve(simulatedData);
    }, 5000);
  });
};

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const { steps, currentStepId, updateSteps, isDataFetched, setIsDataFetched } =
    useOnboardingStore();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isDataFetched) {
      const fetchDataAndHandleLogic = async () => {
        try {
          const simulatedData = await simulateStepStatusFetch();

          // Update the "isDone" status for each step based on the simulated data
          const updatedSteps = steps.map((step, index) => ({
            ...step,
            isDone: simulatedData[index].isDone,
          }));

          updateSteps(updatedSteps);
          setIsDataFetched(true);
          console.log("Something");
        } catch (error) {
          console.error("Error fetching step status:", error);
        }
      };
      fetchDataAndHandleLogic();
    }
  }, []);

  useEffect(() => {
    if (isDataFetched) {
      if (pathname === "/onboarding/integrate" && !steps[0].isDone) {
        router.push(steps[0].route);
      }

      if (pathname === "/onboarding/ready" && !steps[0].isDone) {
        router.push(steps[1].route);
      }

      if (pathname === "/onboarding/ready" && !steps[1].isDone) {
        router.push(steps[1].route);
      }
    }
  }, [router, pathname, isDataFetched]);

  return (
    <>
      {isDataFetched ? (
        <div className="py-5">
          <h1 className="text-center text-3xl font-semibold mt-8">
            Hit the ground running.
          </h1>
          <div className="flex items-center justify-center gap-20 mt-10">
            {steps.map((step, i) => (
              <Link
                onClick={(e) => {
                  !step.isDone &&
                    step.id !== currentStepId &&
                    e.preventDefault();
                }}
                href={step.route}
                className={`group flex items-center gap-2 font-semibold ${
                  !step.isDone && step.id !== currentStepId
                    ? "opacity-60 cursor-not-allowed"
                    : "opacity-100"
                }`}
                key={i}
              >
                <div className="bg-gradient-to-tl from-purple-800 flex items-center justify-center text-2xl to-purple-500 text-white rounded-full w-12 h-12">
                  {i + 1}
                </div>
                <p className="group-hover:text-purple-200">{step.title}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-5">{children}</div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-5 h-screen">
          <Logo />
          <CgSpinnerTwo className="animate-spin mr-2" size={50} />
        </div>
      )}
    </>
  );
};

export default OnboardingLayout;
