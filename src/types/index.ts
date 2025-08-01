export interface IPagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface INewsListItem {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
}
export interface IResponse<T> {
  status: number;
  success: boolean;
  data: T;
  pagination: IPagination;
}

export interface CountryObj {
  name_uz?: string;
  name_en?: string;
  name_ru?: string;
}

export interface ISpeakerItem {
  full_name: string;
  position: string;
  image: string;
  created_at: string;
  country: {
    id: 1;
    user_id: 1;
    name_uz: "O'zbekiston";
    name_en: "Uzbekistan";
    name_ru: "\u0423\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u0430\u043d";
    state_code: null;
    phone_code: null;
    flag: null;
    status: "active";
    created_at: null;
    updated_at: null;
  };
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
