import { DatabaseClient } from '../lib/database-client.js'

const { client } = new DatabaseClient()

export class CustomerRepository {
  async list (filters = {}) {
    const { query, values } = this.buildListQuery(filters)
    const { rows: results } = await client.query({ text: query, values })
    return results
  }

  async create (customer) {
    const customerQuery = {
      text: 'INSERT INTO customers(name, email, telephone) VALUES($1, $2, $3) RETURNING *',
      values: [customer.name, customer.email, customer.telephone],
    }
    const { rows: [createdCustomer] } = await client.query(customerQuery)

    const cooderinateQuery = {
      text: 'INSERT INTO customers_coordinates(customer_id, coordinate_x, coordinate_y) VALUES($1, $2, $3) RETURNING coordinate_x, coordinate_y',
      values: [createdCustomer.id, customer.coordinateX, customer.coordinateY],
    }

    const { rows: [createdCustomerCoordinateds] } = await client.query(cooderinateQuery)

    return {
      ...createdCustomer,
      ...createdCustomerCoordinateds,
    }
  }

  buildListQuery (filters) {
    const filterClauses = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, _], index) => `LOWER(${key}) LIKE LOWER($${index + 1})`)
      .join(' AND ')

    const values = Object.values(filters)
      .filter(value => value !== undefined && value !== null)
      .map(value => `%${value}%`)

    const query = `SELECT
      customers.id,
      customers.name,
      customers.email,
      customers.telephone,
      customers_coordinates.coordinate_x,
      customers_coordinates.coordinate_y
    FROM customers
    INNER JOIN customers_coordinates ON customers.id = customers_coordinates.customer_id
    ${filterClauses ? ' WHERE ' + filterClauses : ''}`

    return { query, values }
  }
}
