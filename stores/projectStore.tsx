import { create } from "zustand";

interface ProjectStore {
  project: {
    name: string;
    apiUrl: string;
    id: number | null;
  };
  setProject: (name: string, id: number, apiUrl: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: {
    id: null,
    name: "",
    apiUrl: "",
  },
  setProject: (name, id, apiUrl) => {
    set({ project: { name, id, apiUrl } });
  },
}));
