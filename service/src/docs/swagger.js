const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'To-Do List API',
            version: '1.0.0',
            description: 'To-Do List loyihasi uchun API hujjatlari',
        },
        servers: [
            {
                url: 'http://localhost:6420',
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
        },
        security: [{ BearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'], // API yo‘nalishlari joylashgan fayllarni ko‘rsatamiz
};

// Swagger hujjatlarini yaratish
const swaggerSpec = swaggerJSDoc(options);

// Swagger hujjatlarini eksport qilamiz
module.exports = swaggerSpec;
