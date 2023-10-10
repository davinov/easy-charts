import { CurrentColumnDraggedContext } from "./ColumDraggedProvider";
import styled, { css } from "styled-components";
import { useContext, useState } from "react";

const AxisPlaceholder = styled.div<{ $isDraggedOver: boolean }>`
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;

  ${(props) =>
    props.$isDraggedOver &&
    css`
      background: orange;
      color: yellow;
    `}
`;

interface AxisProps {
  placeholder: string;
  onColumnChange: (column: string) => void;
  column: string;
}

export function Axis({ placeholder, onColumnChange }: AxisProps) {
  const [currentDraggedColumn] = useContext(CurrentColumnDraggedContext);

  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  function handleDrop() {
    if (!currentDraggedColumn) {
      return;
    }
    onColumnChange(currentDraggedColumn.name);
    setIsDraggedOver(false);
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDraggedOver(true);
  }

  return (
    <AxisPlaceholder
      $isDraggedOver={isDraggedOver}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDrop={handleDrop}
    >
      {placeholder}
    </AxisPlaceholder>
  );
};
