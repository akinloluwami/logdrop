import { create } from "zustand";

interface ProjectStore {
  project: {
    name: string;
    id: number | null;
  };
  setProject: (name: string, id: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: {
    name: "",
    id: null,
  },
  setProject: (name, id) => {
    set({ project: { name, id } });
  },
}));
