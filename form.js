

const form = document.querySelector("#myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const user = form.querySelector("#user").value;
  const userError = document.querySelector("#demo3");
  const email = form.querySelector("#email").value;
  const emailError = document.querySelector("#demo1");
  const password = form.querySelector("#pwd").value;
  const passwordError = document.querySelector("#demo2");
  const confirmPassword = form.querySelector("#pwd1").value;
  const confirmPasswordError = document.querySelector("#demo");

  if (user < 3) {
    userError.innerHTML = "Please enter valid username";
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    emailError.innerHTML = "Please enter valid email";
  }

  if (password.length < 8) {
    passwordError.innerHTML = "Password should be greater than 8 characters";
  }

  if (
    password.length >= 8 &&
    password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
    )
  ) {
    passwordError.innerHTML = "Please provide valid password";
  }

  if (password !== confirmPassword) {
    confirmPasswordError.innerHTML =
      "Password and Confirm Password should be equal";
  }

  if (
    !userError.innerHTML &&
    !emailError.innerHTML &&
    !passwordError.innerHTML &&
    !confirmPasswordError.innerHTML
  ) {
    alert("Form Submited");
    form.reset();
  }
});
