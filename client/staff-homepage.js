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

document.querySelector('#app').innerHTML = `
    <div class="page-header">
    <div id="page-logo">
        <img src="public/logo-ehr.png" alt="logo" width="400" height="96">
    </div>
    <div id="person-info">
        ${jsonRes.name}
        <br/>
        ${jsonRes.caseNumber}
    </div>
    <div id="person-pic">
        <img src="public/picture-sample.jpg" alt="logo" width="150" height="100">
    </div>
    </div>
    <div class="menu-settings">
    <div class="input-group">
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
`

checkCase(document.querySelector('#form1'));