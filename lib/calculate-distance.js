import haversine from 'haversine-distance'

export const calculateDistance = (customer, referencePoint) => {
  const customerPoint = {
    latitude: parseFloat(customer.coordinate_x),
    longitude: parseFloat(customer.coordinate_y),
  }

  return haversine(referencePoint, customerPoint)
}
