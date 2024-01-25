import responses from '../../../lib/responses.js'
import { calculateDistance } from '../../../lib/calculate-distance.js'
import { CustomerRepository } from '../../../repositories/customers-repository.js'

const customerRepository = new CustomerRepository()

export const handler = async () => {
  const customers = await customerRepository.list()

  if (customers.length === 0) {
    return responses.notFound({
      error: 'not_found',
      message: 'customer not found',
    })
  }

  const referencePoint = { latitude: 0.1, longitude: 0.1 }

  const nearbyCustomers = customers
    .map(customer => ({
      ...customer,
      distance: calculateDistance(customer, referencePoint),
    }))
    .sort((a, b) => a.distance - b.distance)

  return responses.ok(nearbyCustomers)
}
