export interface Todo {
  id: string;
  title: string;
  priority: number;
  description: string | null;
  is_scratched: boolean;
  created_at: Date | null;
}

export interface Result {
  data: Todo;
}

export interface Results {
  meta: Meta;
  links: Links;
  data: Todo[];
}

export interface Links {
  prev: null;
  next: string;
  last: string;
  first: string;
}

export interface Meta {
  to: number;
  from: number;
  path: string;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
}

export interface TodoParams {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: boolean;
}