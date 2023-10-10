import './App.css'
import { ColumnsList } from './ColumnsList'
import { Chart } from './Chart'
import SAMPLE_DATA from './datasets/sample-data';
import styled from "styled-components";

const ChartEditorLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

function App() {

  return <>
    <ChartEditorLayout>
      <ColumnsList
          columns={SAMPLE_DATA.schema}
      ></ColumnsList>
      <Chart
          data={SAMPLE_DATA.data}
      ></Chart>
    </ChartEditorLayout>
 </>;
}

export default App
