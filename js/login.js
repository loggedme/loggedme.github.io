$(".login_login_btn").click(function () {
  if (
    $("#login_input_id").val().trim() &&
    $("#login_input_password").val().trim()
  ) {
    console.log("success");
  } else {
    alert("입력되지 않은 항목이 있습니다.");
  }
});
