// 각자 페이지에서 맡게 불러오면 됩니다.
//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경

$(document).ready(function () {
    $("#bottom_nav_profile_image").attr(
      "src",
      "../image/bottom_nav_profile_black.png"
    );
});