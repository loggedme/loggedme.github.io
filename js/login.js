$(".login_login_btn").click(function () {
  var idInput = $("#login_input_id");
  var pwdInput = $("#login_input_password");

  if (!idInput.val().trim()) {
    idInput.focus();
  } else if (!pwdInput.val().trim()) {
    pwdInput.focus();
  } else {
    var formData = {
      id: $("#login_input_id").val().trim(),
      password: $("#login_input_password").val().trim(),
    };
    console.log(formData);
    // $.ajax({
    //   url: url,
    //   type: "POST",
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
