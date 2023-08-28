import OnboardingLayout from "@/layouts/Onboarding";

const Onboarding = () => {
  return (
    <OnboardingLayout>
      <div className="">
        <h3 className="text-center text-3xl font-semibold my-4">
          Create your first project.
        </h3>

        <form className="flex items-center flex-col gap-5 mt-6 w-[400px]">
          <input
            className="w-full rounded-full border border-white/10 py-3 pl-3 pr-5 bg-transparent outline-none focus:border-purple-500 transition-colors"
            type="text"
            placeholder="What's your project called?"
          />
          <input
            className="w-full rounded-full border border-white/10 py-3 pl-3 pr-5 bg-transparent outline-none focus:border-purple-500 transition-colors"
            type="text"
            placeholder="API base URL"
          />
          <button className="font-semibold w-full rounded-full bg-gradient-to-l from-purple-800/90 to-purple-500 py-3 border-2 border-transparent hover:border-purple-500 transition-colors">
            Next
          </button>
        </form>
      </div>
    </OnboardingLayout>
  );
};

export default Onboarding;
