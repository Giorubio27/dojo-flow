const swaggerAutogen = require('swagger-autogen')();



const doc = {
    info: {
        title: 'Dojo Flow API',
        description: 'API documentation for martial arts application',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],

   
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);