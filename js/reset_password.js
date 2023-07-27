$(".reset_password_main_btn").click(function () {
  if (
    !$("#reset_password_main_new_password").val().trim() &&
    !$("#reset_password_main_re_password").val().trim()
  ) {
    alert("입력되지 않은 항목이 있습니다.");
  } else if (
    $("#reset_password_main_new_password").val().trim() !==
    $("#reset_password_main_re_password").val().trim()
  ) {
    alert("일치하지 않습니다.");
  } else {
    var formData = {
      new_password: $("#reset_password_main_new_password").val(),
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
