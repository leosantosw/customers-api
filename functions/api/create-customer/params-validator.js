export const paramsValidator = params => {
  const requiredParams = ['name', 'email', 'telephone', 'coordinate_x', 'coordinate_y']
  for (const requiredParam of requiredParams) {
    console.log(params[requiredParam])
    if (!params[requiredParam]) {
      return {
        error: 'missing_param',
        message: `missing required param: ${requiredParam}`,
      }
    }
  }
}
