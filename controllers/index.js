const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);  // localhost:3001/api/

module.exports = router;
