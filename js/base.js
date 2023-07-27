// 각자 페이지에서 맡게 불러오면 됩니다.
//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경
$(document).ready(function () {
  $("#bottom_nav_person_image").attr(
    "src",
    "../image/bottom_nav_person_black.png"
  );
});

// mock data 사용법
$.getJSON("../mock/searchingData.json", function (data) {
  // data 확인
  console.log(data);
  // list 형식의 json data를 받아와서 사용하는 방법 예시
  $.each(data, function (index, item) {
    var imgElement = $("<img>").attr({
      src: item.imageSrc,
      alt: item.name,
      width: "100px",
      height: "100px",
    });
    // main 태그에 추가
    $("main").append(imgElement);
  });
});
