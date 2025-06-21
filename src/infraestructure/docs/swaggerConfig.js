const swaggerJSDoc = require('swagger-jsdoc');
const config = require('../../config');
const RefreshToken = require('../../application/useCases/RefreshToken');
const port = config.port;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de e-commerce con autenticación y gestión de productos',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: { 
              type: 'string',
              description: 'Nombre del producto'
            },
            price: { 
              type: 'number',
              description: 'Precio del producto'
            },
            description: { 
              type: 'string',
              description: 'Descripción del producto'
            },
          },
        },
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { 
              type: 'string',
              description: 'Nombre de usuario'
            },
            email: { 
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario'
            },
            password: { 
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            },
            roles: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Roles del usuario',
              default: ['user']
            }
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            }
          }
        },
        RefreshTokenRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: {
              type: 'string',
              description: 'Refresh token'
            }
          }
        },
        CustomerRequest: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del cliente'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del cliente'
            },
            address: {
              type: 'string',
              description: 'Dirección del cliente'
            },
            nitCi: {
              type: 'string',
              description: 'NIT o CI del cliente'
            },
            phone: {
              type: 'string',
              description: 'Teléfono del cliente'
            },
          }
        },
        CustomerResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del cliente'
            },
            name: {
              type: 'string',
              description: 'Nombre del cliente'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del cliente'
            },
            address: {
              type: 'string',
              description: 'Dirección del cliente'
            },
            nitCi: {
              type: 'string',
              description: 'NIT o CI del cliente'
            },
            phone: {
              type: 'string',
              description: 'Teléfono del cliente'
            },
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT token de autenticación'
            },
            expiresIn: {
              type: 'integer',
              description: 'Tiempo de expiración del token en segundos'
            },
            refreshToken: {
              type: 'string',
              description: 'Refresh token para obtener un nuevo JWT'
            },
            expireRefreshIn: {
              type: 'integer',
              description: 'Tiempo de expiración del refresh token en segundos'
            },
            expiresAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de expiración del token'
            },
            expiresAtRefresh: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de expiración del refresh token'
            }
          }
        },
        RefreshTokenResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Nuevo JWT token de autenticación'
            },
            expiresIn: {
              type: 'integer',
              description: 'Tiempo de expiración del nuevo token en segundos'
            },
            refreshToken: {
              type: 'string',
              description: 'Nuevo refresh token'
            },
            expireRefreshIn: {
              type: 'integer',
              description: 'Tiempo de expiración del nuevo refresh token en segundos'
            },
            expiresAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de expiración del nuevo token'
            },
            expiresAtRefresh: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de expiración del nuevo refresh token'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Descripción del error'
            },
            code: {
              type: 'integer',
              description: 'Código de error'
            }
          }
        }
        // Aquí puedes definir más esquemas según sea necesario
        // Por ejemplo, si tienes un esquema para la respuesta de autenticación:
        // AuthResponse: {
        //   type: 'object',
        //   properties: {
        //     user: {
        //       $ref: '#/components/schemas/User'
        //     },
        //     token: {
        //       type: 'string',
        //       description: 'JWT token de autenticación'
        //     }
        //   }
        // }
      },
    },
  },
  apis: ['./src/adapters/routes/*.js'], 
};

module.exports = swaggerJSDoc(options);