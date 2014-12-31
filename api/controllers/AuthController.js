/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function (request, response) {
    request.session.authenticated = true;
    return response.redirect("/");
  },
  logout: function (request, response) {
      request.session.authenticated = false;
    return response.redirect("/");
  }
};

