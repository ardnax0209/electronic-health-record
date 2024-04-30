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
var fName = localStorage.getItem("caseNumber") + "-cbc.pdf";
var pdfPath = "../public/" + fName;

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
			<div class="input-group">
				<div class="form-outline" id="form-outline-id" data-mdb-input-init>
				<label class="form-label" for="form1">Search</label>
				<input type="search" id="form1" class="form-control" placeholder="Case Number"
				/>
				</div>
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
					<a href="#submenu1" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" id="profile-container">
						<div class="d-flex w-100 justify-content-start align-items-center">
							<span class="fa fa-dashboard fa-fw mr-3"></span>
							<span class="menu-collapsed">Profile</span>
							<span class="submenu-icon ml-auto"></span>
						</div>
					</a>
					<!-- Submenu content -->
					<div id='submenu1' class="collapse sidebar-submenu">
						<a href="general-info.html" class="list-group-item list-group-item-action bg-dark text-white" id="gen-info">
							<span class="menu-collapsed">General Information</span>
						</a>
					</div>
					<a href="#submenu2" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" id="diag-container">
						<div class="d-flex w-100 justify-content-start align-items-center">
							<span class="fa fa-user fa-fw mr-3"></span>
							<span class="menu-collapsed">Diagnostic Findings</span>
							<span class="submenu-icon ml-auto"></span>
						</div>
					</a>
					<!-- Submenu content -->
					<div id='submenu2' class="collapse sidebar-submenu">
						<a href="xray-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">X-ray</span>
						</a>
						<a href="mri-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">MRI</span>
						</a>
						<a href="ctscan-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">CT Scan</span>
						</a>
						<a href="cbc-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">CBC</span>
						</a>
					</div>
					<a href="#submenu3" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
						<div class="d-flex w-100 justify-content-start align-items-center">
							<span class="fa fa-user fa-fw mr-3"></span>
							<span class="menu-collapsed">Notes</span>
							<span class="submenu-icon ml-auto"></span>
						</div>
					</a>
					<!-- Submenu content -->
					<div id='submenu3' class="collapse sidebar-submenu">
						<a href="ptnotes-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">PT Notes</span>
						</a>
						<a href="discharge-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">Discharge Notes</span>
						</a>
						<a href="pro-page.html" class="list-group-item list-group-item-action bg-dark text-white">
							<span class="menu-collapsed">PRO</span>
						</a>
					</div>
				</ul><!-- List Group END-->
			</div>
		</div>
		<div class="case-information">
		  <div class="icon-container">
            <div class="exists-cntnr">
		  		<a class="display-pdf">
				  <img src="../public/pdf-icon.svg" title="Download file" width="90" height="86">
				  <p style="text-align:center;">CBC.pdf</p>
				</a>
            </div>
            <div class="does-not-exist">
				<div class="upload-file">
					<form id="formElem" method="POST" enctype="multipart/form-data" >
						<label for="file-input">
							<img src="../public/clipboard-plus-fill.svg" title="Upload file" width="90" height="86">
						</label>
						<input id="file-input" type="file" name="xrayfile"/>
					</form>
				</div>
            </div>
          </div>
		  <div class="pdf-container" style="display:none;">
			<object
				data=${pdfPath}
				type="application/pdf"
				width="100%"
				height="450px"
			>Go back to homepage.</object>
		  </div>
		</div>
    </div>
`

document.querySelector('.exists-cntnr').style.display = "none";
document.querySelector('#diag-container').click();

let fsResponse = await fetch('http://localhost:8080/checkFile', {
          method: 'GET',
          headers: {
              'Content-Type': 'text/plain',
              'fileName': fName,
          },
      })
          .then(response => response.json())
          .then(response => {
            return response;
          })
          .catch(err => console.error(err));
          
if (fsResponse != "Does not exist") {
    document.querySelector('.exists-cntnr').style.display = "block";
}

;

document.querySelector('.display-pdf').addEventListener('click', function () {
	document.querySelector('.exists-cntnr').style.display = "none";
	document.querySelector('.does-not-exist').style.display = "none";
	document.querySelector('.pdf-container').style.display = "block";
});

document.querySelector('.upload-file').onchange = async function () {
	/*
	var formData = new FormData();

	let fileData = document.getElementById('file-input').files[0];
	formData.append("file", fileData, {filename: fileData.name, knownLength: fileData.size});
	formData.append('name', fileData.name);
	formData.append('hash', fileData.hash);
	formData.append('mime', fileData.mime);
	*/

	var formData = new FormData(formElem);

	var content = "multipart/form-data; boundary=" + formData.boundary;
	
	let fsResponse = await fetch('http://localhost:8080/uploadFile', {
		method: 'POST',
		body: formData,
		headers: {
			'fileName': fName,
		}
	})
		.then(response => response.json())
		.then(response => {
		  console.log(response);
		  location.reload();
		})
		.catch(err => console.error(err));
};