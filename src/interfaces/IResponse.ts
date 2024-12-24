export type DataType<T> = T | null | undefined;
export type Meta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};
export interface IResponse<T> {
  data: DataType<T>;
  status?: number;
  message?: string;
  meta?: Meta;
  token?: string | undefined;
  statistics: {
    total: number;
    hold: number;
    pending: number;
    active: number;
  };
}
