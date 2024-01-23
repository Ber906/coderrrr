/**
 * @swagger
 * @typedef {object} Info
 * @property {string} title - The title of the API documentation.
 * @property {string} version - The version of the API documentation.
 * @property {string} description - A brief description of the API documentation.
 *
 * @typedef {object} Server
 * @property {string} url - The base URL of the server.
 * @property {string} description - A description of the server.
 *
 * @typedef {object} SwaggerDefinition
 * @property {string} openapi - The version of the OpenAPI Specification.
 * @property {Info} info - Information about the API.
 * @property {Server[]} servers - An array of server objects.
 *
 * @typedef {object} SwaggerOptions
 * @property {SwaggerDefinition} swaggerDefinition - The OpenAPI Specification definition.
 * @property {string[]} apis - An array of file paths or patterns for API route files.
 *
 * @typedef {object} SwaggerSpec
 * @property {string} apis - The generated Swagger specification based on the options.
 *
 * @typedef {object} SwaggerRouter
 * @property {Function} serve - Middleware to serve Swagger UI assets.
 * @property {Function} setup - Middleware to set up Swagger UI with the generated specification.
 */

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const router = express.Router();

/**
 * Generates Swagger documentation for the API based on the provided specifications.
 * @type {SwaggerRouter}
 */
const swaggerRouter = (() => {
  /**
   * @type {SwaggerDefinition}
   */
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'ꋬ꒐ ꋬꉣ꒐',
      version: '1.0.0',
      description: "ᴇɴᴊᴏʏ ғʀᴇᴇ ʟʟᴍ ᴀᴘɪ",
    },
    servers: [
      {
        url: 'https://7510ece7-8c2f-40b0-8b24-7110dec13501-00-3fwhr71hbhv6.sisko.replit.dev',
        description: 'Development Server',
      },
    ],
  };

  /**
   * @type {SwaggerOptions}
   */
  const options = {
    swaggerDefinition,
    apis: ['./public/swagger.js', './router/main.js'], // Update with your actual paths
  };

  /**
   * @type {SwaggerSpec}
   */
  const swaggerSpec = swaggerJSDoc(options);

  /**
   * @type {SwaggerRouter}
   */
  const swaggerRouter = express.Router();
  swaggerRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  return swaggerRouter;
})();

module.exports = swaggerRouter;
