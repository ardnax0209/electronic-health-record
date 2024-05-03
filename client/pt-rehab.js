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

var imgSrc = "public/" + jsonRes.pictureName;

document.querySelector('#app').innerHTML = `
    <div class="login-header">
        &nbsp;
    </div>
    <div class="page-header">
        <div id="page-logo">
            <img src="public/logo-with-name.png" alt="logo" width="400" height="96">
        </div>
        <div id="person-info">
            <b>${jsonRes.name}</b>
            <br/>
            ${jsonRes.caseNumber}
        </div>
        <div id="person-pic">
            <img src=${imgSrc} alt="logo" width="100" height="100">
        </div>
    </div>
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
            <a href="index.html" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" id="profile-container">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-dashboard fa-fw mr-3"></span>
                    <span class="menu-collapsed">Log out</span>
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
            <button type="button" class="btn btn-primary" id="loginBttn" data-mdb-ripple-init>New Patient
                <i class="fas fa-search"></i>
            </button>
        </div>
    </div>
    <div class="main-body">
        <div class="table-container">
            <table id="rehabTbl">
            </table>
        </div>
        <div class="sort-container">
            <p>Sort by</p> &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
            </svg> &nbsp; &nbsp;
            <select class="form-control" id="exampleFormControlSelect1">
                <option>Date</option>
                <option>Case No</option>
                <option>Name</option>
                <option>Status</option>
            </select>
        </div>
    </div>
`

populateTbl();

document.querySelector('#exampleFormControlSelect1').onchange = async function () {
    populateTbl();
};

async function populateTbl () {
    let patientJson = await fetch('http://localhost:8080/getReferral', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'sort-option': document.getElementById("exampleFormControlSelect1").value
        }
      })
        .then(response => response.json())
        .then(response => {
          return response;
        })
        .catch(err => console.error(err));
      
      var table = document.getElementById("rehabTbl");

    var headerData = [
		{
			"colName": "Case No."
		},
		{
			"colName": "Name"
		},
		{
			"colName": "Referral Doctor"
		},
        {
			"colName": "Date of Referral"
		},
		{
			"colName": "Status"
		}
	];

    // Clear existing table
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    //Create table headers
    var headerRow = document.createElement("tr");
    for (var i = 0; i < 5; i++) {
        var th = document.createElement("th");
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "header-input");
		input.setAttribute("placeholder", headerData[i].colName);
		input.readOnly = true;
        th.appendChild(input);
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
      
          // Create table rows
          for (var i = 0; i < Object.keys(patientJson).length; i++) {
              var row = document.createElement("tr");
              for (var j = 0; j < 5; j++) {
                var cell = document.createElement("td");
                cell.setAttribute("class", "editable-cell");
                cell.setAttribute("contenteditable", "false");
                
                if (j == 0) {
                  cell.innerHTML = patientJson[i].caseNumber;
                } else if (j == 1) {
                  cell.innerHTML = patientJson[i].patient;
                } else if (j == 2) {
                  cell.innerHTML = patientJson[i].referralDoctor;
                } else if (j == 3) {
                  cell.innerHTML = patientJson[i].referralDate;
                } else {
                  cell.innerHTML = patientJson[i].status;
                }
      
                row.appendChild(cell);
              }
              table.appendChild(row);
          }
}

checkCase(document.querySelector('#form1'));