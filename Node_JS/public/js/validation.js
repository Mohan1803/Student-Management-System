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

// For Admission(fee) Module

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
            " <div id='collect_fee'>  <div class='row g-2'> <div class='col-lg-6'><input type='hidden' class='form-control' name='studentid_fee' id='studentid_fee' value='" +
            data.result[0].ID +
            "'> <div class='mb-3'><div class='form-floating  w-75 p-2'><input type='text' class='form-control' name='class' id='class' placeholder='Class' value='" +
            data.result[0].Class +
            "' disabled><label for='class'>Class</label></div></div>  <div class='mb-3'><div class='form-floating  w-75 p-2'><input type='text' class='form-control' name='section' id='section' placeholder='Section' value='" +
            data.result[0].section +
            "' disabled><label for='section'>Section</label> </div> </div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='text' class='form-control' name='name' id='name' placeholder='Name' value='" +
            data.result[0].Middle_Name +
            "' disabled><label for='name'>Name</label></div></div><div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='due' id='due' placeholder='Due Amount' value='" +
            data.result[0].Pending_due +
            "' disabled><input type='hidden' class='form-control' name='due_hide' id='due_hide' placeholder='Due Amount' value='" +
            data.result[0].Pending_due +
            "'><label for='due'>Due Amount</label></div></div></div>  <div class='col-lg-6'><div class='mb-3'><div class='form-floating w-75 p-2'><input type='text' class='form-control' name='phno' id='phno' placeholder='Phone Number' value='" +
            data.result[0].Emergency_Contact_No +
            "' disabled><label for='phno'>Phone Number</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='email' class='form-control' name='Email' id='Email' placeholder='Email ID' value='" +
            data.result[0].email_id +
            "' disabled><label for='Email'>Email ID</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='actualfee' id='actualfee' placeholder='Actual Fee' value='" +
            data.result[0].Actual_fee +
            "' disabled><input type='hidden' class='form-control' name='actualfee_hide' id='actualfee_hide' placeholder='Actual Fee' value='" +
            data.result[0].Actual_fee +
            "'> <label for='actualfee'>Actual Fee</label>  </div> </div>   <div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' min='0' max='" +
            data.result[0].Actual_fee +
            "' class='form-control' name='paying_amt' id='paying_amt' placeholder='Paying Amount'> <label for='paying_amt'>Paying Amount</label></div> </div> </div></div></div>"
          );
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

//For Due Module

$(document).ready(function () {
  $("#studid_due").on("change", function () {
    var studid_due = $(this).val();
    $.ajax({
      url: "/api/get-student-data-due",
      type: "POST",
      data: {
        studid_due: studid_due,
      },
      dataType: "Json",
      success: function (data) {
        $("#studid_due").after(function () {
          $("#collect_due").remove();
          return (
            " <div id='collect_due'>  <div class='row g-2'> <div class='col-lg-6'><input type='hidden' class='form-control' name='studentid_due' id='studentid_due' value='" +
            data.dueresult[0].ID +
            "'> <div class='mb-3'><div class='form-floating  w-75 p-2'><input type='text' class='form-control' name='class_due' id='class_due' placeholder='Class' value='" +
            data.dueresult[0].Class +
            "' disabled><label for='class'>Class</label></div></div>  <div class='mb-3'><div class='form-floating  w-75 p-2'><input type='text' class='form-control' name='section_due' id='section_due' placeholder='Section' value='" +
            data.dueresult[0].section +
            "' disabled><label for='section'>Section</label> </div>  <div class='mb-3'><div class='form-floating w-75 p-2'><input type='text' class='form-control' name='name_due' id='name_due' placeholder='Name' value='" +
            data.dueresult[0].Middle_Name +
            "' disabled><label for='name'>Name</label></div></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='due' id='due' placeholder='Fees Paid Sofar' value='" +
            data.dueresult[0].Initial_Paying_amt +
            "' disabled><label for='due'>Fees Paid Sofar</label></div></div><div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' min='0' max='" +
            data.dueresult[0].Pending_due +
            "' class='form-control' name='paying_amt_due' id='paying_amt_due' placeholder='Paying Amount'> <label for='paying_amt_due'>Paying Amount</label></div> </div></div> <div class='col-lg-6'><div class='mb-3'><div class='form-floating w-75 p-2'><input type='text' class='form-control' name='phno_due' id='phno_due' placeholder='Phone Number' value='" +
            data.dueresult[0].Emergency_Contact_No +
            "' disabled><label for='phno'>Phone Number</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='email' class='form-control' name='Email_due' id='Email_due' placeholder='Email ID' value='" +
            data.dueresult[0].email_id +
            "' disabled><label for='Email'>Email ID</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='actualfee' id='actualfee' placeholder='Actual Fee' value='" +
            data.dueresult[0].Actual_fee +
            "' disabled><input type='hidden' class='form-control' name='actualfee_hide_due' id='actualfee_hide_due' placeholder='Actual Fee' value='" +
            data.dueresult[0].Actual_fee +
            "'> <label for='actualfee'>Actual Fee</label>  </div </div><div class='mb-3'><div class='form-floating w-75 p-2'><input type='number' class='form-control' name='due' id='due' placeholder='Due Amount' value='" +
            data.dueresult[0].Pending_due +
            "' disabled><input type='hidden' class='form-control' name='due_hide' id='due_hide' placeholder='Pending Due Amount' value='" +
            data.dueresult[0].Pending_due +
            "'><label for='due'>Pending Due Amount</label></div></div> <div class='mb-3'><div class='form-floating w-75 p-2'><select class='form-select' aria-label='Default select example' id='payment_mode_due' name='payment_mode_due'><option selected>Select</option><option value='Cash'>Cash</option><option value='Cheque'>Cheque</option><option value='Demand Draft(DD)''>Demand Draft(DD)</option> </select><label for='payment_mode_due'>Payment Mode</label></div></div> </div></div></div>  "
          );
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

//For Week Schedule Module

// Checking Duplicate Schedules
$(document).ready(function () {
  $("#day, #section").on("change", function () {
    var section = $("#section").val();
    var day = $("#day").val();
    $.ajax({
      url: "/api/get-weekschedule",
      type: "POST",
      data: {
        section: section,
        day: day,
      },
      dataType: "JSON",
      success: function (data) {
        //checking whether duplicate schedule is found or not
        if (data.found > 0) {
          $("#day").after(function () {
            $("#schedule_template").attr("disabled", "disabled");
            $("#schedule_warning").remove();
            return `<p id='schedule_warning' class='m-2 alert alert-danger'>Schedule of this Class Section for the day is already added. </p>`;
          });
        } else {
          $("#day").after(function () {
            $("#schedule_template").removeAttr("disabled");
            $("#schedule_warning").remove();
          });
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

// Getting No Of Periods from scheduleplan table & display subject and staff fields
$(document).ready(function () {
  $("#schedule_template").on("change", function () {
    var schedule_temp = $("#schedule_template").val();
    var class_section = $("#section").val();
    $.ajax({
      url: "/api/get-noofperiods-from-scheduleplan",
      type: "POST",
      data: {
        schedule_temp: schedule_temp,
        class_section: class_section,
      },
      dataType: "Json",
      success: function (data) {
        $("#dummy").after(function () {
          var counter = 1;
          var period = data.periods[0].no_of_periods;
          var array = [];
          if (period == 0) {
            $("#subject_staff_display").remove();
          } else {
            for (var i = 1; i <= period; i++) {
              array.push(i);
              $("#schedule_plan").html(
                "<h4 id='subject_staff'> <b> SELECT SUBJECT & STAFF </b> </h4> <hr/>  <div id='subject_staff_display' ></div>"
              );
            }
            $.each(array, (key, value) => {
              $("#subject_staff_display").append(
                `<input type='hidden' name='period_no_${value}' value='${value}'></input>
                <div id='schedule_main_${value}' class='m-1 row g-3'>
                <div class='col'>
                <label for='period_${value}_sub'>Period ${value}- Subject</label>
                <select data-id='${counter}' id='subject_option period_${value}_sub' class='period_${value}_sub form-control subject_option' name='period_${value}_sub' required>
                <option value=''>Choose a Subject</option>
                </select>
                </div>
                <div class='col'>
                <label for='period_${value}_staff'>Period ${value} - Staff</label>
                <input disabled id='period_${value}_staff subject_staff' type='text' class='${counter} subject_staff period_${value}_staff form-control' placeholder='Choose Staff' name='period_${value}_staff'>
                <input id='period_${value}_staff_hidden subject_staff_hidden' type='hidden' class='${counter}_hidden subject_staff_hidden period_${value}_staff form-control' name='period_${value}_staff_hidden'>
                </div>
                </div>`
              );
              counter++;
            });

            var subject_name = [];
            for (var i = 0; i < data.subjects.length; i++) {
              subject_name.push(data.subjects[i].subject_name);
            }
            $.each(subject_name, (key, value) => {
              $(".subject_option").append(
                "<option value='" +
                  data.subjects[key].ID +
                  "'>" +
                  data.subjects[key].subject_name +
                  "</option>"
              );
            });
          }
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

//Getting Staffs According to the subject, class & section

$(document).on(
  "change",
  ".period_1_sub, .period_2_sub, .period_3_sub, .period_4_sub,.period_5_sub, .period_6_sub, .period_7_sub, .period_8_sub",
  function () {
    var counter_id = $(this).attr("data-id");
    var subject_id = $(this).val();
    var class_section = $("#section").val();

    $.ajax({
      url: "/api/getting-staff",
      type: "POST",
      data: {
        subject_id: subject_id,
        class_section: class_section,
      },
      dataType: "JSON",
      success: function (data) {
        $("." + counter_id).val(data.staff[0].Middle_Name);
        $("." + counter_id + "_hidden").val(data.staff[0].Staff_ID);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
);

//Select2
$(document).ready(function () {
  $(".js-example-basic-multiple").select2();
});

//Attendance Module : Student Attendance
$(document).ready(function () {
  $("#attendance_present_div").hide();
  $("#attendance_absent").on("change", function () {
    var absentees = $("#attendance_absent").val(); // [5, 7, 8]
    console.log(absentees);

    $("#attendance_absent").find("option").removeAttr("disabled");

    $.each(absentees, (key, value) => {
      $("#attendance_present")
        .find("option[value='" + value + "']")
        .remove();
    });
  });
});

//Exam Module
//Getting No Of Subjects Mapped To Particular Class
$(document).ready(function () {
  $("#exam_section").on("change", function () {
    var exam_section = $("#exam_section").val();
    $.ajax({
      url: "/api/get-noofsubjects-associated-with-class",
      type: "POST",
      data: {
        exam_section: exam_section,
      },
      dataType: "Json",
      success: function (data) {
        $("#dummy1").after(function () {
          var counter = 1;
          if (!data.subject.length) {
            $("#exam_subject_display").remove();
            $("#exam_plan").append(
              `<h4 id='no_sub'> <b> No Subjects Were Mapped To This Class </b> </h4>`
            );
          } else {
            var array = [];
            var no_of_sub = data.subject.length;
            for (var i = 1; i <= no_of_sub; i++) {
              array.push(i);
              $("#exam_plan").html(
                "<h4 id='exam_subject'> <b> SELECT SUBJECT, ADD MARKS & DATE </b> </h4> <hr/>  <div id='exam_subject_display' ></div>"
              );
            }
            $.each(array, (key, value) => {
              $("#exam_subject_display").append(
                `<input type='hidden' name='period_no_${value}' value='${value}'></input>
                  <div id='exam_main_${value}' class='m-1 row g-3'>
                  <div class='col'>
                  <label for='exam_${value}_sub'>Subject ${value}</label>
                  <select data-id='${counter}' id='subject_option exam_${value}_sub' class='exam_${value}_sub form-control subject_option' name='exam_${value}_sub' required>
                  <option value=''>Choose a Subject</option>
                  </select>
                  </div>
                  <div class='col'>
                  <label for='exam_${value}_date'>Date</label>
                  <input id='exam_${value}_date' type='date' class='${counter} subject_date exam_${value}_date form-control' placeholder='Date' name='exam_${value}_date'>
                  <input id='exam_${value}_date_hidden' type='hidden' class='${counter}_hidden subject_date exam_${value}_date form-control' name='exam_${value}_date_hidden'>
                  </div>
                  <div class='col'>
                    <label for='exam_${value}_actualmark'>Actual Mark For Subject ${value}</label>
                    <input id='exam_${value}_actualmark' type='number' class='${counter} subject_actualmark subject_${value}_actualmark form-control' placeholder='Actual Mark' name='exam_${value}_actualmark'>
                    <input id='exam_${value}_actualmark_hidden' type='hidden' class='${counter}_hidden subject_actualmark_hidden subject_${value}_actualmark form-control' name='exam_${value}_actualmark_hidden'>
                    </div>
                    <div class='col'>
                      <label for='exam_${value}_passmark'>Pass Mark</label>
                      <input id='exam_${value}_passmark' type='number' class='${counter} subject_passmark subject_${value}_passmark form-control' placeholder='Pass Mark' name='exam_${value}_passmark'>
                      <input id='exam_${value}_passmark_hidden' type='hidden' class='${counter}_hidden subject_passmark_hidden subject_${value}_passmark form-control' name='exam_${value}_passmark_hidden'>
                      </div>
                  </div><br><br>`
              );
              counter++;
            });

            var subject_name = [];
            for (var i = 0; i < data.subject.length; i++) {
              subject_name.push(data.subject[i].subject_name);
            }
            $.each(subject_name, (key, value) => {
              $(".subject_option").append(
                "<option value='" +
                  data.subject[key].ID +
                  "'>" +
                  data.subject[key].subject_name +
                  "</option>"
              );
            });
          }
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
