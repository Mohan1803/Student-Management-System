$(function () {
  $("#userid").on("input", function () {
    var input = $(this);
    var is_name = input.val();
    if (!(is_name.length <= 3)) {
      input.removeClass("invalid").addClass("valid");
      $("#userid_error").addClass("error").removeClass("error_display");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#userid_error").addClass("error_display").removeClass("error");
    }
  });
});
