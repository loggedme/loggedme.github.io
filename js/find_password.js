$(".find_password_main_btn").click(function () {
  if ($(".find_password_main_input").val().trim()) {
    var formData = {
      email: $(".find_password_main_input").val().trim(),
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
  } else {
    alert("입력되지 않은 항목이 있습니다.");
  }
});
