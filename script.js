function registerUser(event){
    event.preventDefault();

    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    let user = {
        name:name,
        email:email,
        password:password
    };

    localStorage.setItem("medimeetUser", JSON.stringify(user));
    alert("Registration Successful!");
    window.location.href="login.html";
}

function loginUser(event){
    event.preventDefault();

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedUser = JSON.parse(localStorage.getItem("medimeetUser"));

    if(storedUser && storedUser.email===email && storedUser.password===password){
        alert("Login Successful");
        window.location.href="dashboard.html";
    }
    else{
        alert("Invalid Credentials");
    }
}
function bookAppointment(event){
    event.preventDefault();

    let patient = document.getElementById("patientName").value;
    let doctor = document.getElementById("doctorName").value;
    let date = document.getElementById("appointmentDate").value;

    let appointment = {
        patient:patient,
        doctor:doctor,
        date:date
    };

    localStorage.setItem("medimeetAppointment", JSON.stringify(appointment));
    alert("Appointment Booked Successfully!");
    window.location.href="dashboard.html";
}

function loadDashboard(){
    let appointment = JSON.parse(localStorage.getItem("medimeetAppointment"));
    let user = JSON.parse(localStorage.getItem("medimeetUser"));

    if(user){
        document.getElementById("welcomeUser").innerHTML = "Welcome " + user.name;
    }

    if(appointment){
        document.getElementById("appointmentDetails").innerHTML = `
            <h3>Appointment Details</h3>
            <p><strong>Patient:</strong> ${appointment.patient}</p>
            <p><strong>Doctor:</strong> ${appointment.doctor}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
        `;
    }
    else{
        document.getElementById("appointmentDetails").innerHTML = "<p>No appointments booked yet.</p>";
    }
}

function logoutUser(){
    alert("Logged Out Successfully");
    window.location.href="login.html";
}

function cancelAppointment(){
    localStorage.removeItem("medimeetAppointment");
    alert("Appointment Cancelled");
    location.reload();
}

function searchDoctors(){
    let input = document.getElementById("searchDoctor").value.toLowerCase();
    let cards = document.querySelectorAll(".doctor-card");

    cards.forEach(function(card){
        let spec = card.getAttribute("data-specialization");

        if(spec.includes(input)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }
    });
}