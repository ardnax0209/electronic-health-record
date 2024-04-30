var express = require('express')
var app = express()
var formidable = require('formidable');
var cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
const path = require('node:path'); 

var db;
var uName;
var pWord;

const PORT = process.env.PORT;
 
app.use(cors())
 
app.get('/login', function (req, res) {
  // `req.get()` is case-insensitive.
  uName = req.get('Username');
  pWord = req.get('Password');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
  let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
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
  });
})

app.get('/version', function (req, res) {
  res.json({msg: process.env.VERSION})
})

app.get('/user', function (req, res) {
  uName = req.get('Username');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
  let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
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
  });
})

app.get('/caseNumber', function (req, res) {
  caseNum = req.get('CaseNumber');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
	let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
	  if (err) {
		console.error(err.message);
	  } else {
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
	});
})

app.get('/patient', function (req, res) {
  caseNum = req.get('caseID');
  const path = "server/db/chinese-general-hospital-db.db";

  // open the database
	let db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
	  if (err) {
		console.error(err.message);
	  } else {
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
	});
})

app.get('/checkFile', function (req, res) {
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

app.post('/uploadFile', function (req, res) {
  fileName = req.get('fileName');
  const uploadFolder = path.join(__dirname, "../client/public", fileName);
  
  const form = new formidable.IncomingForm();
  
  // Basic Configuration
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;
  //form.maxFileSize = 50 * 1024 * 1024; // 5MB
  // store all uploads in the /uploads directory
  //form.uploadDir = uploadFolder;

  // Parsing
  form.parse(req, (err, fields, files) => {
    //console.log(fields);
    console.log(files);
    
    fs.rename(files.xrayfile[0].filepath, uploadFolder, function (err) {
      if (err) throw err;
      res.json('File uploaded and moved!');
      res.end();
    });
  });
})
 
app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port ' + PORT)
})