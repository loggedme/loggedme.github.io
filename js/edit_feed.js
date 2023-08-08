// 지금 있는 페이지 버튼 검정으로
$(document).ready(function () {
    $(".base_bottom_nav_plus_image").attr(
      "src",
      "../image/bottom_nav_plus_black.png"
    );
});

// 원래 검정색인거 회색으로
$(document).ready(function () {
    $("#bottom_nav_person_image").attr(
      "src",
      "../image/bottom_nav_person.png"
    );
});


/* tag company 모달창 기능 */
$('.modal_overlay').hide()
$('.close_btn').click(function () {
  $('.modal_overlay').hide()
})
$('.open_modal').click(function () {
  $('.modal_overlay').show()
})