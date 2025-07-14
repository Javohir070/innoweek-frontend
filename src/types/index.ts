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

export interface ISpeakerItem {
  full_name: string;
  position: string;
  image: string;
  created_at: string;
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
