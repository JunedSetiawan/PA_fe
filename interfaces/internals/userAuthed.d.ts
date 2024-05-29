declare global {
  type typeUserAccess = {
    feature: string;
    access: number;
  }[];
  interface typeLogSemesterClassStudent {
    class_id?: number;
    level?: 10 | 11 | 12;
    prody?: string;
    short_prody?: string;
    alphabet?: string;
    semester?: 1 | 2;
    year?: number;
  }
  interface typeUserAuthed {
    school_year?: number;
    id?: number;
    name?: string;
    username?: string;
    profile_type?: "Guru" | "Siswa" | "Umum" | "Orang Tua";
    access?: Record<
      string,
      {
        role?: string;
        featureAccesses?: typeUserAccess;
      }
    >;
    history_semester?: Array<typeLogSemesterClassStudent>;
    guru?: {
      name?: string;
      nip?: string;
      work_since?: string;
      work_end?: null | string;
      homeroom_teacher?: {
        class: string;
      };
      lesson_teacher?: {
        lesson: string;
      };
    };
    student?: {
      nisn?: number;
    };
  }
}

export {};
