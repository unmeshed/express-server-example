const express = require('express');

module.exports = function (unmeshedClient) {
  const router = express.Router();

  // Define the route
  router.get('/', async function (req, res, next) {
    try {
      const processId = req.query.id; // Extract the "id" parameter from the query string
      const processData = await unmeshedClient.getProcessData(processId || 1375900136);
      res.send(processData);
    } catch (error) {
      next(error); // Forward any errors to the error handler
    }
  });

  return router;
};
