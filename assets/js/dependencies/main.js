(function (io) {

    var $postBox = $('.main-post-box');

    // as soon as this file is loaded, connect automatically,
    var socket = io.connect();
    if (typeof console !== 'undefined') {
        log('Connecting to Sails.js...');
    }

    socket.on('connect', function socketConnected() {

        // Listen for Comet messages from Sails
        socket.on('message', function messageReceived(message) {

            ///////////////////////////////////////////////////////////
            // Replace the following with your own custom logic
            // to run when a new message arrives from the Sails.js
            // server.
            ///////////////////////////////////////////////////////////
            log('New comet message received :: ', message);
            //////////////////////////////////////////////////////

        });


        ///////////////////////////////////////////////////////////
        // Here's where you'll want to add any custom logic for
        // when the browser establishes its socket connection to
        // the Sails.js server.
        ///////////////////////////////////////////////////////////
        log(
            'Socket is now connected and globally accessible as `socket`.\n' +
            'e.g. to send a GET request to Sails, try \n' +
            '`socket.get("/", function (response) ' +
            '{ console.log(response); })`'
        );
        ///////////////////////////////////////////////////////////

        socket.get('/post/subscribe', function(posts) {
            $.each(posts, function (key, post) {
                $("<div class='col-sm-6 col-md-4 col-lg-4'><div class='thumbnail'><div class='caption'><h3>" + post.title + "</h3></div><p>" + (typeof post.description != 'undefined' ? post.description : '') + "</p></div></div>").appendTo($postBox);
            });
        });

        socket.on('post', function (data) {
            var post = data.data;
            $("<div class='col-sm-6 col-md-4 col-lg-4'><div class='thumbnail'><div class='caption'><h3>" + post.title + "</h3></div><p>" + (typeof post.description != 'undefined' ? post.description : '') + "</p></div></div>").appendTo($postBox);
        });
    });


    // Expose connected `socket` instance globally so that it's easy
    // to experiment with from the browser console while prototyping.
    window.socket = socket;


    // Simple log function to keep the example simple
    function log () {
        if (typeof console !== 'undefined') {
            console.log.apply(console, arguments);
        }
    }


})(

    // In case you're wrapping socket.io to prevent pollution of the global namespace,
    // you can replace `window.io` with your own `io` here:
    window.io

);
