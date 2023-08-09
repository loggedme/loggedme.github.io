//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경
$(document).ready(function () {
    $("#bottom_nav_search_image").attr(
      "src",
      "../image/bottom_nav_search_black.png"
    );
  });

$(document).ready(function () {
  var searchInput = $("#search_input");
  var goBack = $("#goBack");
  var searchPerson = $("#searchPerson");
  var searchCompany = $("#searchCompany");
  var searchHashtag = $("#searchHashtag");
  var underline = $(".searchPage_nav_underline");

  // 검색 개인,회사,해쉬태그 페이지 숨기기
  $(".searchInner_nav, .person_container, .company_container, .hashtag_container")
  .hide('fast');
  
  // 디바운스 oninput 이벤트
  searchInput.on("input", debounce(function () {
    var searchTerm = searchInput.val().toLowerCase();

    $(".person_search_list .person_item").each(function () {
      var personName = $(this).text().toLowerCase();
      if(personName.includes(searchTerm)){
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    $(".company_search_list .company_item").each(function () {
      var companyName = $(this).text().toLowerCase();
      if (companyName.includes(searchTerm)){
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    $(".hashtag_search_list .hashtag_item").each(function () {
      var hashtageText = $(this).text().toLowerCase();
      if (hashtageText.includes(searchTerm)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

  }, 300));

  searchInput.on("input", function () {
    // 탐색 메인 페이지 숨기기
    $(".grid_container_forYou, .searchMain_nav, .grid_container_person, .grid_container_company").fadeOut('fast');
    // 검색어 없으면 탐색 메인페이지 보이기
    if (searchInput.val() === "") {
      $(".searchMain_nav, .grid_container_forYou").fadeIn('fast');
      $(".searchInner_nav, .person_container, .company_container, .hashtag_container")
      .hide('fast');
    } else {
      // 초기 검색 개인 페이지 보이기
      $(".searchInner_nav").fadeIn('fast');
      $(".person_container").fadeIn('fast');
      
      underline.css("transform", "translateX(-110%)");
      searchPerson.addClass('selected');
      searchCompany.removeClass('selected');
      searchHashtag.removeClass('selected');
    }
   
  });

  // Person 클릭시 개인 검색만 보기
  searchPerson.on("click", function () {
    $(".person_container").fadeIn('fast');
    $(".company_container, .hashtag_container").fadeOut('fast');
    underline.css("transform", "translateX(-110%)");
    searchPerson.addClass('selected');
    searchCompany.removeClass('selected');
    searchHashtag.removeClass('selected');
  });
  // Company 클릭시 회사 검색만 보기
  searchCompany.on("click", function () {
    $(".company_container").fadeIn('fast');
    $(".hashtag_container, .person_container").fadeOut('fast');
    underline.css("transform", "translateX(0%)");
    searchCompany.addClass('selected');
    searchHashtag.removeClass('selected');
    searchPerson.removeClass('selected');
    });
  // hashtag 클릭시 해시태그 검색만 보기
  searchHashtag.on("click", function () {
    $(".hashtag_container").fadeIn('fast');
    $(".person_container, .company_container").fadeOut('fast');
    underline.css("transform", "translateX(110%)");
    searchHashtag.addClass('selected');
    searchCompany.removeClass('selected');
    searchPerson.removeClass('selected');
    })

  goBack.on("click", function () {
    // 뒤로가기 버튼 클릭시 검색 페이지 숨기기
    $(".searchInner_nav, .person_container, .company_container, .hashtag_container")
    .fadeOut();
    
    // 탐색 메인 페이지 보이기
    $(".searchMain_nav, .grid_container_forYou").fadeIn();
    searchInput.val("");
  });
});
  
// 디바운스 함수
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
