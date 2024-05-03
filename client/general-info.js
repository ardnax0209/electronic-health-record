import { checkCase } from './chckCaseNumber-admin.js';

let jsonRes = await fetch('http://localhost:8080/user', {
          method: 'GET',
          headers: {
              'Content-Type': 'text/plain',
              'Username': atob(localStorage.getItem("username")),
          },
      })
          .then(response => response.json())
          .then(response => {
            return response;
          })
          .catch(err => console.error(err));

var imgSrc = "../public/" + jsonRes.pictureName;

let patientJson = await fetch('http://localhost:8080/patient', {
	method: 'GET',
	headers: {
		'Content-Type': 'text/plain',
		'caseID': localStorage.getItem("caseNumber"),
	},
})
	.then(response => response.json())
	.then(response => {
	  return response;
	})
	.catch(err => console.error(err));

document.querySelector('#app').innerHTML = `
    <div class="page-header">
        <div id="page-logo">
            <img src="../public/logo-ehr.png" alt="logo" width="400" height="96">
        </div>
        <div id="person-info">
            ${jsonRes.name}
            <br/>
            ${jsonRes.caseNumber}
        </div>
        <div id="person-pic">
            <img src=${imgSrc} alt="logo" width="150" height="100">
        </div>
    </div>
    <div class="main-content">
		<div class="menu-settings">
			<!-- Bootstrap row -->
			<!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
			<!-- Bootstrap List Group -->
			<ul class="list-group">
				<!-- Separator with title -->
				<!-- <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
					<small>MAIN MENU</small>
				</li> -->
				<!-- /END Separator -->
				<!-- Menu with submenu -->
				<a href="admin-homepage.html" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" id="profile-container">
					<div class="d-flex w-100 justify-content-start align-items-center">
						<span class="fa fa-dashboard fa-fw mr-3"></span>
						<span class="menu-collapsed">Rehab Patients</span>
						<span class="submenu-icon ml-auto"></span>
					</div>
				</a>
				<a href="pt-rehab.html" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
					<div class="d-flex w-100 justify-content-start align-items-center">
						<span class="fa fa-user fa-fw mr-3"></span>
						<span class="menu-collapsed">Referred to PT Rehab</span>
						<span class="submenu-icon ml-auto"></span>
					</div>
				</a>
				<a href="decking-page.html" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
					<div class="d-flex w-100 justify-content-start align-items-center">
						<span class="fa fa-user fa-fw mr-3"></span>
						<span class="menu-collapsed">Decking / Scheduling</span>
						<span class="submenu-icon ml-auto"></span>
					</div>
				</a>
				<!-- Submenu content -->
				<div id='submenu3' class="collapse sidebar-submenu">
					<a href="ptnotes-page.html" class="list-group-item list-group-item-action bg-dark text-white">
						<span class="menu-collapsed">+ Add New</span>
					</a>
				</div>
				<a href="statistics-page.html" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
					<div class="d-flex w-100 justify-content-start align-items-center">
						<span class="fa fa-user fa-fw mr-3"></span>
						<span class="menu-collapsed">Statistics</span>
						<span class="submenu-icon ml-auto"></span>
					</div>
				</a>
			</ul><!-- List Group END-->
			<div class="input-group" id="admin-search-div">
				<div class="form-outline" id="form-outline-id" data-mdb-input-init>
					<label class="form-label" for="form1">Search</label>
					<input type="search" id="form1" class="form-control" placeholder="Case Number"
					/>
				</div>
				<button type="button" class="btn btn-primary" data-mdb-ripple-init>New Patient
					<i class="fas fa-search"></i>
				</button>
			</div>
		</div>
		<div class="case-information">
		  <div class="personal-info">
		  	<div class="first-column">
			  Name: ${patientJson.name}
			  <br/>Patient ID: ${patientJson.patientId}
			  <br/>Contact E-mail: ${patientJson.email}
			  <br/>Contact Number: ${patientJson.phone}
			</div>
			<div class="second-column">
				Diagnosis: ${patientJson.diagnosis}
				<br/>DOB: ${patientJson.bday}
				<br/>Sex: ${patientJson.sex}
				<br/>HMO: ${patientJson.hmo}
			</div>	
		  </div>
		  <div class="status-information">
		  	Status
			<br/>
			<div class="container">
				<table id="myTable">
					
				</table>
			</div>
		  </div>
		  <div class="history">
		  	History
			<div class="history-details">
				&nbsp;&nbsp;&nbsp;
				Referred from:
				<br/><br/>
				<div class="form-container">
					<label for="exampleFormControlSelect1">REFER TO:</label>
					<select class="form-control" id="drpdwn-form">
						<option>Cardio</option>
						<option>Pulmonary</option>
						<option>Neuro</option>
						<option>Musculoskeletal</option>
					</select>
					<label for="exampleFormControlInput1">NOTES:</label>
					<input type="text" class="form-control" id="notes-form" placeholder="Reason">
				</div>
			</div>
		  </div>
		</div>
    </div>
`

checkCase(document.querySelector('#form1'));
createTable();

function createTable() {
	var table = document.getElementById("myTable");
    //var columnsInput = document.getElementById("columns");
    //var rowsInput = document.getElementById("rows");
    //var rows = parseInt(rowsInput.value);
	var columns = 3;
    var rows = 2;

	var tableData = [
		{
			"colName": "Action"
		},
		{
			"colName": "Date"
		},
		{
			"colName": "Dept. Provider"
		}
	];

      // Clear existing table
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // Create table header
    var headerRow = document.createElement("tr");
    for (var i = 0; i < columns; i++) {
        var th = document.createElement("th");
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "header-input");
        //input.setAttribute("placeholder", "Column " + (i + 1));
		input.setAttribute("placeholder", tableData[i].colName);
		input.readOnly = true;
        th.appendChild(input);
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create table rows
    for (var i = 0; i < rows; i++) {
        var rowData = [
			{
				"data": "Referral"
			},
			{
				"data": "04/14/2024"
			},
			{
				"data": "Cardiac Department"
			}
		];
        var row = document.createElement("tr");
        for (var j = 0; j < columns; j++) {
          var cell = document.createElement("td");
          cell.setAttribute("contenteditable", "true");
          cell.setAttribute("class", "editable-cell");
		  cell.setAttribute("contenteditable", "false");
          cell.addEventListener("input", updateCell);
          //rowData.push("");
		  if (i == 0) {
			cell.innerHTML = rowData[j].data;
		  } else {
			cell.innerHTML = `&nbsp;`;
		  }
          row.appendChild(cell);
        }
        table.appendChild(row);
        //tableData.push(rowData);
    }
}

function updateCell(event) {
	var rowIndex = event.target.parentNode.rowIndex - 1;
	var columnIndex = event.target.cellIndex;
	var value = event.target.textContent.trim();
	updateData(rowIndex, columnIndex, value);
}

function updateData(row, col, value) {
	tableData[row][col] = value;
}