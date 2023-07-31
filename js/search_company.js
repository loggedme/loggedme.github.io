$(document).ready(function () {
    $("#bottom_nav_search_image").attr(
      "src",
      "../image/bottom_nav_search_black.png"
    );
  });



// mock data
$.getJSON("../mock/searchingData_company.json", function (data) {
    console.log(data);
  
    // data를 가져와서 회사 목록을 동적으로 생성
    $.each(data, function (index, item) {
      var companyItem = $("<div>").addClass("company_item");
      var imgElement = $("<img>").attr({
        src: item.profileImgSrc,
        alt: item.companyName,
      });
      var companyInfo = $("<div>").addClass("company_info");
      var companyName = $("<div>")
        .addClass("company_name")
        .text(item.companyName);
      var companyHashtag = $("<div>")
        .addClass("company_hashtag")
        .text(item.companyHashtag);
  
      // 생성한 요소들을 조립하여 companyItem에 추가
      companyItem.append(imgElement);
      companyInfo.append(companyName, companyHashtag);
      companyItem.append(companyInfo);
  
      // 회사 목록을 .company_search_list에 추가
      $(".company_search_list").append(companyItem);
    });
  });