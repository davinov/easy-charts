import { ScaleBand, ScaleLinear } from "d3-scale";
import styled, {css} from "styled-components";
import { CurrentColumnDraggedContext } from "./ColumDraggedProvider";
import { ReactNode, useContext, useState} from 'react'
import { Data } from "./types";

export interface VerticalBarsProps {
  xColumn: string;
  xScale: ScaleBand<string>;
  valueScale?: ScaleLinear<number, number>;
  valueColumn?: string;
  data: Data;
  onColumnChange: (column: string) => void;
}

const Bar = styled.div`
  position: absolute;
  height: 50%;
  bottom: 0;
  background-color: white;
`;

const SkeletonBar = styled(Bar)`
  opacity: 0.1;
`;

const Container = styled.div<{ $isDraggedOver: boolean }>`
  position: relative;
  height: 100%;
  width: 100%;

  ${Bar} {
    ${(props) => {
        if (props.$isDraggedOver) {
            return css`
              background-color: orange;
              opacity: 1;
            `;
        }
    }}
  }
`;


const randomHeights = [...Array(50).keys()].map(() => Math.random() * 100);


export function VerticalBars({
  data,
  xColumn,
  xScale,
  valueScale,
  valueColumn,
  onColumnChange,
}: VerticalBarsProps) {
  const [currentDraggedColumn] = useContext(CurrentColumnDraggedContext);

  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  function handleDrop() {
    setIsDraggedOver(false);
    if (!currentDraggedColumn) {
      return;
    }
    onColumnChange(currentDraggedColumn.name);
    
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDraggedOver(true);
  }

  let bars: ReactNode[];
  if (valueScale && valueColumn) {
    bars = xScale.domain().map((x) => {
      const value = data.find((d) => d[xColumn] === x)?.[valueColumn] as number | undefined;
      if (value != null) {
        return <Bar
          style={{
            left: xScale(x) + "%",
            width: xScale.bandwidth() + "%",
            height: valueScale(value) + "%",
          }}
        />
      }
    });
  } else {
    bars = xScale.domain().map((d, i) => (
      <SkeletonBar
        style={{
          left: xScale(d) + "%",
          width: xScale.bandwidth() + "%",
          height: randomHeights[i % randomHeights.length],
        }}
      />
    ));
  }

  return (
    <Container
      $isDraggedOver={isDraggedOver}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDrop={handleDrop}
    >
      {bars}
    </Container>
  );
}
