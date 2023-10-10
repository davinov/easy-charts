import { ColumnEmoji, ColumnType } from "./column-type";
import styled from "styled-components";

export interface ColumnProps {
  column: string;
  type: ColumnType;
}

const ColumnItem = styled.div`
    text-align: left;
    display: block;
    padding: 5px;
    background: rgba(253,253,253,0.2);
    cursor: pointer;
    margin-bottom: 3px;

    &:hover {
        background: rgba(253,253,253,0.9);
        transition: background 0.3s ease-in-out;
        color: grey;
    }
`;

export function Column({column, type}: ColumnProps) {
    return (
      <ColumnItem>
        {ColumnEmoji[type]} <b> {column}</b>
      </ColumnItem>
    );
}
