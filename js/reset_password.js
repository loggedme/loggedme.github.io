$(".reset_password_header_logo").click(function () {
  window.location.href = "./login.html";
});

$(".reset_password_header_goback_btn").click(function () {
  window.history.back();
});

//re-password 실시간 change event
$("#reset_password_main_re_password").on(
  "propertychange change keyup paste input",
  function () {
    password_matching();
  }
);

//password 일치하는지 검사
function password_matching() {
  console.log(2);
  var pwd = $("#reset_password_main_new_password").val().trim();
  var re_pwd = $("#reset_password_main_re_password").val().trim();
  if (pwd === re_pwd) {
    $("#reset_password_input_err_msg_re_password").hide();
    $("#reset_password_main_re_password").css("margin-bottom", "4.56rem");
    return true;
  } else {
    $("#reset_password_input_err_msg_re_password").show();
    $("#reset_password_main_re_password").css("margin-bottom", "0");
    return false;
  }
}

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
      new_password: $("#reset_password_main_new_password").val().trim(),
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
    window.location.href = "./login.html";
  }
});
