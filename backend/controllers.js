var mysql = require('mysql');  
const dotenv = require('dotenv');
const webpush = require('web-push');
const {MongoClient} = require('mongodb');


var url = "mongodb://localhost:27017/mydb";
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("departments", function(err, res) {
      if (err) throw err;
      console.log("Collection departments created!");
      //db.close();
    });

    dbo.createCollection("employees", function(err, res) {
        if (err) throw err;
        console.log("Collection employees created!");
        //db.close();
    });
});


exports.findDepartments = (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log ("connect error");  
            console.log (err);
            res.status(400).json({
                success: false, error: err
            });
            return;
        }
        var dbo = db.db("mydb");
        dbo.collection("departments").find({}).toArray(function(err, result) {
            if (err) {
                res.status(400).json({
                    success: false, error: err
                });
             }
            //console.log(result);
            res.json({ success: true, data: result});
        });
      });
};

exports.addDepartment = (req, res) => {
        console.log ("addDepartment");
        const {dept_no, dept_name} = req.body.data;
        console.log(dept_no);
        console.log(dept_name); 
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log ("connect error");  
                console.log (err);
                res.status(400).json({
                    success: false, error: err
                });
                return;
            }
            var dbo = db.db("mydb");
            var myobj = { dept_no: dept_no, dept_name: dept_name };
            dbo.collection("departments").insertOne(myobj, function(err, response) {
                if (err) {
                    console.log ("insert error");  
                    console.log (err);
                    res.status(400).json({
                        success: false, error: err
                    });
                    return;
                }
                console.log("1 department document inserted");
                //console.log(response);
                res.status(200).json({ success: true, error: ""});
            });
        });       
};

exports.updateDepartment = (req, res) => {
    console.log ("updateDepartment");
    const {old_no, old_name, dept_no, dept_name} = req.body.data;
    console.log(old_no);
    console.log(old_name);   
    console.log(dept_no);
    console.log(dept_name);        
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log ("connect error");  
            console.log (err);
            res.status(400).json({
                success: false, error: err
            });
            return;
        }
        var dbo = db.db("mydb");
        var myquery = { dept_no: old_no, dept_name: old_name};
        var newvalues = { $set: {dept_no: dept_no, dept_name: dept_name } };
        dbo.collection("departments").updateOne(myquery, newvalues, function(err, response) {
            if (err) {
                console.log ("update  error");  
                console.log (err);
                res.status(400).json({
                    success: false, error: err
                });
                return;
            }
            console.log("1 dept document updated");
            res.status(200).json({ success: true, error: ""});
        });
      });
};


exports.deleteDepartment = (req, res) => {
        console.log ("deleteDepartment");
        const {dept_no, dept_name} = req.body;
        console.log(dept_no);
        console.log(dept_name);        
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log ("connection error");  
                console.log (err);
                res.status(400).json({
                    success: false, error: err
                });
                return;
            }
            var dbo = db.db("mydb");
            var myquery = { dept_no: dept_no, dept_name : dept_name };
            dbo.collection("departments").deleteOne(myquery, function(err, obj) {
                if (err) {
                    console.log ("delete error");  
                    console.log (err);
                    res.status(400).json({
                        success: false, error: err
                    });
                    return;
                }
                console.log("1 dept document depleted");
                res.status(200).json({ success: true, error: ""});
            });
        });
};
