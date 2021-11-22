function myFunc(e) {
  e.preventDefault();

  const studid = document.getElementById("studid").value;
  const Class = document.getElementById("class").value;
  const fname = document.getElementById("fname").value;
  const mname = document.getElementById("mname").value;
  const fathername = document.getElementById("father_name").value;
  const mothername = document.getElementById("mother_name").value;
  const dob = document.getElementById("dob").value;
  const ecn = document.getElementById("ecn").value;
  const religion = document.getElementById("religion").value;
  const caste = document.getElementById("caste").value;
  const aadhar = document.getElementById("aadhar").value;
  const sex = document.getElementById("sex").value;
  const email = document.getElementById("").value;
  const pwd = document.getElementById("pwd").value;

  if (studid.length == 0) {
    document.getElementById('studid').style.borderColor = "FF0000";
  }
  if (Class.length == 0) {
    document.getElementById('class').style.borderColor = "FF0000"
  }
  if (fname.length == 0) {
    document.getElementById('fname').style.borderColor = "FF0000"
  }
  if (mname.length == 0) {
    document.getElementById('mname').style.borderColor = "FF0000"
  }
  if (fathername.length == 0) {
    document.getElementById('father_name').style.borderColor = "FF0000"
  }
  if (mothername.length == 0) {
    document.getElementById('mother_name').style.borderColor = "FF0000"
  }
  if (dob.length == 0) {
    document.getElementById('dob').style.borderColor = "FF0000"
  }
  if (ecn.length == 0) {
    document.getElementById('ecn').style.borderColor = "FF0000"
  }
  if (religion.length == 0) {
    document.getElementById('religion').style.borderColor = "FF0000"
  }
  if (caste.length == 0) {
    document.getElementById('caste').style.borderColor = "FF0000"
  }
  if (aadhar.length == 0) {
    document.getElementById('aadhar').style.borderColor = "FF0000"
  }
  if (sex.length == 0) {
    document.getElementById('sex').style.borderColor = "FF0000"
  }
  if (email.length == 0) {
    document.getElementById('email').style.borderColor = "FF0000"
  }
  if (pwd.length == 0) {
    document.getElementById('pwd').style.borderColor = "FF0000"
  }
}