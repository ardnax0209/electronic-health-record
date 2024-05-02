import './style.css';
import { checkCredentials } from './login.js';
import logoName from '/logo-with-name.png';

let verNum = await fetch('http://localhost:8080/version', {
		method: 'GET',
	})
		.then(response => response.json())
		.then(response => {
			return "ver. " + response.msg
		})
		.catch(err => console.error(err));

document.querySelector('#app').innerHTML = `
	<div id="login-form">
		<div id="logo-container">
				<img src="${logoName}" alt="logo">
		</div>
		<br/>
		<br/>
		<div id="form-container">
			<div data-mdb-input-init class="form-outline mb-4">
				<label class="form-label" for="form2Example1">Employee ID</label>
				<input type="password" id="employeeId" class="form-control" placeholder="*** *** ***"/>
			</div>
			<br/>
			<div data-mdb-input-init class="form-outline mb-4">
				<label class="form-label" for="form2Example2">Password</label>
				<input type="password" id="employeePass" class="form-control" placeholder="******"/>
			</div>
			<br/><br/>
			
			<button type="button" id="loginBttn" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Log in</button>
		</div>
	</div>
	<p id="version">${verNum}</p>
`

checkCredentials(document.querySelector('#loginBttn'));