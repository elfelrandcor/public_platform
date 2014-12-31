/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (request, response, next) {
    response.view('main');
  },

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
      Post.publishCreate(created);
      response.redirect('post/' + created.id);
    });
  },

  subscribe: function (request, response, next) {
    Post.find().limit(10).sort('createdAt desc').exec(function(err, posts) {
      if (err) {
        return next(err);
      }
      Post.watch(request);
      response.json(posts);
    });
  }
};

