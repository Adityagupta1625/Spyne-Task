const signUpDTOSchema = {
    type: 'object',
    properties: {
      email: { type: 'string'},
      password: { type: 'string', minLength: 6 },
      name: { type: 'string', minLength: 1 },
      mobileNo: { type: 'string', pattern: '^\\+?[1-9]\\d{1,14}$' },
    },
    required: ['email', 'password', 'name', 'mobileNo'],
    additionalProperties: false,
  }
  
  const loginDTOSchema = {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string', minLength: 6 },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  }
  
  export {
      signUpDTOSchema,
      loginDTOSchema
  }