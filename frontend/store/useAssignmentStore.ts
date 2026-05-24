interface Question {

  question: string;

  difficulty: string;

  marks: number;

  options?: string[];

  answer: string;

}

interface Section {

  title: string;

  instruction: string;

  questions: Question[];

}

export interface AssignmentData {

  title: string;

  schoolName: string;

  subject: string;

  time: string;

  maxMarks: number;

  totalQuestions: number;

  totalMarks: number;

  sections: Section[];

}

import { create }
from 'zustand';

interface AssignmentState {

  generatedData:
    AssignmentData | null;

  setGeneratedData: (
    data: AssignmentData
  ) => void;

}

export const useAssignmentStore =
  create<AssignmentState>(

    (set) => ({

      generatedData: null,

      setGeneratedData:
        (data) =>

          set({

            generatedData:
              data,

          }),

    })

  );