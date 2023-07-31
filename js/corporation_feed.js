//각자 페이지에서 맡게 불러오면 됩니다.
$(document).ready(function () {
  $("#bottom_nav_enterprise_image").attr(
    "src",
    "../image/bottom_nav_enterprise_black.png"
  );
});


// mock data

$.getJSON("../mock/corporationFeedData.json", function (data) {
  console.log(data);

 
  $.each(data, function (index, item) {
    var feedInfo = $("<div>").addClass("feed_info");
    var feedItem = $("<div>").addClass("feed_item");

    // feed 상단 부분 사용자 사진, 아이디
    var feedTop = $("<div>").addClass("feed_top");

    var profileInfo = $("<div>").addClass("profile_info");
    var profileImg = $("<img>").attr({
        src: item.profileImgSrc,
        alt: item.taggedCompany,
      });
    var userId = $("<div>")
      .addClass("user_id")
      .text(item.userId);

    var optionBtn = $("<a>").attr("href", "#").addClass("optionBtn");
    var optionImg = $("<img>").attr({
      src: "../image/option_btn.png",
      alt: "optionButton",
    });

    profileInfo.append(profileImg, userId);
    optionBtn.append(optionImg);
    feedTop.append(profileInfo, optionBtn);


    // feed 이미지
    var feedImgList = item.feedImgList;
    var imageContainer = $("<div>").addClass("image_container");

    $.each(feedImgList, function (imgIndex, imgItem) {
      var feedImg = $("<img>").attr({
        src: imgItem.feedImg,
        alt: "Image " + imgItem.imgId,
        class: "feed_image",
      });

      imageContainer.append(feedImg);
    });



    // 기능 버튼 아이콘 (좋아요, 댓글, 공유, 저장)
    var feedFunctionContainer = $("<div>").addClass("feedFunction_container");
    var functionIconContainer = $("<div>").addClass("functionIcon_container");
    var functionIconItem = $("<div>").addClass("functionIcon_item");

    var heartLink = $("<a>").attr("href", "#");
    var heartImg = $("<img>").attr({
      id: "heart",
      src: "../image/heart.png",
      alt: "heart",
      width: "35rem",
      style: "padding-top: 0.1rem;",
    });
    heartLink.append(heartImg);

    var commentLink = $("<a>").attr("href", "#");
    var commentImg = $("<img>").attr({
      src: "../image/comment.png",
      alt: "comment",
      width: "31rem",
      style: "margin-left: 0.5rem; padding-top: 0.2rem;",
    });
    commentLink.append(commentImg);

    var shareLink = $("<a>").attr("href", "#");
    var shareImg = $("<img>").attr({
      src: "../image/share.png",
      alt: "shareBtn",
      width: "40rem",
      style: "margin-left: 0.3rem;",
    });
    shareLink.append(shareImg);

    functionIconItem.append(heartLink, commentLink, shareLink);
    
    var saveLink = $("<a>").attr("href", "#");
    var saveImg = $("<img>").attr({
      src: "../image/save.png",
      alt: "saveBtn",
      width: "32rem",
    });
    saveLink.append(saveImg);

    functionIconContainer.append(functionIconItem, saveLink);
    


    // 좋아요 수
    var likesContainer = $("<div>").addClass("likesNum_container");

    var likesNum = item.likesNum;
    likesContainer = likesNum + '명이 좋아합니다.';

    var likesNumContainer = $("<div>")
      .addClass("likesNum_container")
      .text(likesContainer);

    // 기능목록 flex 합치기
    feedFunctionContainer.append(functionIconContainer, likesNumContainer);



    // feed 하단부분 전체(아이디, 해쉬태그, 내용)
    
    // IdHashtag div (아이디, 해쉬태그)
    var IdHashtag = $("<div>").addClass("IdHashtag");

    var bottomUserId = $("<div>")
      .addClass("bottom_id")
      .text(item.userId);

    var feedHashtag = $("<div style=color:#3E93E1>")
      .addClass("feed_hashtag")
      .text(item.hashtag);

    IdHashtag.append(bottomUserId, feedHashtag);

    // feed 내용
    var feedScript = $("<div>")
      .addClass("feed_script")
      .text(item.script);


    // 업로드 날짜 (현재로부터 얼마 전인지) 표시
    var uploaded_date = $("<div>").addClass("uploaded_date");

    var uploadDate = new Date(item.uploadDate.replace(/-/g, "/"));
    var currentDate = new Date();
    var timeDiffInMilliseconds = currentDate - uploadDate;

    var timeDiffInHours = Math.floor(timeDiffInMilliseconds / (1000 * 60 * 60));
    var timeDiffInDays = Math.floor(timeDiffInHours / 24);

    var uploadDateString = timeDiffInHours < 24 ? timeDiffInHours + '시간 전 게시' : timeDiffInDays + '일 전 게시';

    var uploadedDate = $("<div>")
      .addClass("uploaded_date")
      .text(uploadDateString);

    uploaded_date.append(uploadedDate);

    feedInfo.append(IdHashtag,feedScript ,uploaded_date);


    // 댓글 Mock 데이터
    $.getJSON("../mock/commentData.json", function (commentsData) {
      console.log(commentsData);

      var commentsForFeed = commentsData.filter(function (comment) {
        return comment.feedId === item.feedId;
      });

      // 댓글 수, 목록을 포함하는 컨테이너
      var commentContainer = $("<div>").addClass("comment_container");
      var commentList = $("<div>").addClass("comment_list");
        
      // 최대 2개까지만 댓글 보이게
      $.each(commentsForFeed.slice(0, 2), function (
        index, item
      ) {
        // 댓글 목록 리스트 컨테이너
        var commentItem = $("<div>").addClass("comment_item");
        var commentUserId = $("<div style= margin-right:0.5rem>")
          .addClass("commentUser_id")
          .text(item.userId);

        var commentScript = $("<div>")
          .addClass("comment_script")
          .text(item.commentScript);

        commentItem.append(commentUserId, commentScript);
        commentList.append(commentItem);
      });

      // 댓글 수 세기
      var commentsCount = '댓글 ' + commentsForFeed.length + '개 모두 보기';
        
      var commentNumContainer = $("<div>")
        .addClass("commentNum_container")
        .text(commentsCount);

      // 댓글 컨테이너에 댓글 수, 댓글 목록 넣기
      commentContainer.append(commentNumContainer, commentList);
      feedInfo.append(commentContainer);
    });

    feedItem.append(feedTop, imageContainer, feedFunctionContainer, feedInfo);
    $(".feed_list").append(feedItem);
  });
});


