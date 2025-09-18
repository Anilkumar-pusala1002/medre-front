function login() {
  const role = document.getElementById("role").value;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  if (role === "doctor") {
    document.getElementById("doctor-dashboard").classList.add("active");
  } else if (role === "patient") {
    loadPrescriptions("patient");
    document.getElementById("patient-dashboard").classList.add("active");
  } else if (role === "pharmacy") {
    loadPrescriptions("pharmacy");
    document.getElementById("pharmacy-dashboard").classList.add("active");
  }
}

function logout() {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("login-page").classList.add("active");
}

function savePrescription() {
  const name = document.getElementById("patient-name").value;
  const age = document.getElementById("patient-age").value;
  const prescription = document.getElementById("prescription").value;

  if (!name || !age || !prescription) {
    alert("Please fill all fields!");
    return;
  }

  const prescriptionData = {
    name,
    age,
    prescription,
    date: new Date().toLocaleString()
  };

  let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
  prescriptions.push(prescriptionData);
  localStorage.setItem("prescriptions", JSON.stringify(prescriptions));

  document.getElementById("patient-name").value = "";
  document.getElementById("patient-age").value = "";
  document.getElementById("prescription").value = "";

  loadPrescriptions("doctor");
}

function loadPrescriptions(view) {
  let prescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
  let list = "";

  prescriptions.forEach(p => {
    list += `<li><b>${p.name} (${p.age} yrs)</b> - ${p.prescription} <br><small>${p.date}</small></li>`;
  });

  if (view === "doctor") {
    document.getElementById("prescription-list").innerHTML = list;
  } else if (view === "patient") {
    document.getElementById("patient-prescriptions").innerHTML = list;
  } else if (view === "pharmacy") {
    document.getElementById("pharmacy-prescriptions").innerHTML = list;
  }
}
