export const operationMap = {
  get: 'GET',
  put: 'PUT',
  post: 'POST',
  delete: 'DELETE',
  options: 'OPTIONS',
  head: 'HEAD',
  patch: 'PATCH',
  trace: 'TRACE',
} as const

export const mockSpec = {
  info: {
    version: '1',
    title: 'title',
  },
  servers: [
    {
      url: 'https://stoplight.io/mocks/some/sub-some/123123',
      description: 'cloud mock',
    },
    {
      description: 'local mock',
      url: 'http://185.0.0.1:3100',
    },
    {
      url: 'https://some.someweb.com/api',
      description: 'dev',
    },
  ],
  paths: {
    '/auth/v1/confirm': {
      post: {
        summary: 'verification',
        operationId: 'post-auth-confirm',
        responses: {
          200: {
            description: 'Successful authorization',
            content: {
              'application/json': {
                schema: {
                  title: 'TokensPair',
                  type: 'object',
                  description: 'Tokens Pair',
                  properties: {
                    accessToken: {
                      type: 'string',
                      description: 'Access Token',
                    },
                    refreshToken: {
                      title: 'RefreshToken',
                      type: 'string',
                      description: 'Refresh Token',
                    },
                  },
                  required: ['accessToken', 'refreshToken'],
                },
              },
            },
          },
          403: {
            description: 'attempts amount',
            content: {
              'application/json': {
                schema: {
                  title: 'ConfirmErrorResponse',
                  type: 'object',
                  properties: {
                    attempts: {
                      type: 'integer',
                      format: 'uint64',
                      minimum: 1,
                      exclusiveMinimum: false,
                    },
                  },
                  required: ['attempts'],
                },
              },
            },
            headers: {},
          },
          422: {
            description: 'Example response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  title: 'ConfirmResponse422',
                  properties: {
                    code: {
                      type: 'string',
                      title: 'ConfirmCode422',
                      enum: [
                        'ErrUserNotFound',
                        'ErrTooManyContacts',
                        'ErrUserHasNotChildren',
                      ],
                    },
                  },
                  required: ['code'],
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
          },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                title: 'ConfirmRequest',
                type: 'object',
                properties: {
                  otpID: {
                    type: 'string',
                    title: 'OTPID',
                    description: 'OTP identifier',
                    format: 'uuid',
                  },
                  otpCode: {
                    type: 'string',
                    description: 'OTP code',
                    pattern: '\\d+',
                    minLength: 1,
                  },
                },
                required: ['otpID', 'otpCode'],
              },
            },
          },
        },
        description: '',
        tags: ['auth'],
        'x-internal': false,
        security: [],
      },
      parameters: [],
    },
  },
}
