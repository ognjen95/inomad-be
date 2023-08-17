export type EdgesResponse<T> = {
  totalCount: number;
  edges: EdgesT<T>[];
  pageInfo: PageInfo;
};

export type PageInfo = {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
  endCursor?: string;
};

export type EdgesT<T> = {
  cursor: string;
  node: T;
};
