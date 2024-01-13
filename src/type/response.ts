export type MyResponse<T> = {
  message?: string;
  error?: string;
  data?: T | null;
};
