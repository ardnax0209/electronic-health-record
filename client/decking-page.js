import { checkCase } from './chckCaseNumber-admin.js';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

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
            <a href="decking-page.html" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-user fa-fw mr-3"></span>
                    <span class="menu-collapsed">Decking / Scheduling</span>
                    <span class="submenu-icon ml-auto"></span>
                </div>
            </a>
            <!-- Submenu content -->
            <div id='submenu3'>
                <a href="schedule-page.html" class="list-group-item list-group-item-action bg-dark text-white">
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
        <div id="calendar">
          
        </div>
    </div>
`

checkCase(document.querySelector('#form1'));

let calendarEl = document.getElementById('calendar');
let calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  },
  dateClick: function () {
    window.location.replace("schedule-page.html");
  },
  events: [
    {
        title: 'Booked',
        start: '2024-04-29',
        end: '2024-04-29',
    },
    {
        title: 'Booked',
        start: '2024-05-02',
        end: '2024-05-02',
    }
  ]
});
calendar.render();