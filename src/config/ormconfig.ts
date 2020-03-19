require('dotenv').config()

const connection = process.env.DB_CONNECTION ?? 'postgres'
const host = process.env.DB_HOST ?? 'localhost'
const port = process.env.DB_PORT ?? 5432
const dbName = process.env.DB_DATABASE ?? 'open_data'
const username = process.env.DB_USERNAME ?? 'root'
const password = process.env.DB_PASSWORD ?? null

export = {
  type: connection,
  host: host,
  port: port,
  username: username,
  password: password,
  database: dbName,
  synchronize: false,
  logging: true,
  logger: 'file',
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migration/*{.ts,.js}'],
  subscribers: [__dirname + '/../**/**/*.subscriber{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migration'
  }
}
