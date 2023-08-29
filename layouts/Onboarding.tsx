import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import useOnboardingStore from "@/stores/onboardingStore";

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  const { steps, currentStepId } = useOnboardingStore();

  return (
    <div className="py-5">
      <h1 className="text-center text-3xl font-semibold mt-8">
        Hit the ground running.
      </h1>
      <div className="flex items-center justify-center gap-20 mt-10">
        {steps.map((step, i) => (
          <Link
            onClick={(e) => {
              !step.isDone && step.id !== currentStepId && e.preventDefault();
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
  );
};

export default OnboardingLayout;
