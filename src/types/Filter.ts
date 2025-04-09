export type Filter = {
  value: string | number;
  field: string;
  method?: "eq" | "gt" | "lt" | "lte" | "gte" | "neq";
};
