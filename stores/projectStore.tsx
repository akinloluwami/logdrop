import { create } from "zustand";

interface ProjectStore {
  project: {
    name: string;
    apiUrl: string;
    id: number | null;
    slug: string;
  };
  setProject: (name: string, id: number, apiUrl: string, slug: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: {
    id: null,
    name: "",
    apiUrl: "",
    slug: "",
  },
  setProject: (name, id, apiUrl, slug) => {
    set({ project: { name, id, apiUrl, slug } });
  },
}));
