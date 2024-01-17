import mysql from "mysql2";


export default class DatabaseConnection {
  constructor(host, user, password) {
    this.pool = mysql
      .createPool({
        host: host,
        user: user,
        password: password,
      })
      .promise();
  }

  createTableName(databaseName, tableName) {
    const table_name = databaseName + "." + tableName;
    return table_name;
  }

  // READ
  async getDatabases() {
    const result = await this.pool.query("show databases");
    return result[0];
  }

  async selectDB(databaseName) {
    const connection = await this.pool.getConnection();
    connection.changeUser({ database: databaseName }, (err) => {
      if (err) throw err;
    });
    return connection;
  }

  async getTables(databaseName) {
    const conn = await selectDB(databaseName);
    const result = await conn.query("show tables;");
    conn.release();
    return result[0];
  }

  async getTableData(databaseName, tableName) {
    // const conn = await selectDB(databaseName);
    const table_name = createTableName(databaseName, tableName);
    const result = await this.pool.query("select * from ??", table_name);
    return result[0];
  }

  async getTableWhere(databaseName, tableName, options) {
    let table_name = createTableName(databaseName, tableName);
    let [query, queryValues] = generateDynamicQuery("leaders", options);
    queryValues[0] = table_name;
    const result = await this.pool.query(query, queryValues);
    return result[0];
  }

  //format is [{column: "column", value: value, .. , .. , .. }]
  generateDynamicQuery(tableName, conditions) {
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
  async insertValue(databaseName, tableName, values) {
    const table_name = createTableName(databaseName, tableName);
    const result = await this.pool.query("Insert into ?? set ?", [
      table_name,
      values,
    ]);
    return result[0];
  }

  async createDB(databaseName) {
    const result = await this.pool.query("create database ??", databaseName);
    return result[0];
  }
  // format is [{name: "name", type: "type", .. , .. , ..}]
  async createTable(databaseName, tableName, columns) {
    if (!tableName || !columns || columns.length === 0) {
      throw new Error("Table name or columns are missing.");
    }
    const table_name = createTableName(databaseName, tableName);
    const columnDefinitions = columns
      .map((column) => `${this.pool.escapeId(column.name)} ${column.type}`)
      .join(", ");
    const query = `CREATE TABLE ?? (${columnDefinitions})`;
    const values = [table_name];

    const result = await this.pool.query(query, values);
    return result[0];
  }
}
