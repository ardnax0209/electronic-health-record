import { checkCase } from './chckCaseNumber.js';

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
        <div class="input-group">
            <div class="form-outline" id="form-outline-id" data-mdb-input-init>
                <label class="form-label" for="form1">Search</label>
                <input type="search" id="form1" class="form-control" placeholder="Case Number"
                />
            </div>
            <button type="button" class="btn btn-primary" id="loginBttn" data-mdb-ripple-init>New Patient
                <i class="fas fa-search"></i>
            </button>
        </div>
        <a href="index.html" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" id="profile-container-staff">
            <div class="d-flex w-100 justify-content-start align-items-center">
                   <span class="fa fa-dashboard fa-fw mr-3"></span>
                   <span class="menu-collapsed">Log out</span>
                   <span class="submenu-icon ml-auto"></span>
               </div>
        </a>
    </div>
`

checkCase(document.querySelector('#form1'));