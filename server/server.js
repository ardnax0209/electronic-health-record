var express = require('express')
var cors = require('cors')
var app = express()
const sqlite3 = require('sqlite3').verbose();

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
 
app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port ' + PORT)
})