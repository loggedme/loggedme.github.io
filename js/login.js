var regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

$(".login_login_btn").click(function () {
  var idInput = $("#login_input_id");
  var pwdInput = $("#login_input_password");
  if (!idInput.val().trim()) {
    idInput.focus();
  } else if (!pwdInput.val().trim()) {
    pwdInput.focus();
  } else if (!regEmail.test(idInput.val().trim())) {
    alert("이메일 형식이 아닙니다");
    idInput.focus();
  } else {
    var postData = {
      email: $("#login_input_id").val().trim(),
      password: $("#login_input_password").val().trim(),
    };
    // console.log(postData);
    $.ajax({
      url: "http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/auth/token",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(postData),
      contentType: "application/json",
      success: function (data) {
        console.log("sueccess: " + data);
        window.location.href = "./corporation_feed.html";
      },
      error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 400) {
          console.error("Bad Request:", jqXHR.responseText);
          alert("형식이 일치하지 않습니다.");
        } else if (jqXHR.status === 401) {
          console.error("Unauthorized:", jqXHR.responseText);
          alert("인증에 실패했습니다.");
        } else {
          console.error("Error:", jqXHR.status, errorThrown);
          alert("서버 에러");
        }
      },
    });
  }
});
