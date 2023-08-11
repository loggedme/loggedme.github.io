// 각자 페이지에서 맡게 불러오면 됩니다.
//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경

$(document).ready(function () {
    $("#bottom_nav_profile_image").attr(
      "src",
      "../image/bottom_nav_profile_black.png"
    );
});

/* ok 누르면 전 화면으로 돌아가(근데 지금까지 수정된 것들을 보내주긴 해야 됨.) */
function sendAndGoBack() {
  

  // 변경된 데이터를 보내고 나서 뒤로 가는 함수 실행  
  window.history.back();
}