/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (request, response) {
    var name = request.param('login');
    var password = request.param('password');
    User.findByName(name).exec(function (error, user) {
      if (password == user.password) {
        request.session.authenticated = true;
      }
    });

    return response.redirect("/");
  },
  logout: function (request, response) {
      request.session.authenticated = false;
    return response.redirect("/");
  }
};

