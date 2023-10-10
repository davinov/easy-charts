import styled, {css} from 'styled-components';
import { CurrentColumnDraggedContext } from './ColumDraggedProvider';
import { ReactNode, useContext, useState } from 'react';


const OrthonormalLayout = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr 50px;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;


const AxisPlaceholderStyled = styled.div<{ $isDraggedOver: boolean; }>`
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

const XAxisPlaceholder = styled(AxisPlaceholderStyled)`
  grid-area: 2 / 2 / 3 / 3;
`;

const YAxisPlaceholder = styled(AxisPlaceholderStyled)`
  grid-area: 1 / 1 / 2 / 2;
  writing-mode: vertical-lr;
  text-orientation: upright;
`;

const XAxis = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    font-size: 12px;
    color: #999;
`;

const YAxis = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px 0;
    margin-right: 20px;
    font-size: 12px;
    color: #999;
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

export function Chart({data}) {
    const [currentDraggedColumn] = useContext(CurrentColumnDraggedContext)
    // const maxAge = Math.max(...data.map(item => item.age));

    const [isDraggedOver, setIsDraggedOver]= useState<boolean>(false);
    function handleDrop() {
        setChartConfig({
            ...chartConfig,
            x: currentDraggedColumn?.name,
        });
        setIsDraggedOver(false);
    }

    function handleDragOver(event) {
        event.preventDefault();
        setIsDraggedOver(true);
    }

    const [chartConfig, setChartConfig] = useState<ChartConfig>({});

    return (
      <ChartDiv>
        <div>{JSON.stringify(chartConfig)}</div>
        <OrthonormalLayout>
          <YAxisPlaceholder>Y axis</YAxisPlaceholder>
          <XAxisPlaceholder
            $isDraggedOver={isDraggedOver}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDraggedOver(false)}
            onDrop={handleDrop}
          >
            X axis
          </XAxisPlaceholder>
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
