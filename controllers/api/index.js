const router = require('express').Router();

const userRoutes = require('./user-routes');

router.use('/users', userRoutes);   // localhost:3001/api/users

module.exports = router;
