var express = require('express')
var app = express()
var cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');

var db;
var uName;
var pWord;

const PORT = process.env.PORT;
 
app.use(cors())
 
app.get('/login', function (req, res, next) {
  // `req.get()` is case-insensitive.
  uName = req.get('Username');
  pWord = req.get('Password');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
  let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the database.");
      db.all(`
      SELECT username FROM loginInformation
      WHERE username = ${uName} AND password = ${pWord}`, (err, rows) => {
          try {
            rows.forEach(rows => {
              res.json(rows.username);
          });
          } catch (e) {
            res.json("Employee ID or password is incorrect");
          }
          
      });
    }
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
})

app.get('/version', function (req, res, next) {
  res.json({msg: process.env.VERSION})
})

app.get('/user', function (req, res, next) {
  uName = req.get('Username');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
  let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the database.");
      db.all(`
      SELECT username, name, picture FROM loginInformation
      WHERE username = ${uName}`, (err, rows) => {
          try {
            rows.forEach(rows => {
              res.json({
                  caseNumber: rows.username,
                  name: rows.name,
                  pictureName: rows.picture
                });
          });
          } catch (e) {
            res.json("Error. Go back to homepage.");
          }
          
      });
    }
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
})

app.get('/caseNumber', function (req, res, next) {
  caseNum = req.get('CaseNumber');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
	let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
	  if (err) {
		console.error(err.message);
	  } else {
		console.log("Connected to the database.");
		db.all(`
		SELECT patientId, nameOfPt, status FROM caseInformation
		WHERE caseNumber = ${caseNum}`, (err, rows) => {
			try {
			  rows.forEach(rows => {
				res.json({
					patientId: rows.patientId,
					nameOfPt: rows.nameOfPt,
					status: rows.status
				  });
			});
			} catch (e) {
			  res.json("No result");
			}
			
		});
	  }
	});

	db.close((err) => {
	  if (err) {
		console.error(err.message);
	  }
	  console.log('Close the database connection.');
	});
})

app.get('/patient', function (req, res, next) {
  caseNum = req.get('caseID');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
	let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
	  if (err) {
		console.error(err.message);
	  } else {
		console.log("Connected to the database.");
		db.all(`
		SELECT patientInformation.patientId AS ID, patientInformation.name AS patientName, patientInformation.email AS patientEmail, patientInformation.phone AS patientNum, patientInformation.birthday AS patientBday, patientInformation.sex AS gender, patientInformation.hmo AS patientHMO, caseInformation.diagnosis AS diagnosis FROM patientInformation INNER JOIN caseInformation ON caseInformation.patientId=patientInformation.patientId WHERE caseInformation.caseNumber = ${caseNum}`, (err, rows) => {
			try {
			  rows.forEach(rows => {
				res.json({
					patientId: rows.ID,
          name: rows.patientName,
          email: rows.patientEmail,
          phone: rows.patientNum,
          bday: rows.patientBday,
          sex: rows.gender,
          hmo: rows.patientHMO,
          diagnosis: rows.diagnosis
				  });
			});
			} catch (e) {
			  res.json("No result");
			}
			
		});
	  }
	});

	db.close((err) => {
	  if (err) {
		console.error(err.message);
	  }
	  console.log('Close the database connection.');
	});
})

app.get('/file', function (req, res, next) {
  fileName = req.get('fileName');
  const path = 'client/public/';
  let existsFlag = false;

  var files = fs.readdirSync(path);

  //console.log("\nCurrent directory filenames:"); 
  files.forEach(file => { 
    if (fileName == file) {
      existsFlag = true;
    }
  }); 

  if (existsFlag == true) {
    res.json(fileName);
  } else {
    res.json("Does not exist");
  }
})
 
app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port ' + PORT)
})