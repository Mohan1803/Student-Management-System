$(function () {
  $("#userid").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (!(is_name.length <= 3)) {
      input.removeClass("invalid").addClass("valid");
      $("#userid-error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#userid-error").addClass("error-display").removeClass("error");
    }
  });

  $("#pwd").on("input", function () {
    var input = $(this);
    var check =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/;
    var is_password = check.test(input.val());
    if (is_password) {
      input.removeClass("invalid").addClass("valid");
      $("#pwd-error").addClass("error").removeClass("error-display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#pwd-error").addClass("error-display").removeClass("error");
    }
  });
});
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
//id unique - class mu
// student data fetch
$(document).ready(function () {
  $("#studid_fee").on("change", function () {
    var student_id = $(this).val();
    $.ajax({
      url: "/api/get-student-data",
      type: "POST",
      data: {
        student_id: student_id,
      },
      dataType: "Json",
      success: function (data) {
        $("#studid_fee").after(function () {
          $("#collect_fee").remove();
          return (
            " <div id='collect_fee'> <div class='mb-3'><div class='form-floating  w-75 p-2'><input type='text' class='form-control' name='class' id='class' placeholder='Class' value='" +
            data.result[0].Class +
            "' disabled><label for='class'>Class</label></div></div>  <div class='mb-3'><div class='form-floating  w-75 p-2'><input type='text' class='form-control' name='section' id='section' placeholder='Section' value='" +
            data.result[0].section +
            "' disabled><label for='section'>Section</label> </div> </div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='text' class='form-control' name='name' id='name' placeholder='Name' value='" +
            data.result[0].Middle_Name +
            "' disabled><label for='name'>Name</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='text' class='form-control' name='phno' id='phno' placeholder='Phone Number' value='" +
            data.result[0].Emergency_Contact_No +
            "' disabled><label for='phno'>Phone Number</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='email' class='form-control' name='Email' id='Email' placeholder='Email ID' value='" +
            data.result[0].email_id +
            "' disabled><label for='Email'>Email ID</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='actualfee' id='actualfee' placeholder='Actual Fee' value='" +
            data.result[0].Actual_fee +
            "' disabled><input type='hidden' class='form-control' name='actualfee_hide' id='actualfee_hide' placeholder='Actual Fee' value='" +
            data.result[0].Actual_fee +
            "'> <label for='actualfee'>Actual Fee</label>  </div </div><div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='due' id='due' placeholder='Due Amount' value='" +
            data.result[0].Actual_fee +
            "' disabled><input type='hidden' class='form-control' name='due_hide' id='due_hide' placeholder='Due Amount' value='" +
            data.result[0].Actual_fee +
            "'><label for='due'>Due Amount</label></div></div> </div>"
          );
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
