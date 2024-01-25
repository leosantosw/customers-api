export const paramsValidator = params => {
  const requiredParams = ['name', 'email', 'telephone', 'coordinate_x', 'coordinate_y']
  for (const requiredParam of requiredParams) {
    if (!params[requiredParam]) {
      return {
        error: 'missing_param',
        message: `missing required param: ${requiredParam}`,
      }
    }
  }
}
