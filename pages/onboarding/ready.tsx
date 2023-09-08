import OnboardingLayout from "@/layouts/Onboarding";
import Link from "next/link";
import React from "react";

const Ready = () => {
  return (
    <OnboardingLayout>
      <div className="flex flex-col itesm-center px-5 w-full">
        <h3 className="text-center text-3xl font-semibold mt-4">
          You're all set.
        </h3>
        <Link href={"/overview"}>
          <button className="bg-gradient-to-l from-purple-900 to-purple-500 w-full py-3 text-white px-4 rounded-full mt-10 font-semibold">
            Continue to Dashboard
          </button>
        </Link>
      </div>
    </OnboardingLayout>
  );
};

export default Ready;
