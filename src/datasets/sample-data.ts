import { ColumnType } from "../column-type";

export default {
  schema: [
    {
      name: "name",
      type: ColumnType.TEXT,
    },
    {
      name: "firstname",
      type: ColumnType.TEXT,
    },
    {
      name: "lastname",
      type: ColumnType.TEXT,
    },
    {
      name: "age",
      type: ColumnType.NUMERIC,
    },
    {
      name: "height",
      type: ColumnType.NUMERIC,
    },
    {
      name: "birthdate",
      type: ColumnType.DATE,
    },
  ],
  data: [
    {
      name: "Ange P.",
      firstname: "Ange",
      lastname: "Parfait",
      age: 29,
      height: 190,
      birthdate: new Date("1994-01-01"),
    },
    {
      name: "Molka Z.",
      firstname: "Molka",
      lastname: "Zaouali",
      age: 27,
      height: 165,
      birthdate: new Date("1995-01-01"),
    },
    {
      name: "David N.",
      firstname: "David",
      lastname: "Nowinsky",
      age: 31,
      height: 177,
      birthdate: new Date("1991-01-01"),
    },
  ],
};