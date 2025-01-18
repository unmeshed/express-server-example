const express = require('express');

module.exports = function (unmeshedClient) {
  const router = express.Router();

  router.get('/', async function (req, res, next) {
    try {
      const stepId = req.query.id; // Extract the "id" parameter from the query string
      const stepData = await unmeshedClient.getStepData(stepId || 1375900126);
      res.send(stepData);
    } catch (error) {
      console.log("error1", error);
      next(error);
    }
  });

  return router;
};
