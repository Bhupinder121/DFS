import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
  })
  .promise();

function createTableName(databaseName, tableName) {
  const table_name = databaseName + "." + tableName;
  return table_name;
}

// READ
async function getDatabases() {
  const result = await pool.query("show databases");
  return result[0];
}

async function selectDB(databaseName) {
  const connection = await pool.getConnection();
  connection.changeUser({ database: databaseName }, function (err) {
    if (err) throw err;
  });
  return connection;
}

async function getTables(databaseName) {
  const conn = await selectDB(databaseName);
  const result = await conn.query("show tables;");
  conn.release();
  return result[0];
}

async function getTableData(databaseName, tableName) {
  // const conn = await selectDB(databaseName);
  const table_name = createTableName(databaseName, tableName);
  const result = await pool.query("select * from ??", table_name);
  return result[0];
}

async function getTableWhere(databaseName, tableName, options) {
  let table_name = createTableName(databaseName, tableName);
  let [query, queryValues] = generateDynamicQuery("leaders", options);
  queryValues[0] = table_name;
  const result = await pool.query(query, queryValues);
  return result[0];
}

function generateDynamicQuery(tableName, conditions) {
  if (!conditions || !Array.isArray(conditions) || conditions.length === 0) {
    throw new Error("Conditions array is missing or empty.");
  }

  const whereClause = conditions.map((condition) => `?? = ?`).join(" AND ");
  const values = conditions.reduce(
    (acc, condition) => [...acc, condition.column, condition.value],
    []
  );

  const query = `SELECT * FROM ?? WHERE ${whereClause}`;
  const queryValues = [tableName, ...values];

  return [query, queryValues];
}

// creation
async function insertValue(databaseName, tableName, values) {
  const table_name = createTableName(databaseName, tableName);
  const result = await pool.query("Insert into ?? set ?", [table_name, values]);
  return result[0];
}

async function createDB(databaseName) {
  const result = await pool.query("create database ??", databaseName);
  return result[0];
}

async function createTable(databaseName, tableName, columns) {
  if (!tableName || !columns || columns.length === 0) {
    throw new Error("Table name or columns are missing.");
  }
  const table_name = createTableName(databaseName, tableName);
  const columnDefinitions = columns.map((column) => `${pool.escapeId(column.name)} ${column.type}`).join(', ');
  const query = `CREATE TABLE ?? (${columnDefinitions})`;
  const values = [table_name];

  const result = await pool.query(query, values);
  return result[0];
}

let result = await createTable("test2", "tableFromMysql", [{name: "test1", type: "varchar(25)"}, {name: "test3", type: "int"}])
console.log(result)