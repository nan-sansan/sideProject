export type BaseResponse = {
  success: boolean;
  errorMsg?: string;
};

export type ListResponse<T> = BaseResponse & {
  total?: number;
  content: T[];
};

export type DataResponse<T> = BaseResponse & {
  content: T;
};
