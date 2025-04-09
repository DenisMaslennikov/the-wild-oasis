export interface ApiResultsWithCount<T> {
  data: T;
  count: number | null;
}
