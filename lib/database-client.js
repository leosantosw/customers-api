import pg from 'pg'

export class DatabaseClient {
  constructor () {
    this.client = new pg.Client({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      port: 5432,
    })
    this.connect()
  }

  async connect () {
    try {
      console.log('[DatabaseClient] Connected to the database successfully')
      if (!this.client._connected) await this.client.connect()
    } catch (error) {
      console.error('[DatabaseClient] Error connecting to database', error)
    }
  }
}
