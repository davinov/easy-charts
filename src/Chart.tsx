import styled, {css} from 'styled-components';
import { CurrentColumnDraggedContext } from './ColumDraggedProvider';
import { Axis } from './Axis';
import { ReactNode, useContext, useMemo, useState } from 'react';
import { scaleBand, scaleOrdinal } from 'd3-scale';
import { ColumnType } from './column-type';


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

const BarChart = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin: 20px;
`;

const ChartDiv = styled.div`
    width: 100%;
    border: 1px solid grey;
    margin-left: 20px;
`
const Bar = styled.div`
    width: 50%;
    height: ${({ height }) => height}px;
    background-color: ${({ color }) => color};
    margin-left: 5%;
    margin-right: 5%;
`;

interface ChartConfig {
    x?: string;
    y?: string;
}

interface DataWithSchema {
    schema: {name: string; type: ColumnType}[];
    data: {[col: string]: string | number | Date }[];
}

function generateScale(dataWithSchema: DataWithSchema, column?: string) {
    if (!column) {
        return;
    }

    const type = dataWithSchema.schema.find((c) => c.name === column)?.type;

    if (type === ColumnType.TEXT) {
        const values = dataWithSchema.data.map((d) => d[column]) as string[];
        return scaleBand([0, 100]).domain(values);
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

  const xScale = useMemo(() => generateScale(dataWithSchema, chartConfig.x), [
    dataWithSchema,
    chartConfig.x,
  ]);

  return (
    <ChartDiv>
      <div>{JSON.stringify(chartConfig)}</div>
      <OrthonormalLayout>
        <XAxisContainer>
          <Axis placeholder="X axis" onColumnChange={setXAxisColumn} scale={xScale} />
        </XAxisContainer>
        <YAxisContainer>
          <Axis placeholder="Y axis" onColumnChange={setYAxisColumn} />
        </YAxisContainer>
      </OrthonormalLayout>

      {/* <BarChart>
                {data.map(item => (
                    <Bar
                        key={item.name}
                        height={item.age / maxAge * 200}
                        color="#00C4FF"
                    />
                ))}
            </BarChart>

            <YAxis>
                {Array.from({ length: 5 }, (_, index) => maxAge / 5 * (5 - index)).map(value => (
                    <div key={value}>{value}</div>
                ))}
            </YAxis>
            <XAxis>
                {data.map(item => (
                    <div key={item.name}>{item.name}</div>
                ))}
            </XAxis> */}
    </ChartDiv>
  );
}
