/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	form: function (request, response) {
    response.view();
  },

  add: function (request, response, next) {
    var title = request.param('title');
    var description = request.param('description');
    var body = request.param('body');

    if (!title || !body) {
      return response.redirect('post/form');
    }

    Post.create({
      title: title,
      description: description,
      body: body
    }, function (error, created) {
      if (error) return next(error);
      response.redirect('post/' + created.id);
    });
  }
};

