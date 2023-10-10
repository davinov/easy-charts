import { CurrentColumnDraggedContext } from "./ColumDraggedProvider";
import styled, { css } from "styled-components";
import { useContext, useState } from "react";
import { ScaleBand, scaleBand, scaleOrdinal } from 'd3-scale';

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
  scale?: ScaleBand<string>;
}

const AxisLabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const AxisLabel = styled.div<{ $width: number; $left?: number }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  width: ${({ $width }) => $width + "%"};
  left: ${({ $left }) => $left + "%"};
`;


export function Axis({ placeholder, onColumnChange, scale }: AxisProps) {
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

  if (!scale) {
    return <AxisPlaceholder
      $isDraggedOver={isDraggedOver}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDrop={handleDrop}
    >
      {placeholder}
    </AxisPlaceholder>
  }

  return (
    <AxisLabelsContainer>
      {scale.domain().map((label) => (
        <AxisLabel $width={scale.bandwidth()} $left={scale(label)}>
          {label}
        </AxisLabel>
      ))}
    </AxisLabelsContainer>
  );
};
