import { create } from "zustand";

interface Props {
  projects: {
    name: string;
    apiUrl: string;
    id: number;
    slug: string;
  }[];
  addNewProject: (project: {
    name: string;
    apiUrl: string;
    id: number;
    slug: string;
  }) => void;
  setProjects: (
    projects: { name: string; apiUrl: string; id: number; slug: string }[]
  ) => void;
  updateProject: (project: {
    name: string;
    apiUrl: string;
    id: number;
    slug: string;
  }) => void;
}

export const useProjectsStore = create<Props>((set) => ({
  projects: [],
  addNewProject: (project) => {
    set((state) => ({ ...state, projects: [...state.projects, project] }));
  },
  setProjects: (projects) => set((state) => ({ ...state, projects })),
  updateProject: (project) => {
    set((state) => ({
      ...state,
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    }));
  },
}));
