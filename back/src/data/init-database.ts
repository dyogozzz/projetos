import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306

const connectionConfig: mysql.ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  port,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
}

const connectionCreated: mysql.ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  port,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
}

const createDatabaseAndTables = async (): Promise<void> => {
  const connection = await mysql.createConnection({ ...connectionConfig })
  
  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${connectionCreated.database}`)
    
    console.log('Banco de dados criado com sucesso.')
    
    await connection.end()

    const connectionWithDb = await mysql.createConnection({ ...connectionCreated })

    await connectionWithDb.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP);`
    )

    await connectionWithDb.execute(`
      CREATE TABLE IF NOT EXISTS deleted_users (
        id INT NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NULL DEFAULT NULL,
        deleted_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_via VARCHAR(255) NULL DEFAULT NULL,
        deleted_ip VARCHAR(30) NULL DEFAULT NULL,
        deleted_forward VARCHAR(255) NULL DEFAULT NULL);`
    )
      
    console.log('Tabelas criadas com sucesso.')

    await connectionWithDb.end()

  } catch (error) {
    console.error(error)
  } finally {
    await connection.end()
  }
}

createDatabaseAndTables()