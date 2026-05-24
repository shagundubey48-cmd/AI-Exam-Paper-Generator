export interface StoredAssignment {

  id: number;

  title: string;

  createdAt: string;

  data: any;

}

const KEY =
  'veda_assignments';

export const saveAssignment =
  (
    assignment: StoredAssignment
  ) => {

    if (
      typeof window ===
      'undefined'
    )
      return;

    const existing =
      getAssignments();

    localStorage.setItem(

      KEY,

      JSON.stringify([

        assignment,

        ...existing,

      ])

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
        KEY
      );

    return data
      ? JSON.parse(data)
      : [];

  };

export const deleteAssignment =
  (id: number) => {

    const existing =
      getAssignments();

    const updated =
      existing.filter(

        (a) =>
          a.id !== id

      );

    localStorage.setItem(

      KEY,

      JSON.stringify(
        updated
      )

    );

  };