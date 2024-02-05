import mysql from 'mysql2/promise';
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306

const connectionConfig: mysql.ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  port,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

const dropDatabase = async (): Promise<void> => {
  const connection = await mysql.createConnection(connectionConfig);

  try {
    await connection.execute(`DROP DATABASE IF EXISTS ${connectionConfig.database}`);
    console.log('Banco de dados excluído com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir banco de dados:', error);
  } finally {
    await connection.end();
  }
};

dropDatabase();
