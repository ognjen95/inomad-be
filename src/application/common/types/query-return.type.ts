export type EdgesResponse<T> = {
  totalCount: number;
  edges: Edge<T>[];
  pageInfo: PageInfo;
};

export type PageInfo = {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
  endCursor?: string;
};

export type Edge<T> = {
  cursor: string;
  node: T;
};
