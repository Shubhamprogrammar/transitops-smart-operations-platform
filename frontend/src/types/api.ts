export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}
