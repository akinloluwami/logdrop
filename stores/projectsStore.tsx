import { create } from "zustand";

interface Props {
  projects: {
    name: string;
    apiUrl: string;
    id: number;
  }[];
  addNewProject: (project: { name: string; apiUrl: string; id }) => void;
  setProjects: (
    projects: { name: string; apiUrl: string; id: number }[]
  ) => void;
}

export const useProjectsStore = create<Props>((set) => ({
  projects: [],
  addNewProject: (project) => {
    set((state) => ({ ...state, projects: [...state.projects, project] }));
  },
  setProjects: (projects) => set((state) => ({ ...state, projects })),
}));
