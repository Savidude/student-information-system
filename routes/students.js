var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

/* GET students listing. */
router.get('/', function(req, response, next) {
    var mongoClient = mongo.MongoClient;
    var url = "mongodb://localhost:27017/";

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("student-information-system");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
            response.status(200).json(result);
            db.close();
        });
    });
});

router.get('/view', function(req, res, next) {
    res.render('studentView', { title: 'Student Data' });
});

/* ADD new student */
router.post("/", function (req, response, next) {
    var mongoClient = mongo.MongoClient;
    var url = "mongodb://localhost:27017/";

    var name = req.body.name;
    var email = req.body.email;
    var line1 = req.body.line1;
    var line2 = req.body.line2;
    var state = req.body.state;
    var city = req.body.city;
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
                city : city,
                state : state,
                zip : zip
            }
        };

        database.collection("students").insertOne(student, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            response.redirect("/");
            db.close();
        });
    });
});

/* Update student */
router.post("/update", function (req, response, next) {
    var mongoClient = mongo.MongoClient;
    var url = "mongodb://localhost:27017/";

    var name = req.body.name;
    var email = req.body.email;
    var line1 = req.body.line1;
    var line2 = req.body.line2;
    var state = req.body.state;
    var city = req.body.city;
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
                city : city,
                state : state,
                zip : zip
            }
        };
        var query = { name : name };
        
        database.collection("students").updateOne(query, { $set : student }, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.redirect("/students/view");
            db.close();
        });
    });
});

/* Delete student */
router.post("/delete", function (req, response, next) {
    var mongoClient = mongo.MongoClient;
    var url = "mongodb://localhost:27017/";

    var name = req.body.name;

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db("student-information-system");
        var query = { name : name };

        console.log(query)

        database.collection("students").deleteOne(query, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            response.status(200);
            db.close();
        });
    });
});

module.exports = router;
