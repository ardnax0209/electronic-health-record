document.querySelector('#app').innerHTML = `
    <div class="page-header">
    <div id="page-logo">
        <img src="public/logo-ehr.png" alt="logo" width="400" height="96">
    </div>
    <div id="person-info">
        ${staffName}
        <br/>
        ${caseNum}
    </div>
    <div id="person-pic">
        <img src="public/picture-sample.jpg" alt="logo" width="150" height="100">
    </div>
    </div>
    <div class="menu-settings">
    <div class="input-group">
    <div class="form-outline" data-mdb-input-init>
    <label class="form-label" for="form1">Search</label>
        <input type="search" id="form1" class="form-control" placeholder="Case Number"
        onkeyup="search(event)"
        />
    </div>
    <button type="button" class="btn btn-primary" data-mdb-ripple-init>New Patient
        <i class="fas fa-search"></i>
    </button>
    </div>
    </div>
`

console.log(atob(localStorage.getItem("username")));