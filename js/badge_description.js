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

function getBadgeIdFromSessionStorage() {
  return sessionStorage.getItem("badgeId");
}

//edit button click event
$(".edit_button").click(function () {
  modifyBadgeHandler(1);
});

function modifyBadgeHandler(badgeId) {
  var jwtToken = getTokenFromSessionStorage();
  var badgeId = getBadgeIdFromSessionStorage();
  var img = $("#making_badge_attach_image");
  var document = $(".making_badge_attach_document");

  var badgeData = {
    image: img.attr("src"),
    description: document.val().trim(),
  };
  $.ajax({
    url: `http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/badge/${badgeId}`,
    type: "PATCH",
    data: badgeData,
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
