export function checkCredentials(element) {
  element.addEventListener('click', () => {
	  const username = document.getElementById('employeeId').value;
	  const password = document.getElementById('employeePass').value;
	  
	fetch('http://localhost:8080/login', {
			method: 'GET',
			headers: {
				'Content-Type': 'text/plain',
				'Username': username,
				'Password': password,
			},
		})
			.then(response => response.json())
			.then(response => transferPage(response))
			.catch(err => console.error(err));

  });

  function transferPage(user) {
	if (user != "Employee ID or password is incorrect") {
		localStorage.setItem("username", btoa(user));
		window.location.replace("staff-homepage.html");
	} else {
		alert(user);
		document.getElementById('employeeId').value = "";
		document.getElementById('employeePass').value = "";
	}
  }
}