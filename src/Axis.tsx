import { CurrentColumnDraggedContext } from "./ColumDraggedProvider";
import styled, { css } from "styled-components";
import { useContext, useState } from "react";
import { ScaleBand, scaleBand, scaleOrdinal } from 'd3-scale';

const AxisDropZone = styled.div<{ $isDraggedOver: boolean }>`
  ${(props) =>
    props.$isDraggedOver &&
    css`
      background: orange;
      color: yellow;
    `}
`

const AxisPlaceholder = styled(AxisDropZone)`
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
`;

export enum AxisOrientation {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
}


interface AxisProps {
  placeholder: string;
  onColumnChange: (column: string) => void;
  scale?: ScaleBand<string>;
  orientation: AxisOrientation;
}

const AxisLabelsContainer = styled(AxisDropZone)`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const AxisLabel = styled.div<{
  $width: number;
  $position?: number;
  $orientation: AxisOrientation;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  width: ${({ $width }) => $width + "%"};
  ${({ $orientation, $position }) => {
    if ($orientation === AxisOrientation.HORIZONTAL) {
      return css`
        left: ${$position}%;
      `;
    } else if ($orientation === AxisOrientation.VERTICAL) {
      return css`
        bottom: ${$position}%;
      `;
    }
  }}
`;


export function Axis({ placeholder, onColumnChange, scale, orientation }: AxisProps) {
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
    <AxisLabelsContainer
      $isDraggedOver={isDraggedOver}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDrop={handleDrop}
    >
      {scale.domain().map((label) => (
        <AxisLabel
          $orientation={orientation}
          $width={scale.bandwidth()}
          $position={scale(label)}
        >
          {label}
        </AxisLabel>
      ))}
    </AxisLabelsContainer>
  );
};
