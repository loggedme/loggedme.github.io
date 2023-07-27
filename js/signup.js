$(".signup_signup_btn").click(function () {
  if (
    !$("#signup_input_email_num").val().trim() &&
    !$("#signup_input_name").val().trim() &&
    !$("#signup_input_password").val().trim() &&
    !$("#signup_input_re_password").val().trim()
  ) {
    alert("입력되지 않은 항목이 있습니다.");
  } else if (
    $("#signup_input_password").val().trim() !==
    $("#signup_input_re_password").val().trim()
  ) {
    alert("일치하지 않습니다.");
  } else if (!$("input[name=radiobutton1]:checked").val()) {
    alert("체크되지 않았습니다.");
  } else {
    var formData = {
      email: $("#signup_input_email").val().trim(),
      name: $("#signup_input_name").val().trim(),
      password: $("#signup_input_password").val().trim(),
      check: $("input[name=radiobutton1]:checked").val(),
    };
    console.log(formData);
    // $.ajax({
    //   url: url,
    //   type: "GET",
    //   dataType: "json",
    //   data: formData,
    //   success: function (data) {
    //     console.log(data);
    //   },
    //   error: function (request, status, error) {
    //     console.log(
    //       "code:" +
    //         request.status +
    //         "\n" +
    //         "message:" +
    //         request.responseText +
    //         "\n" +
    //         "error:" +
    //         error
    //     );
    //   },
    // });
  }
});
