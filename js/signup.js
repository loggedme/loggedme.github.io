// 인증 button click event
$(".signup_email_certification_button").click(function () {
  if ($("#signup_input_email").val().trim()) {
    console.log($("#signup_input_email").val().trim());
  } else {
    alert("이메일을 입력해주세요.");
  }
});

//radio button click event
$("input:radio[name=radiobutton1]").click(function () {
  if ($("input:radio[name=radiobutton1]:checked").val() === "기업") {
    $("#radiobutton1_label2").css("background-color", "#056CF2");
    $("#radiobutton1_label2").css("color", "white");
    $("#radiobutton1_label1").css(
      "background-color",
      " rgba(217, 217, 217, 0.7)"
    );
    $("#radiobutton1_label1").css("color", "black");
  } else {
    $("#radiobutton1_label1").css("background-color", "#056CF2");
    $("#radiobutton1_label1").css("color", "white");
    $("#radiobutton1_label2").css(
      "background-color",
      " rgba(217, 217, 217, 0.7)"
    );
    $("#radiobutton1_label2").css("color", "black");
  }
});

// ok button click event
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
    alert("비밀번호가 일치하지 않습니다.");
  } else if (!$("input:radio[name=radiobutton1]:checked").val()) {
    alert("체크할 항목이 남았습니다.");
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
    window.location.href = "./login.html";
  }
});
