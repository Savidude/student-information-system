var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET students listing. */
router.get('/', function(req, res, next) {
    var mongoClient = mongo.MongoClient;
    var url = "mongodb://localhost:27017/";

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("student-information-system");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(JSON.stringify(result, null, 2));
            db.close();
        });
    });

    res.send('respond with a resource');
});

/* ADD new student */
router.post("/create", function (req, res, next) {
    var mongoClient = mongo.MongoClient;
    var url = "mongodb://localhost:27017/";

    var name = req.body.name;
    var email = req.body.email;
    var line1 = req.body.line1;
    var line2 = req.body.line2;
    var state = req.body.state;
    var zip = req.body.zip;

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db("student-information-system");
        var student = {
            name : name,
            email : email,
            address : {
                line1 : line1,
                line2 : line2,
                state : state,
                zip : zip
            }
        };

        database.collection("students").insertOne(student, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
});


module.exports = router;
