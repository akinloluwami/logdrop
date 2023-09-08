import OnboardingLayout from "@/layouts/Onboarding";
import Link from "next/link";
import React from "react";

const Ready = () => {
  return (
    <OnboardingLayout>
      <div className="w-full px-5">
        <h3 className="text-center text-3xl font-semibold mt-4">
          You're all set.
        </h3>
        <center>
          <Link href={"/overview"} className="w-full lg:w-[450px]">
            <button className="w-full lg:w-[450px] bg-gradient-to-l from-purple-900 to-purple-500 py-3 text-white px-4 rounded-full mt-10 font-semibold">
              Continue to Dashboard
            </button>
          </Link>
        </center>
      </div>
    </OnboardingLayout>
  );
};

export default Ready;
