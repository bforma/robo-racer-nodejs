module.exports = function(app) {
    var index = function(req, res){
        res.render('index');
    };

    app.get('/', index);

    app.get('/partials/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    // redirect all others to the index (HTML5 history)
    app.get('*', index);
};