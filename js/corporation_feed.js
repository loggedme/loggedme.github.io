$(document).ready(function () {
  $("#bottom_nav_enterprise_image").attr(
    "src",
    "../image/bottom_nav_enterprise_black.png"
  );

  // 모달창 닫기 버튼 클릭 시 모달창을 닫도록 이벤트를 추가합니다.
  $(".close_modal").on("click", function () {
    $(".modal").css("display", "none");
  });
});

// 모달창을 열고 댓글 목록을 표시하는 함수
function openModal(feedId, data) {
  var commentsForFeed = data.filter(function (comment) {
    return comment.feedId === feedId;
  });

  var commentsHtml = commentsForFeed
    .map(function (comment) {
      return `
        <div class="comment_item">
          <div style="margin-right: 0.5rem; font-weight: bold;">${comment.userId}</div>
          <div class="comment_script">${comment.commentScript}</div>
        </div>
      `;
    })
    .join("");

  $(".comments_container").html(commentsHtml);
  $(".modal").css("display", "block");
}
