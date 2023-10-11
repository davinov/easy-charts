import { ColumnEmoji, ColumnType } from "./column-type";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentColumnDraggedContext } from './ColumDraggedProvider';

export interface ColumnProps {
  name: string;
  type: ColumnType;
}

const ColumnItem = styled.div`
    text-align: left;
    display: block;
    padding: 5px;
    background: rgba(253,253,253,0.2);
    cursor: pointer;
    margin-bottom: 3px;

    &:hover {
        background: rgba(253,253,253,0.9);
        transition: background 0.3s ease-in-out;
        color: grey;
    }
`;

export function Column(column: ColumnProps) {
  const [_, setCurrentDraggedColumn] = useContext(CurrentColumnDraggedContext);

  function handleDragStart() {
    setCurrentDraggedColumn(column);
  }

  function handleDragEnd() {
    setCurrentDraggedColumn(null);
  }
  
  return (
      <ColumnItem draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {ColumnEmoji[column.type]} <b> {column.name}</b>
      </ColumnItem>
    );
}
