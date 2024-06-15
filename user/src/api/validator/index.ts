const userDTOSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    mobileNo: { type: 'string', pattern: '^\\+?[1-9]\\d{1,14}$' },
  },
  required: [],
  additionalProperties: false,
}

const followsDTOSchema={
  type: 'object',
  properties:{
    followeeId: {type: 'string'}
  },
  required: ['followeeId'],
  additionalProperties: false,
}

export { userDTOSchema,followsDTOSchema }
