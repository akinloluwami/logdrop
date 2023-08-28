import OnboardingLayout from "@/layouts/Onboarding";
import Link from "next/link";
import React from "react";

const Ready = () => {
  return (
    <OnboardingLayout>
      <div className="flex flex-col itesm-center">
        <h3 className="text-center text-3xl font-semibold mt-4">
          You're all set.
        </h3>
        <Link href={"/dashboard"}>
          <button className="mt-6 w-[450px] font-semibold rounded-full bg-gradient-to-r from-purple-900 to-purple-500 py-3 text-white transition-colors border-2 border-transparent hover:border-white/40">
            Continue to Dashboard
          </button>
        </Link>
      </div>
    </OnboardingLayout>
  );
};

export default Ready;
