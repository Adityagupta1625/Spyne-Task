
const postCommentsDTOSchema = {
    type: 'object',
    properties: {
      text: { type: 'string', minLength: 1 },
      discussionId: { type: 'string', minLength: 1 },
    },
    required: ['text', 'discussionId'],
    additionalProperties: false,
  }
  
  const replyCommentsDTOSchema = {
    type: 'object',
    properties: {
      text: { type: 'string', minLength: 1 },
      parentId: { type: 'string', minLength: 1 },
    },
    required: ['text', 'parentId'],
    additionalProperties: false,
  }
  
  const updateCommentsDTOSchema = {
    type: 'object',
    properties: {
      text: { type: 'string', minLength: 1 },
    },
    required: ['text'],
    additionalProperties: false,
  }

  export {
    postCommentsDTOSchema,
    replyCommentsDTOSchema,
    updateCommentsDTOSchema
  }