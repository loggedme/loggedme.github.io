$(document).ready(function () {
    $("#bottom_nav_search_image").attr(
      "src",
      "../image/bottom_nav_search_black.png"
    );
  });



// mock data
$.getJSON("../mock/searchingData_person.json", function (data) {
    console.log(data);
  
    // data를 가져와서 회사 목록을 동적으로 생성
    $.each(data, function (index, item) {
      var personItem = $("<div>").addClass("person_item");
      var imgElement = $("<img>").attr({
        src: item.profileImgSrc,
        alt: item.personName,
      });
      var personInfo = $("<div>").addClass("person_info");
      var personName = $("<div>")
        .addClass("person_name")
        .text(item.personName);
      var personHashtag = $("<div>")
        .addClass("person_hashtag")
        .text(item.personHashtag);
  
      // 생성한 요소들을 조립하여 personItem에 추가
      personItem.append(imgElement);
      personInfo.append(personName, personHashtag);
      personItem.append(personInfo);
  
      // 회사 목록을 .person_search_list에 추가
      $(".person_search_list").append(personItem);
    });
  });