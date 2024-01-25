export const _paramsValidator = params => {
  const requiredParams = ['name', 'email', 'telephone']
  for (const requiredParam of requiredParams) {
    if (!params[requiredParam]) {
      return {
        error: 'missing_param',
        message: `missing required param: ${requiredParam}`,
      }
    }
  }

  return params
}
