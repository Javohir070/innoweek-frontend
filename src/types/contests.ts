export interface InventionContest {
  id: number;
  name: string;
  image: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  contest_type?: number;
}

export interface TijoratContest {
  id: number;
  name: string;
  image: string;
  start_date: string;
  end_date: string;
  is_available: boolean;
  current_time?: string;
}

export interface InternshipContest {
  id: number;
  name: string;
  image: string;
  start_date: string;
  end_date: string;
  organization?: string;
  contest_type?: number;
}

export interface ContestCardData {
  id: number;
  /** Unique key across APIs (e.g. ixtiro-1, internship-25) */
  key: string;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  detailUrl: string;
}
