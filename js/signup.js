// static variable
var email_request = false; //인증보냈는지 여부
var email_responese = false; //인증받았는지 여부
var radio_bool = false; // 라디오박스 체크 여부
var regEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
// email 관련 function
function check_email() {
  email_request = false;
  email_responese = false;
  var email = $("#signup_input_email");
  var email_err_msg = $("#signup_input_err_msg_email");
  if (!email.val().trim()) {
    email.focus();
    return false;
  } else if (regEmail.test(email.val().trim())) {
    email_err_msg.hide();
    email.css("margin-bottom", "0.81rem");
    return true;
  } else {
    email_err_msg.show();
    email.css("margin-bottom", "0");
    email.focus();
    return false;
  }
}

// 인증번호 전송 button click event
$(".signup_email_certification_button").click(function () {
  email_request = false;
  var email_certification_num = $("#signup_input_email_num");
  if (check_email()) {
    //ajax 코드
    email_request = true;
    email_certification_num.attr("disabled", false);
    email_certification_num.focus();
    return true;
  } else {
    email_request = false;
    email_certification_num.attr("disabled", true);
    return false;
  }
});

// 인증번호 확인 event function
$(".signup_email_num_button").click(function () {
  if (!email_request) {
    $("#signup_input_email").focus();
  } else if (!$("#signup_input_email_num").val().trim()) {
    $("#signup_input_email_num").focus();
  } else {
    check_email_num();
  }
});

function check_email_num() {
  //ajax code
  var certification_num = 1234; //test num
  if ($("#signup_input_email_num").val().trim() == certification_num) {
    alert("인증 성공");
    $("#signup_input_email_num").attr("disabled", true);
    $("#signup_input_name").focus();
    email_responese = true;
    return true;
  } else {
    alert("인증 실패");
    $("#signup_input_email_num").focus();
    email_responese = false;
    return false;
  }
}

function check_name() {
  return $("#signup_input_name").val().trim() ? true : false;
}

function check_password() {
  return $("#signup_input_password").val().trim() ? true : false;
}

function check_re_password() {
  return $("#signup_input_re_password").val().trim() ? true : false;
}

//password 일치하는지 검사
function password_matching() {
  var pwd = $("#signup_input_password").val();
  var re_pwd = $("#signup_input_re_password").val();
  if (pwd === re_pwd) {
    $("#signup_input_err_msg_re_password").hide();
    $("#signup_input_re_password").css("margin-bottom", "0.81rem");
    return true;
  } else {
    $("#signup_input_err_msg_re_password").show();
    $("#signup_input_re_password").css("margin-bottom", "0");
    return false;
  }
}

//실시간 email input change event
$("#signup_input_email").on(
  "propertychange change keyup paste input",
  function () {
    check_email();
  }
);

//re-password 실시간 change event
$("#signup_input_re_password").on(
  "propertychange change keyup paste input",
  function () {
    password_matching();
  }
);

//re-password 실시간 change event
$("#signup_input_password").on(
  "propertychange change keyup paste input",
  function () {
    password_matching();
  }
);

//radio button click event
$("input:radio[name=radiobutton1]").click(function () {
  if ($("input:radio[name=radiobutton1]:checked").val() === "기업") {
    $("#radiobutton1_label2").css("background-color", "#6970f2");
    $("#radiobutton1_label2").css("color", "white");
    $("#radiobutton1_label1").css(
      "background-color",
      " rgba(217, 217, 217, 0.7)"
    );
    $("#radiobutton1_label1").css("color", "black");
  } else {
    $("#radiobutton1_label1").css("background-color", "#6970f2");
    $("#radiobutton1_label1").css("color", "white");
    $("#radiobutton1_label2").css(
      "background-color",
      " rgba(217, 217, 217, 0.7)"
    );
    $("#radiobutton1_label2").css("color", "black");
  }
  radio_bool = true;
});

// ok button click event
$(".signup_signup_btn").click(function () {
  if (!check_email()) {
  } else if (!email_request || !email_responese) {
    $("#signup_input_email_num").focus();
  } else if (!check_name()) {
    $("#signup_input_name").focus();
  } else if (!check_password()) {
    $("#signup_input_password").focus();
  } else if (!check_re_password()) {
    $("#signup_input_re_password").focus();
  } else if (!password_matching()) {
    $("#signup_input_re_password").focus();
  } else if (!radio_bool) {
    alert("사용자 유형을 선택해주세요");
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

$(".signup_header_logo").click(function () {
  window.location.href = "./login.html";
});

$(".signup_header_goback_btn").click(function () {
  window.history.back();
});
