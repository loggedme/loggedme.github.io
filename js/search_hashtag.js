$(document).ready(function () {
    $("#bottom_nav_search_image").attr(
      "src",
      "../image/bottom_nav_search_black.png"
    );
  });



// mock data
$.getJSON("../mock/searchingData_hashtag.json", function (data) {
    console.log(data);
  
    // data를 가져와서 회사 목록을 동적으로 생성
    $.each(data, function (index, item) {
      var hashtagItem = $("<div>").addClass("hashtag_item");
      var imgElement = $("<img>").attr({
        src: item.profileImgSrc,
        alt: item.hashtagName,
      });
      var hashtagInfo = $("<div>").addClass("hashtag_info");
      var hashtagName = $("<div>")
        .addClass("hashtag_name")
        .text(item.hashtagName);
      var postingNum = $("<div>")
        .addClass("posting_num")
        .text(item.postingNum);
  
      // 생성한 요소들을 조립하여 hashtagItem에 추가
      hashtagItem.append(imgElement);
      hashtagInfo.append(hashtagName, postingNum);
      hashtagItem.append(hashtagInfo);
  
      // 회사 목록을 .hashtag_search_list에 추가
      $(".hashtag_search_list").append(hashtagItem);
    });
  });