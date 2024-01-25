import responses from '../../../lib/responses.js'
import { paramsValidator } from './params-validator.js'
import { CustomerRepository } from '../../../repositories/customers-repository.js'

const customerRepository = new CustomerRepository()

export const handler = async event => {
  try {
    const {
      name = null,
      email = null,
      telephone = null,
    } = JSON.parse(event.body)

    const params = paramsValidator({ name, email, telephone })

    if (params.error) {
      console.error('[ERROR] create customer:', params)
      return responses.badRequest(params)
    }

    console.info('[INFO] name string parameter:', name)
    console.info('[INFO] email string parameter:', email)
    console.info('[INFO] telephone string parameter:', telephone)

    const customer = await customerRepository.create({
      name,
      email,
      telephone,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(customer),
    }
  } catch (error) {
    console.error('[ERROR] create customer:', error)
    return responses.internalError({
      error: 'internal_server_error',
      message: error.message,
    })
  }
}
