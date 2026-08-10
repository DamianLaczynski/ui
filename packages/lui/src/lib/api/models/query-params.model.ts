export interface SortOrder<T> {
  columnName: keyof T;
  order: 'asc' | 'desc';
  sortType?: 'numeric' | 'alphanumeric';
}

export interface Filter<T> {
  columnName: keyof T;
  filterType: string;
  value: any;
}

export interface QueryParams<T> {
  page?: number;
  pageSize?: number;
  orders?: SortOrder<T>[];
  filters?: Filter<T>[];
  searchTerm?: string;
}

export interface QueryResult<T> {
  items: T[];
  totalCount: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}
