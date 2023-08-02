$(".find_password_header_logo").click(function () {
  window.location.href = "./login.html";
});

$(".find_password_header_goback_btn").click(function () {
  window.history.back();
});

$(".find_password_main_btn").click(function () {
  var emailInput = $(".find_password_main_input");
  if (!emailInput.val().trim()) {
    emailInput.focus();
  } else {
    var formData = {
      email: emailInput.val().trim(),
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
