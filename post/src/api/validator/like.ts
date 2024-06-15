const postLikesDTOSchema = {
    type: 'object',
    properties: {
     
      discussionId: { type: 'string', minLength: 1 },
    },
    required: ['discussionId'],
    additionalProperties: false,
  };
  
  const commentLikesDTOSchema = {
    type: 'object',
    properties: {

      commentId: { type: 'string', minLength: 1 },
    },
    required: ['commentId'],
    additionalProperties: false,
  };

  export {
    postLikesDTOSchema,
    commentLikesDTOSchema
  }