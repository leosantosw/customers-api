import responses from '../../../lib/responses.js'
import { CustomerRepository } from '../../../repositories/customers-repository.js'

const customerRepository = new CustomerRepository()

export const handler = async event => {
  const {
    name = null,
    email = null,
    telephone = null,
  } = event.queryStringParameters || {}

  console.info('[INFO] name string parameter:', name)
  console.info('[INFO] email string parameter:', email)
  console.info('[INFO] telephone string parameter:', telephone)

  const customer = await customerRepository.list({
    name,
    email,
    telephone,
  })

  if (customer.length === 0) {
    return responses.notFound({
      error: 'not_found',
      message: 'customer not found',
    })
  }

  return responses.ok(customer)
}
