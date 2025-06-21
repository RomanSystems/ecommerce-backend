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
        },

        OrderRequest: {
          type: 'object',
          required: ['customerId', 'items', 'paymentMethod', 'shippingAddress'],
          properties: {
            customerId: {
              type: 'string',
              description: 'ID del cliente que realiza el pedido'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['productId', 'quantity', 'unitPrice'],
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto'
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Cantidad del producto'
                  },
                  unitPrice: {
                    type: 'number',
                    description: 'Precio unitario del producto'
                  }
                }
              },
              description: 'Lista de productos en el pedido'
            },
            coupon: {
              type: 'string',
              description: 'ID del cupón aplicado al pedido',
              nullable: true
            },
            subtotal: {
              type: 'number',
              description: 'Subtotal del pedido'
            },
            discount: {
              type: 'number',
              description: 'Descuento aplicado al pedido'
            },
            tax: {
              type: 'number',
              description: 'Impuesto aplicado al pedido'
            },
            shippingCost: {
              type: 'number',
              description: 'Costo de envío'
            },
            totalAmount: {
              type: 'number',
              description: 'Monto total del pedido'
            },
            paymentMethod: {
              type: 'string',
              description: 'Método de pago (por ejemplo: card, cash, etc.)'
            },
            shippingAddress: {
              type: 'object',
              required: ['street', 'city', 'country', 'zip'],
              properties: {
                street: {
                  type: 'string',
                  description: 'Calle de la dirección de envío'
                },
                city: {
                  type: 'string',
                  description: 'Ciudad de la dirección de envío'
                },
                country: {
                  type: 'string',
                  description: 'País de la dirección de envío'
                },
                zip: {
                  type: 'string',
                  description: 'Código postal de la dirección de envío'
                }
              }
            }
          }
        },

        OrderResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del pedido'
            },
            customerId: {
              type: 'string',
              description: 'ID del cliente que realizó el pedido'
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto'
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Cantidad del producto'
                  }
                }
              },
              description: 'Lista de productos en el pedido'
            },
            totalAmount: {
              type: 'number',
              description: 'Monto total del pedido'
            },
            status: {
              type: 'string',
              description: 'Estado del pedido'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora de creación del pedido'
            }
          }
        },
        OrderRequestWithItems: {
          type: 'object',
          required: ['customerId', 'items', 'paymentMethod', 'shippingAddress'],
          properties: {
            customerId: {
              type: 'string',
              description: 'ID del cliente que realiza el pedido'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItemRequest'
              },
              description: 'Lista de productos en el pedido'
            },
            coupon: {
              type: 'string',
              description: 'ID del cupón aplicado al pedido',
              nullable: true
            },
            subtotal: {
              type: 'number',
              description: 'Subtotal del pedido'
            },
            discount: {
              type: 'number',
              description: 'Descuento aplicado al pedido'
            },
            tax: {
              type: 'number',
              description: 'Impuesto aplicado al pedido'
            },
            shippingCost: {
              type: 'number',
              description: 'Costo de envío'
            },
            totalAmount: {
              type: 'number',
              description: 'Monto total del pedido'
            },
            paymentMethod: {
              type: 'string',
              description: 'Método de pago (por ejemplo, tarjeta, efectivo, etc.)'
            },
            shippingAddress: {
              type: 'object',
              required: ['street', 'city', 'country', 'zip'],
              properties: {
                street: {
                  type: 'string',
                  description: 'Calle de la dirección de envío'
                },
                city: {
                  type: 'string',
                  description: 'Ciudad de la dirección de envío'
                },
                country: {
                  type: 'string',
                  description: 'País de la dirección de envío'
                },
                zip: {
                  type: 'string',
                  description: 'Código postal de la dirección de envío'
                }
              }
            }
          }
        },
        OrderItem: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'ID del producto'
            },
            quantity: {
              type: 'integer',
              description: 'Cantidad del producto'
            }
          }
        },
        OrderItemRequest: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: {
              type: 'string',
              description: 'ID del producto'
            },
            quantity: {
              type: 'integer',
              description: 'Cantidad del producto'
            }
          }
        },
        OrderItemResponse: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'ID del producto'
            },
            quantity: {
              type: 'integer',
              description: 'Cantidad del producto'
            },
            price: {
              type: 'number',
              description: 'Precio del producto'
            }
          }
        },
        CouponRequest: {
          type: 'object',
          required: ['code', 'discountType', 'discountValue', 'maxUses', 'maxUsesPerUser', 'minOrderAmount', 'startDate', 'endDate', 'isActive'],
          properties: {
            code: {
              type: 'string',
              description: 'Código del cupón'
            },
            discountType: {
              type: 'string',
              enum: ['fixed', 'percentage'],
              description: 'Tipo de descuento (fixed o percentage)'
            },
            discountValue: {
              type: 'number',
              description: 'Valor del descuento'
            },
            maxUses: {
              type: 'integer',
              description: 'Máximo de usos totales del cupón'
            },
            maxUsesPerUser: {
              type: 'integer',
              description: 'Máximo de usos por usuario'
            },
            minOrderAmount: {
              type: 'number',
              description: 'Monto mínimo de pedido para aplicar el cupón'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de inicio de validez del cupón'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de fin de validez del cupón'
            },
            isActive: {
              type: 'boolean',
              description: 'Indica si el cupón está activo'
            },
            applicableProducts: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'IDs de productos a los que aplica el cupón'
            }
          }
        },
        CouponResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del cupón'
            },
            code: {
              type: 'string',
              description: 'Código del cupón'
            },
            discountType: {
              type: 'string',
              enum: ['fixed', 'percentage'],
              description: 'Tipo de descuento (fixed o percentage)'
            },
            discountValue: {
              type: 'number',
              description: 'Valor del descuento'
            },
            maxUses: {
              type: 'integer',
              description: 'Máximo de usos totales del cupón'
            },
            maxUsesPerUser: {
              type: 'integer',
              description: 'Máximo de usos por usuario'
            },
            minOrderAmount: {
              type: 'number',
              description: 'Monto mínimo de pedido para aplicar el cupón'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de inicio de validez del cupón'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de fin de validez del cupón'
            },
            isActive: {
              type: 'boolean',
              description: 'Indica si el cupón está activo'
            },
            applicableProducts: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'IDs de productos a los que aplica el cupón'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del cupón'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización del cupón'
            }
          }
        }
        // Aquí puedes definir más esquemas según sea necesario
      },
    },
  },
  apis: ['./src/adapters/routes/*.js'],
};

module.exports = swaggerJSDoc(options);