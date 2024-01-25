export class CustomerRepository {
  constructor () {
    this.customers = []
  }

  async list (filters) {
    const filteredCustomer = this.customers.filter(user => {
      return Object.entries(filters).every(([key, value]) => {
        return user[key] === value
      })
    })

    return filteredCustomer
  }

  async create (user) {
    this.customers.push(user)

    return user
  }
}
