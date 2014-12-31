/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (request, response) {
    if (request.session.authenticated) {
      return response.redirect("/");
    }

    var name = request.param('login');
    var password = request.param('password');
    if (!name || !password) {
      return response.redirect("/auth/form");
    }

    User.findOneByName(name).exec(function (error, user) {
      if (error) response.negotiate(error);
      if (password == user.password) {
        request.session.authenticated = true;
        return response.redirect("/");
      }
    });
  },
  logout: function (request, response) {
      request.session.authenticated = false;
    return response.redirect("/");
  },
  form: function (request, response) {
    response.view();
  }
};

