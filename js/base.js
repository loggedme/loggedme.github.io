// mock data 사용법
/*
$.getJSON("../mock/searchingData.json", function (data) {
  // data 확인
  console.log(data);
  // list 형식의 json data를 받아와서 사용하는 방법 예시
  $.each(data, function (index, item) {
    var imgElement = $("<img>").attr({
      src: item.imageSrc,
      alt: item.name,
      width: "100px",
      height: "100px",
    });
    // main 태그에 추가
    $("main").append(imgElement);
  });
});
*/

function rightAccountType() {
  if (getCurrentUserAccountType() == 1) {
    window.location.href = "./profile_per.html";
  } else if (getCurrentUserAccountType() == 2) {
    window.location.href = "./profile_ent.html";
  } else {
    alert("뭔가 이상이 생겼따...");
  }
}

function getCurrentUserAccountType() {
  // 세션에 있는 (personal또는 business인지 받아오는 함수)
  return sessionStorage.getItem("currentUserAccountType"); // 값이 1이면 personal, 2면 business
}
