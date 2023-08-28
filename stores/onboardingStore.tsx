import { create } from "zustand";

interface Step {
  id: string;
  title: string;
  route: string;
  isDone: boolean;
}

interface OnboardingState {
  steps: Step[];
  currentStepId: string;
  updateSteps: (newSteps: Step[]) => void;
  updateCurrentStep: (newCurrentStepId: string) => void;
}

const useOnboardingStore = create<OnboardingState>((set) => ({
  steps: [
    { id: "step1", title: "Get started", route: "/onboarding", isDone: false },
    {
      id: "step2",
      title: "Integrate",
      route: "/onboarding/integrate",
      isDone: false,
    },
    { id: "step3", title: "Ready!", route: "/onboarding/ready", isDone: false },
  ],
  currentStepId: "step1",

  updateSteps: (newSteps) => set((state) => ({ steps: newSteps })),
  updateCurrentStep: (newCurrentStepId) =>
    set((state) => ({ currentStepId: newCurrentStepId })),
}));

export default useOnboardingStore;
