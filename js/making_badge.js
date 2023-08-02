//이미지 업로드 버튼 눌렀을 때 호출되는 함수
$(".making_badge_attach_image_label").on("change", function (event) {
  // variable management---------------------------
  const file = event.target.files[0];
  const preview = $("#making_badge_attach_image");

  const reader = new FileReader();
  reader.onload = function (event) {
    preview.attr("src", event.target.result);
    preview.css({ width: "100%", height: "100%" });
  };
  reader.readAsDataURL(file);
});

$(".done_button").click(function () {
  const img = $("#making_badge_attach_image");
  const document = $(".making_badge_attach_document");
  console.log(img.attr("src"));
  console.log(document.val());

  //이미지 처리 ajax, datatype 등등..
});
