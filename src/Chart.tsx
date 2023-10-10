import styled from 'styled-components';

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

export function Chart({data}) {

    const maxAge = Math.max(...data.map(item => item.age));

    return (
        <ChartDiv>
            <BarChart>
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
            </XAxis>
        </ChartDiv>
    );
}
