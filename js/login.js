$(".login_login_btn").click(function () {
  if (
    $("#login_input_id").val().trim() &&
    $("#login_input_password").val().trim()
  ) {
    var formData = {
      id: $("#login_input_id").val(),
      password: $("#login_input_password").val(),
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
  } else {
    alert("입력되지 않은 항목이 있습니다.");
  }
});
