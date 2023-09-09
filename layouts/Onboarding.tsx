import Link from "next/link";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import useOnboardingStore from "@/stores/onboardingStore";
import { useRouter } from "next/router";
import { CgSpinnerTwo } from "react-icons/cg";
import Logo from "@/components/Logo";
import { axios } from "@/configs/axios";
import Head from "next/head";

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const { steps, currentStepId, updateSteps, isDataFetched, setIsDataFetched } =
    useOnboardingStore();

  const pathname = usePathname();
  const router = useRouter();

  const stepStatusFetch = async () => {
    try {
      const response = await axios("/onboarding");
      return response.data;
    } catch (error) {
      console.error("Error fetching step status:", error);
    }
  };

  useEffect(() => {
    if (!isDataFetched) {
      const fetchDataAndHandleLogic = async () => {
        try {
          const stepStatus = await stepStatusFetch();

          const updatedSteps = steps.map((step, index) => ({
            ...step,
            isDone: stepStatus[index].isDone,
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
      <Head>
        <title>Onboarding • LogDrop</title>
      </Head>
      {isDataFetched ? (
        <div className="py-5">
          <h1 className="text-center text-3xl font-semibold mt-8">
            Hit the ground running.
          </h1>
          <div className="flex items-center justify-center lg:gap-20 gap-5 px-4 mt-10 flex-wrap">
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
