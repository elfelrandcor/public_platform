/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add: function(req, res) {

        var user = User.create({name: 'test!!'}, function(error, user) {
            user.save();
        });

        return res.send("Add!");
    }
};

