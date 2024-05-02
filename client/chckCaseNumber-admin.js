export function checkCase(element) {
	element.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			fetch('http://localhost:8080/caseNumber', {
			  method: 'GET',
			  headers: {
				  'Content-Type': 'text/plain',
				  'CaseNumber': element.value,
			  },
			})
			  .then(response => response.json())
			  .then(response => transferPage(response))
			  .catch(err => console.error(err));
		  }
	});

  function transferPage(patientCase) {
	if (patientCase != "No result") {
		localStorage.setItem("caseNumber", element.value);
		
		window.location.replace("general-info.html");
		
	} else {
		alert(patientCase);
		document.getElementById('form1').value = "";
	}
  }
}