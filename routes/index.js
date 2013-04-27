var models = require('../dbModels')

exports.index = function(req, res, next) {
    var pageList = 2;
    var page = req.query.page && parseInt(req.query.page, 10) || 0;
    models.Bug.count(function(err, count) {
        if (err) {
            return next(err);
        }
        var lastPage = Math.ceil(count / pageList) - 1
        models.Bug.find({})
            .populate('author') //populate everything
            .skip(pageList * page)
            .limit(pageList)
            .sort({totalSum: -1}) //timestamp
            .exec(function(err, bugs) {
            req.expbugs = bugs,
            req.explastpage = lastPage,
            req.exppage = page
        });


        models.Bug.find({})
            .populate('author') //populate everything
            .skip(pageList * page)
            .limit(pageList)
            .sort({ts: -1}) //timestamp
            .exec(function(err, bugs) {
            req.bugs = bugs;
            res.render('index', {
                req: req,
                page: page,
                lastPage: lastPage
            });
        });
    })
}

// exports.index = function( req, res, next){ 
//      var pageList = 2;
//      var page = req.query.page && parseInt(req.query.page, 10) || 0;

//      models.Bug.count(function(err, count) {
// //         if (err) {
// //             return next(err);
// //         }



//         models.Bug.find().populate('author').sort({totalSum: -1}).exec(function (err, bugs) {
//             req.bugs = bugs;
//             res.render('index', {req: req});
//         });
// }