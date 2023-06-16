const withAuth = (req, res, next) => {
    // not logged in, redirect to /login route
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
