import { create } from 'zustand';

interface AssignmentState {
  loading: boolean;

  setLoading: (loading: boolean) => void;
}

export const useAssignmentStore =
  create<AssignmentState>((set) => ({
    loading: false,

    setLoading: (loading) =>
      set({ loading }),
  }));