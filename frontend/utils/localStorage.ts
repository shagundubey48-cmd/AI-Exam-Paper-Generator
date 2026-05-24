import {

  AssignmentData,

} from '@/store/useAssignmentStore';

export interface StoredAssignment
  extends AssignmentData {

  id: number;

  createdAt: string;

}

export const saveAssignment =
  (
    assignment: AssignmentData
  ) => {

    const existing =
      getAssignments();

    existing.unshift({

      id:
        Date.now(),

      createdAt:
        new Date()
          .toLocaleDateString(),

      ...assignment,

    });

    localStorage.setItem(

      'assignments',

      JSON.stringify(
        existing
      )

    );

  };

export const getAssignments =
  (): StoredAssignment[] => {

    if (
      typeof window ===
      'undefined'
    ) {

      return [];

    }

    const data =
      localStorage.getItem(
        'assignments'
      );

    if (!data) {

      return [];

    }

    return JSON.parse(data);

  };

export const deleteAssignment =
  (id: number) => {

    const existing =
      getAssignments();

    const filtered =
      existing.filter(

        (a) =>
          a.id !== id

      );

    localStorage.setItem(

      'assignments',

      JSON.stringify(
        filtered
      )

    );

  };