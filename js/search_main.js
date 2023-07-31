//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경
$(document).ready(function () {
    $("#bottom_nav_search_image").attr(
      "src",
      "../image/bottom_nav_search_black.png"
    );
  });
  
  // mock data
  $.getJSON("../mock/searchingData.json", function (data) {
    console.log(data);
    
    $.each(data, function (index, item) {
      var imgElement = $("<img>").attr({
        src: item.imageSrc,
        alt: item.name,
        width: "13rem",
        height: "13rem",
      });
      
      $(".grid_container").append(imgElement);
    });
  });