import './App.css'
import { ColumnsList } from './ColumnsList'
import { Chart } from './Chart'
import SAMPLE_DATA from './datasets/sample-data';
import styled from "styled-components";
import { useState } from 'react';
import { CurrentColumnDraggedContext } from './ColumDraggedProvider';
import { ColumnProps } from './Column';

const ChartEditorLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

function App() {
  const [currentDraggedColumn, setCurrentDraggedColumn] =
  useState<ColumnProps | null>(null);
  
  return (
    <>
      <ChartEditorLayout>
        <CurrentColumnDraggedContext.Provider
          value={[currentDraggedColumn, setCurrentDraggedColumn]}
        >
          <ColumnsList columns={SAMPLE_DATA.schema}></ColumnsList>
          <Chart dataWithSchema={SAMPLE_DATA}></Chart>
        </CurrentColumnDraggedContext.Provider>
      </ChartEditorLayout>
    </>
  );
}

export default App
