
const createPostDTOSchema = {
    type: 'object',
    properties: {
      imageUrl: { type: 'string', nullable: true },
      text: { type: 'string', minLength: 1 },
      hashtag: {type: 'array'}
    },
    required: ['text'],
    additionalProperties: false,
  }
  
  const updatePostDTOSchema = {
    type: 'object',
    properties: {
      imageUrl: { type: 'string', nullable: true },
      text: { type: 'string', minLength: 1 },
    },
    required: [],
    additionalProperties: false,
  }

  export {
    createPostDTOSchema,
    updatePostDTOSchema
  }