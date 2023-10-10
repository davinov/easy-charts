import React from 'react';
import { Column, ColumnProps } from "./Column";
import './ColumnsList.css'

interface ColumnsListProps {
  columns: ColumnProps[];
}

export function ColumnsList({ columns }: ColumnsListProps) {
  return (
    <div className="columns-list-wrapper">
      <div className="sidebar">
        <h2>Columns</h2>
        {columns.map((c, index) => (
          <Column key={index} {...c} />
        ))}
      </div>
    </div>
  );
}
