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
      birthdate: new Date("1994-01-01"),
    },
    {
      name: "Molka Z.",
      firstname: "Molka",
      lastname: "Zaouali",
      age: 25,
      birthdate: new Date("1998-01-01"),
    },
    {
      name: "David N.",
      firstname: "David",
      lastname: "Nowinsky",
      age: 31,
      birthdate: new Date("1991-01-01"),
    },
  ],
};