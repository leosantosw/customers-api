import { DatabaseClient } from '../lib/database-client.js'

const { client } = new DatabaseClient()

export class CustomerRepository {
  async list (filters) {
    const { query, values } = this.buildListQuery(filters)
    const { rows: results } = await client.query({ text: query, values })
    return results
  }

  async create (user) {
    const query = {
      text: 'INSERT INTO customers(name, email, telephone) VALUES($1, $2, $3) RETURNING *',
      values: [user.name, user.email, user.telephone],
    }
    console.log(query)
    const { rows: [result] } = await client.query(query)
    return result
  }

  buildListQuery (filters) {
    const filterClauses = Object.entries(filters)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value], index) => `LOWER(${key}) LIKE LOWER($${index + 1})`)
      .join(' AND ')

    const values = Object.values(filters)
      .filter(value => value !== undefined && value !== null)
      .map(value => `%${value}%`)

    const query = `SELECT * FROM customers${filterClauses ? ' WHERE ' + filterClauses : ''}`

    return { query, values }
  }
}
