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
  comparisonColumn?: string;
  data: Data;
  onColumnChange: (column: string) => void;
  onNewBarsColumn: (column: string) => void;
}

const Bar = styled.div<{ $isDraggedOver: boolean }>`
  position: absolute;
  height: 50%;
  bottom: 0;
  background-color: white;

  ${(props) => {
    if (props.$isDraggedOver) {
      return css`
        background-color: orange;
        opacity: 1 !important;
      `;
    }
  }}
`;

const ComparisonBar = styled(Bar)`
  background-color: grey;
`;

const SkeletonBar = styled(Bar)`
  opacity: 0.1;
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;


const randomHeights = [...Array(50).keys()].map(() => Math.random() * 100);


export function VerticalBars({
  data,
  xColumn,
  xScale,
  valueScale,
  valueColumn,
  comparisonColumn,
  onColumnChange,
  onNewBarsColumn,
}: VerticalBarsProps) {
  const [currentDraggedColumn] = useContext(CurrentColumnDraggedContext);

  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [isDraggedOverNewBars, setIsDraggedOverNewBars] =
    useState<boolean>(false);

  function handleDrop() {
    console.log("drop");
    setIsDraggedOver(false);
    setIsDraggedOverNewBars(false);
    if (!currentDraggedColumn) {
      return;
    }
    onColumnChange(currentDraggedColumn.name);
  }

  function handleDragOver(event) {
    setIsDraggedOverNewBars(false);
    setIsDraggedOver(true);
    event.preventDefault();
  }

  function handleDropNewBars(event) {
    setIsDraggedOverNewBars(false);
    setIsDraggedOver(false);
    if (!currentDraggedColumn) {
      return;
    }
    onNewBarsColumn(currentDraggedColumn.name);
    event.stopPropagation();
  }

  function handleDragOverNewBars(event) {
    setIsDraggedOver(false);
    setIsDraggedOverNewBars(true);
    event.stopPropagation();
    event.preventDefault();
  }

  let bars: ReactNode[];
  if (valueScale && valueColumn) {
    bars = xScale.domain().map((x, i) => {
      const dataRow = data.find((d) => d[xColumn] === x);
      const value = dataRow?.[valueColumn] as number | undefined;
      const comparisonValue = comparisonColumn
        ? dataRow?.[comparisonColumn] as number | undefined
        : undefined;
      if (value != null) {
        return (
          <>
            <Bar
              $isDraggedOver={isDraggedOver}
              key={x}
              style={{
                left: xScale(x) + "%",
                width:
                  (isDraggedOver || isDraggedOverNewBars || comparisonColumn
                    ? xScale.bandwidth() / 2
                    : xScale.bandwidth()) + "%",
                height: valueScale(value) + "%",
              }}
            />
            {comparisonColumn && comparisonValue != null && (
              <ComparisonBar
                $isDraggedOver={isDraggedOver}
                onDragOver={handleDragOverNewBars}
                onDrop={handleDropNewBars}
                key={x + "__comparison"}
                style={{
                  left: (xScale(x) ?? 0) + xScale.bandwidth() / 2 + 1 + "%",
                  width: xScale.bandwidth() / 2 + "%",
                  height: valueScale(comparisonValue) + "%",
                }}
              />
            )}
            {(isDraggedOver || isDraggedOverNewBars) && !comparisonColumn && (
              <SkeletonBar
                onDragOver={handleDragOverNewBars}
                onDrop={handleDropNewBars}
                $isDraggedOver={isDraggedOverNewBars}
                key={x + "__skeleton"}
                style={{
                  left: (xScale(x) ?? 0) + xScale.bandwidth() / 2 + 1 + "%",
                  width: xScale.bandwidth() / 2 - 1 + "%",
                  height: randomHeights[i % randomHeights.length] + "%",
                }}
              />
            )}
          </>
        );
      }
    });
  } else {
    bars = xScale.domain().map((x, i) => (
      <SkeletonBar
        key={x}
        $isDraggedOver={isDraggedOver}
        style={{
          left: xScale(x) + "%",
          width: xScale.bandwidth() + "%",
          height: randomHeights[i % randomHeights.length] + "%",
        }}
      />
    ));
  }

  return (
    <Container
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDraggedOver(false)}
      onDrop={handleDrop}
    >
      {bars}
    </Container>
  );
}
