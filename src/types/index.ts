export interface IPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface INewsGalleryItem {
  id: number;
  news_id: number;
  image: string;
  order: number;
  image_url: string;
}

export interface INewsListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  poster: string | null;
  created_at: string;
  gallery?: INewsGalleryItem[];
}
export interface IResponse<T> {
  status: number;
  success: boolean;
  data: T;
  pagination: IPagination;
}

export interface IExpertOpinion {
  id: number;
  full_name: string;
  title: string;
  image: string;
  country_id: number;
  is_active: boolean;
  created_at: string;
  country: {
    id: number;
    name_uz: string;
    name_en: string;
    name_ru: string;
  } | null;
}

export interface CountryObj {
  name_uz?: string;
  name_en?: string;
  name_ru?: string;
}

export interface ISpeakerItem {
  id: number;
  full_name: string;
  position: string;
  image: string;
  country_id: number;
  type: string;
  created_at: string;
  country: {
    id: number;
    user_id: number;
    name_uz: string;
    name_en: string;
    name_ru: string;
    state_code: string | null;
    phone_code: string | null;
    flag: string | null;
    status: string;
    created_at: string | null;
    updated_at: string | null;
  } | null;
}

export interface IGalleryItem {
  id: number;
  image: string;
  status: string;
  archive_id: number;
  created_at: string;
}

export interface IProfessionItem {
  id: number;
  name: string;
  status: string;
  created_at: string;
}

export interface ICountryItem {
  id: number;
  name: string;
}

export interface IRegisterFormType {
  firstName: string;
  lastName: string;
  phone: string;
  profession_id: string;
  birth_date: string;
  gender: string;
  email?: string;
  country?: string;
  organization?: string;
  password: string;
  password_confirmation: string;
  acceptTerms?: boolean;
}

export interface IValidateResponce {
  status: number;
  success: boolean;
  message: string;
  data: {
    auth_key: string;
  };
}

export interface IComplateResponce {
  status: number;
  success: boolean;
  message: string;
}

export interface ITicketItem {
  id: number;
  first_name: string;
  last_name: string;
  status: string;
  ticket: {
    id: number;
    user_id: number;
    archive_id: number;
    ticket_id: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ITicketDetail {
  id: 10518;
  user_id: 10893;
  archive_id: 7;
  ticket_id: "1010893";
  status: "active";
  created_at: "2025-07-31";
  updated_at: "2025-07-31";
  user: {
    id: 10893;
    user_type: 5;
    first_name: "sheroz";
    last_name: "turdiyev";
    middle_name: null;
    company_name: null;
    company_inn: null;
    company_logo: "/config/sample-company.png";
    pinfl: null;
    passport_serial: null;
    passport_number: null;
    address: null;
    position: "Developer";
    phone: "939542111";
    avatar: "/config/sample-user.png";
    username: null;
    email: null;
    email_verified_at: null;
    confirmed: true;
    status: "active";
    created_at: "2025-07-31";
    updated_at: "2025-08-20";
    country_id: 1;
    country_name: null;
    region_id: null;
    district_id: null;
    p_type_id: null;
    department_id: null;
    birth_date: null;
    profession_id: 14;
    organization: "OPEN SOURCE";
    gender: 1;
  };
}

export interface IProgramEvent {
  id: number;
  title: string;
  description: string | null;
  date: string;
  address: string;
  started_at: string;
  stopped_at: string;
}

export interface IEventDetail {
  id: number;
  event_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  event: {
    id: number;
    user_id: number;
    archive_id: number;
    date: string;
    started_at: string;
    stopped_at: string;
    title_uz: string;
    title_ru: string;
    title_en: string;
    live_url: string | null;
    innoweek_video: string | null;
    description_uz: string | null;
    description_ru: string | null;
    description_en: string | null;
    address_uz: string | null;
    address_ru: string | null;
    address_en: string | null;
    status: string | null;
    created_at: string | null;
    updated_at: string | null;
  };
}

export interface IRegion {
  id: number;
  country_id: number;
  name_uz: string;
  name_ru: string;
  name_en: string | null;
  status: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IApplication {
  id: number;
  user_id: number | null;
  region_id: number;
  full_name: string;
  age: number;
  phone: string;
  email: string;
  project_name: string;
  project_brief: string;
  project_goal: string;
  project_problem: string;
  implementation_plan: string;
  team_info: string;
  why_chosen: string;
  presentation: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  region: IRegion;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface ISpeakerPivot {
  schedule_id: number;
  speaker_id: number;
  created_at: string;
  updated_at: string;
}

export interface IProgramSpeaker {
  id: number;
  user_id: number;
  archive_id: number;
  type: "speakers" | "moderator";
  full_name_uz: string;
  full_name_ru: string;
  full_name_en: string;
  job_uz: string;
  job_ru: string;
  job_en: string;
  image: string;
  facebook_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  description_en: string | null;
  description_ru: string | null;
  description_uz: string | null;
  status: "active" | "inactive";
  order: number;
  country_id: number;
  created_at: string;
  updated_at: string;
  pivot: ISpeakerPivot;
  country: ICountry;
  // Dynamic fields based on locale
  full_name: string;
  job: string;
}

export interface ISchedule {
  id: number;
  title: string;
  description: string;
  date: string;
  address: string;
  started_at: string;
  stopped_at: string;
  image: string | null;
}

export interface IProgramDetail {
  schedule: ISchedule;
  speakers: IProgramSpeaker[];
  moderators: IProgramSpeaker[];
}

export interface IProgramDetailResponse {
  message: string;
  data: IProgramDetail;
}
