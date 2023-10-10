import { Column, ColumnProps } from "./Column";

interface ColumnsListProps {
  columns: ColumnProps[];
}

export function ColumnsList({ columns }: ColumnsListProps) {
  return <div>{columns.map((c) => <Column {...c} ></Column>) }</div>;
}