export type Data = { [col: string]: string | number | Date }[];

export interface DataWithSchema {
  schema: { name: string; type: ColumnType }[];
  data: Data;
}
