// 뱃지 id, 뱃지 만든 사람id 을 받아와야 함 session
// 뱃지가 자기가 만든 벳지인지 다른사람이 만든 벳지인지 체크해서
// 내가 만든거면 edit 버튼을 보이고 아니라면 보이지 않게한다.

// $(".edit_button").css("visibility", "visible");
// $(".edit_button").css("visibility", "hidden");

// 뱃지 정보 받아와서 이미지랑 도큐먼트 넣어놈.
var isOwner = true;

function getTokenFromSessionStorage() {
  return sessionStorage.getItem("jwtToken");
}

function getCurrentUserIdFromSessionStorage() {
  return sessionStorage.getItem("currentUserId");
}

function getURLBadgeId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("badgeId");
}

function getURLUserId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("userId");
}

//edit button click event
$(".edit_button").click(function () {
  $("#making_badge_attach_image_input").prop("disabled", false);
  $(".making_badge_attach_document").prop("disabled", false);
  $(".making_badge_attach_document").focus();
  $(".edit_button").hide();
  $(".save_button").show();
});

$(".save_button").click(function () {
  modifyBadgeHandler();
});

function modifyBadgeHandler() {
  var jwtToken = getTokenFromSessionStorage();
  var badgeId = getURLBadgeId();
  var fileInput = $("#making_badge_attach_image_input")[0].files[0];
  var document = $(".making_badge_attach_document").val().trim();
  var badgeData = new FormData();
  badgeData.append("image", fileInput);
  badgeData.append("description", document);
  console.log(fileInput);
  console.log(document);
  console.log(badgeData);
  $.ajax({
    url: `http://203.237.169.125:2002/badge/${badgeId}`,
    type: "PUT",
    data: badgeData,
    processData: false, // FormData 처리 방지
    contentType: false, // 컨텐츠 타입 설정 방지

    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log("팔로우 취소: " + JSON.stringify(data));
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("접근 권한이 없습니다.");
        window.location.href = "./login.html";
      } else if (jqXHR.status === 400) {
        console.error("Bad Request:", jqXHR.responseText);
        alert("형식이 올바르지 않습니다.");
      } else if (jqXHR.status === 403) {
        console.error("Forbidden:", jqXHR.responseText);
        alert("올바른 접근이 아닙니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}

$(function () {
  checkUser();
});

function checkUser() {
  var jwtToken = getTokenFromSessionStorage();
  var badgeId = getURLBadgeId();
  var currentUserId = getCurrentUserIdFromSessionStorage();
  var document = $(".making_badge_attach_document");
  $.ajax({
    url: `http://203.237.169.125:2002/badge/${badgeId}`,
    type: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log(JSON.stringify(data));
      if (currentUserId == data.publisher.id) {
        $(".edit_button").show();
      }
      $("#making_badge_attach_image").attr("src", data.thumbnail);
      $(".making_badge_attach_document").text(data.description);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("접근 권한이 없습니다.");
        window.location.href = "./login.html";
      } else if (jqXHR.status === 400) {
        console.error("Bad Request:", jqXHR.responseText);
        alert("형식이 올바르지 않습니다.");
      } else if (jqXHR.status === 403) {
        console.error("Forbidden:", jqXHR.responseText);
        alert("올바른 접근이 아닙니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}

//이미지 업로드 버튼 눌렀을 때 호출되는 함수
$(".making_badge_attach_image_label").on("change", function (event) {
  const file = event.target.files[0];
  const preview = $("#making_badge_attach_image");

  const reader = new FileReader();
  reader.onload = function (event) {
    preview.attr("src", event.target.result);
  };
  reader.readAsDataURL(file);
});
