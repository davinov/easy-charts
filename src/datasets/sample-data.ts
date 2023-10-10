import { ColumnType } from "../column-type";

export default {
  schema: [
    {
      column: "name",
      type: ColumnType.TEXT,
    },
    {
      column: "age",
      type: ColumnType.NUMERIC,
    },
    {
      column: "birthdate",
      type: ColumnType.DATE,
    },
  ],
  data: [
    {
      name: "Ange",
      age: 29,
      birthdate: new Date("1994-01-01"),
    },
    {
      name: "Molka",
      age: 25,
      birthdate: new Date("1998-01-01"),
    },
    {
      name: "David",
      age: 31,
      birthdate: new Date("1991-01-01"),
    },
  ],
};