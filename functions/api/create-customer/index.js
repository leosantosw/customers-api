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
      coordinate_x: coordinateX = null,
      coordinate_y: coordinateY = null,
    } = JSON.parse(event.body)

    const params = paramsValidator({ name, email, telephone, coordinate_x: coordinateX, coordinate_y: coordinateY })

    console.log('[INFO] create customer:', params)

    if (params?.error) {
      console.error('[ERROR] create customer:', params)
      return responses.badRequest(params)
    }

    console.info('[INFO] name string parameter:', name)
    console.info('[INFO] email string parameter:', email)
    console.info('[INFO] telephone string parameter:', telephone)
    console.info('[INFO] coordinates object parameter:', { coordinateX, coordinateY })

    const customer = await customerRepository.create({
      name,
      email,
      telephone,
      coordinateX,
      coordinateY,
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
