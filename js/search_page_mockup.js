$(document).ready(function () {
  $("#bottom_nav_search_image").attr(
    "src",
    "../image/bottom_nav_search_black.png"
  );
});

function getTokenFromSessionStorage() {
  return sessionStorage.getItem("jwtToken");
}

$(document).ready(function (jwtToken) {
  var jwtToken = getTokenFromSessionStorage();
  $.ajax({
    url: "http://203.237.169.125:2002/search?query=foo",
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log("sueccess: " + JSON.stringify(data.items));

      // 개인, 기업 검색
      $.each(data.user.items, function (index, item) {
        var accountType = item.account_type;
        if (accountType == "personal") {
          var personItem = $("<a>").prop({
            class: "person_item",
            href: "../html/profile_per.html",
          });
          var imgElement = $("<img>").attr({
            src: item.thumbnail,
            //alt: item.name,
          });
          var personInfo = $("<div>").addClass("person_info");
          var personName = $("<div>").addClass("person_name").text(item.handle);
          var personHashtag = $("<div>")
            .addClass("person_hashtag")
            .text(item.name);

          personItem.append(imgElement);
          personInfo.append(personName, personHashtag);
          personItem.append(personInfo);

          $(".person_search_list").append(personItem);
        } else if (accountType == "business") {
          var companyItem = $("<a>").prop({
            class: "company_item",
            href: "../html/profile_ent.html",
          });
          var imgElement = $("<img>").attr({
            src: item.thumbnail,
            //alt: item.name,
          });
          var companyInfo = $("<div>").addClass("company_info");
          var companyName = $("<div>")
            .addClass("company_name")
            .text(item.handle);
          var companyHashtag = $("<div>")
            .addClass("company_hashtag")
            .text(item.name);

          // 생성한 요소들을 조립하여 companyItem에 추가
          companyItem.append(imgElement);
          companyInfo.append(companyName, companyHashtag);
          companyItem.append(companyInfo);

          // 회사 목록을 .company_search_list에 추가
          $(".company_search_list").append(companyItem);
        }
      });

      // 해쉬태그 검색
      $.each(data.hashtag.items, function (index, item) {
        var hashtagItem = $("<a>").prop({
          class: "hashtag_item",
          href: "../html/profile_per.html",
        });
        var imgElement = $("<img>").attr({
          src: "../image/hashtag.png",
          //alt: item.name,
        });
        var hashtagInfo = $("<div>").addClass("hashtag_info");
        var hashtagName = $("<div>")
          .addClass("hashtag_name")
          .text(`#${item.name}`);
        var postingNum = $("<div>")
          .addClass("posting_num")
          .text(`게시물 ${item.feed.count}개`);

        hashtagItem.append(imgElement);
        hashtagInfo.append(hashtagName, postingNum);
        hashtagItem.append(hashtagInfo);

        $(".hashtag_search_list").append(hashtagItem);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error:", jqXHR.status, errorThrown);
    },
  });
});
