/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (request,response){
    response.view();
  },

  upload: function  (request, response) {
    var uploadPath = './assets/images/';
    var prefix = request.param('prefix');
    if (typeof prefix != 'undefined') {
      uploadPath += prefix;
    }
    request.file('file').upload({dirname: uploadPath}, function (error, files) {
      if (error)
        return response.serverError(error);

      return response.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
};

