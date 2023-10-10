import styled from 'styled-components';
import { CurrentColumnDraggedContext } from './ColumDraggedProvider';
import { Axis, AxisOrientation } from './Axis';
import { useContext, useMemo, useState } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { ColumnType } from './column-type';
import { VerticalBars } from './VerticalBars';
import { DataWithSchema } from './types';


const OrthonormalLayout = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 50px;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;


const XAxisContainer = styled.div`
    grid-area: 2 / 2 / 3 / 3;
`;

const YAxisContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  writing-mode: vertical-lr;
  text-orientation: upright;
`;

const GraphValuesContainer = styled.div`
  grid-area: 1 / 2 / 2 / 3;
`;

const ChartDiv = styled.div`
    width: 100%;
    border: 1px solid grey;
    margin-left: 20px;
`;

interface ChartConfig {
  x?: string;
  y?: string;
  value?: string;
  comparison?: string;
}

function generateScaleBand(dataWithSchema: DataWithSchema, column?: string) {
    if (!column) {
        return;
    }

    const type = dataWithSchema.schema.find((c) => c.name === column)?.type;

    if (type === ColumnType.TEXT) {
        const values = dataWithSchema.data.map((d) => d[column]) as string[];
        return scaleBand([0, 100]).domain(values).paddingOuter(0.1).paddingInner(0.1);
    }
}

function generateScaleLinear(dataWithSchema: DataWithSchema, column?: string, comparisonColumn?: string) {
    if (!column) {
        return;
    }

    const type = dataWithSchema.schema.find((c) => c.name === column)?.type;

    if (type === ColumnType.NUMERIC) {
        const values = dataWithSchema.data.map((d) => d[column]) as number[];
        if (comparisonColumn) {
          values.push(
            ...(dataWithSchema.data.map((d) => d[comparisonColumn]) as number[])
          );
        }
        return scaleLinear([0, 100]).domain([
          Math.min(0, ...values),
          Math.max(0, ...values),
        ]);
    }
}

interface ChartProps {
  dataWithSchema: DataWithSchema;
}

export function Chart({ dataWithSchema }: ChartProps) {
  const [currentDraggedColumn] = useContext(CurrentColumnDraggedContext);
  // const maxAge = Math.max(...data.map(item => item.age));

  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  function setXAxisColumn() {
    setChartConfig({
      ...chartConfig,
      x: currentDraggedColumn?.name,
    });
  }

  function setYAxisColumn() {
    setChartConfig({
      ...chartConfig,
      y: currentDraggedColumn?.name,
    });
  }

  function handleVerticalBarsColumnChange() {
    setChartConfig({
        ...chartConfig,
        value: currentDraggedColumn?.name,
    });
  }

  function handleVerticalBarsNewColumn() {
    setChartConfig({
      ...chartConfig,
      comparison: currentDraggedColumn?.name,
    });
  }

  const xColumn = chartConfig.x;
  const xScale = useMemo(() => generateScaleBand(dataWithSchema, xColumn), [
    dataWithSchema,
    xColumn,
  ]);

  const yScale = useMemo(() => generateScaleBand(dataWithSchema, chartConfig.y), [
    dataWithSchema,
    chartConfig.y,
  ]);

  const valueScale = useMemo(
    () =>
      generateScaleLinear(dataWithSchema, chartConfig.value, chartConfig.comparison),
    [dataWithSchema, chartConfig.value]
  );

  return (
    <ChartDiv>
      <div>{JSON.stringify(chartConfig)}</div>
      <OrthonormalLayout>
        <XAxisContainer>
          <Axis
            orientation={AxisOrientation.HORIZONTAL}
            placeholder="X axis"
            onColumnChange={setXAxisColumn}
            scale={xScale}
          />
        </XAxisContainer>
        <YAxisContainer>
          <Axis
            orientation={AxisOrientation.VERTICAL}
            placeholder="Y axis"
            onColumnChange={setYAxisColumn}
            scale={yScale}
          />
        </YAxisContainer>
        <GraphValuesContainer>
          {xColumn && xScale && !yScale && (
            <VerticalBars
              data={dataWithSchema.data}
              xColumn={xColumn}
              xScale={xScale}
              valueScale={valueScale}
              valueColumn={chartConfig.value}
              comparisonColumn={chartConfig.comparison}
              onColumnChange={handleVerticalBarsColumnChange}
              onNewBarsColumn={handleVerticalBarsNewColumn}
            />
          )}
        </GraphValuesContainer>
      </OrthonormalLayout>
    </ChartDiv>
  );
}
