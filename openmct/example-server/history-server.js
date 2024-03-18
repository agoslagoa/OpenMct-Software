var express = require('express');

function HistoryServer(boat) {
    var router = express.Router();

    router.get('/:pointId', function (req, res) {
        var start = +req.query.start;
        var end = +req.query.end;
        var ids = req.params.pointId.split(',');
        console.log("History request for " + ids + " between " + start + " and " + end)
        var response = ids.reduce(function (resp, id) {
            return resp.concat(boat.history[id].filter(function (p) {
                return p.timestamp > start && p.timestamp < end;
            }));
        }, []);
        //console.log(boat.history[ids]);
        //console.log(boat.history[ids].filter(function (p) {
          //  return p.timestamp > start && p.timestamp < end}));
        res.status(200).json(response).end();
    });

    return router;
}

module.exports = HistoryServer;

