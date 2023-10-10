import { ColumnType } from "./column-type";

export interface ColumnProps {
  column: string;
  type: ColumnType;
}

export function Column({column, type}: ColumnProps) {
    return (
      <div>
        {column} / {type}
      </div>
    );
}