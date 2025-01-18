const express = require('express');

module.exports = function (unmeshedClient) {
    const router = express.Router();

    // Define the route
    router.get('/', async function (req, res, next) {
        try {
            const processId = req.query.id; // Extract the "id" parameter from the query string
            const processData = await unmeshedClient.getProcessData(processId, !!req.query.includeSteps);
            res.send(processData);
        } catch (error) {
            next(error); // Forward any errors to the error handler
        }
    });

    router.get('/startProcess', async function (req, res, next) {
        try {
            const request = {
                name: `${req.query.processName}`,
                namespace: `default`,
                requestId: `my-id-1`,
                correlationId: `my-crid-1`,
                input: {
                    "mykey": "value",
                    "mykeyNumber": 100,
                    "mykeyBoolean": true
                }
            }
            const processData = await unmeshedClient.runProcessSync(request);
            res.send(processData);
        } catch (error) {
            next(error); // Forward any errors to the error handler
        }
    });

    router.get('/terminate', async function (req, res, next) {
        try {
            const processIds = [1, 2, 3];
            const reason = "Terminating due to policy changes";
            const response = await unmeshedClient.bulkTerminate(processIds, reason);
            res.send(response);
        } catch (error) {
            next(error); // Forward any errors to the error handler
        }
    });

    router.get('/resume', async function (req, res, next) {
        try {
            const processIds = [1, 2, 3];
            const response = await unmeshedClient.bulkResume(processIds);
            res.send(response);
        } catch (error) {
            next(error); // Forward any errors to the error handler
        }
    });

    router.get('/review', async function (req, res, next) {
        try {
            const processIds = [1, 2, 3];
            const reason = "Fixed";
            const response = await unmeshedClient.bulkReviewed(processIds, reason);
            res.send(response);
        } catch (error) {
            next(error); // Forward any errors to the error handler
        }
    });

    router.get('/rerun', async function (req, res, next) {
        try {
            const response = await unmeshedClient.reRun(req.query.processId);
            res.send(response);
        } catch (error) {
            next(error); // Forward any errors to the error handler
        }
    });

    return router;
};
