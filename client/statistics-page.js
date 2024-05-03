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
        <div class="selection-container">
          <div class="diag-drpdwn">
            <label for="diag-selection" class="field-labels">Diagnosis:</label>
            <select class="form-control" id="diag-selection">
                <option>Cardio Cases</option>
                <option>Pulmonary Cases</option>
                <option>Neuro Cases</option>
                <option>Musculoskeletal Cases</option>
            </select>
          </div>
          <div class="month-drpdwn">
            <label for="month-selection" class="field-labels">Month:</label>
            <select class="form-control" id="month-selection">
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
            </select>
          </div>
        </div>
        <div class="chart-container">

        </div>
    </div>
`

checkCase(document.querySelector('#form1'));

createTbl();

document.querySelector('#diag-selection').onchange = async function () {
    createTbl();
};

document.querySelector('#month-selection').onchange = async function () {
    createTbl();
};

async function createTbl() {
    var diagnosisVal = document.getElementById("diag-selection").value;
    var monthVal = document.getElementById("month-selection").value;
    var labelCont = [];
    var dataCont = [];
    var labelContFinal = [];
    var dataContFinal = [];

    let resJson = await fetch('http://localhost:8080/populateTbl', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Month': monthVal
        }
    })
        .then(response => response.json())
        .then(response => {
          return response;
        })
        .catch(err => console.error(err));

    for (var i = 0; i < Object.keys(resJson).length; i++) {
        if (diagnosisVal == "Cardio Cases") {
            if (resJson[i].diagnosis == "Myocardial Infarction" || resJson[i].diagnosis == "CABG" || resJson[i].diagnosis == "CHF") {
                labelCont.push(resJson[i].diagnosis);
            }
        } else if (diagnosisVal == "Pulmonary Cases") {
            if (resJson[i].diagnosis == "COPD" || resJson[i].diagnosis == "Bronchitis" || resJson[i].diagnosis == "Emphysema") {
                labelCont.push(resJson[i].diagnosis);
            }
        } else if (diagnosisVal == "Neuro Cases") {
            if (resJson[i].diagnosis == "Stroke" || resJson[i].diagnosis == "Spinal Cord Injury" || resJson[i].diagnosis == "Multiple Sclerosis") {
                labelCont.push(resJson[i].diagnosis);
            }
        } else {
            if (resJson[i].diagnosis == "Lateral Epicondylitis" || resJson[i].diagnosis == "Ankle Sprain" || resJson[i].diagnosis == "Scoliosis") {
                labelCont.push(resJson[i].diagnosis);
            }
        }
    }

    labelCont.forEach(function (x) { dataCont[x] = (dataCont[x] || 0) + 1; });

    for (let i = 0; i < labelCont.length; i++) {
      if (labelContFinal.indexOf(labelCont[i]) === -1) {
         labelContFinal.push(labelCont[i]);
      }
    }

    let entries = Object.entries(dataCont)
    dataContFinal = entries.map( ([key, val] = entry) => {
      return val;
    });

    document.querySelector('.chart-container').innerHTML = `
        <canvas id="myChart" aria-label="chart" style="width:100%;height:60vh;margin-top:2%;"></canvas>
    `

    var chrt = document.getElementById("myChart").getContext("2d");
    var chartId = new Chart(chrt, {
       type: 'pie',
       data: {
          labels: labelContFinal,
          datasets: [{
             label: "Common Diagnosis Chart",
             data: dataContFinal,
             backgroundColor: ['lightgreen', 'gold', 'lightblue'],
             hoverOffset: 5
          }],
       },
       options: {
          responsive: false,
       },
    });
}