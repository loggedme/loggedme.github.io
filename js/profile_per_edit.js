function getURLParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  if (param == "userId") {
    return urlParams.get("userId");
  }
}

// session에 대한 get function
function getTokenFromSessionStorage() {
  return sessionStorage.getItem("jwtToken");
}

$(function () {
  getUserData();
});

function getUserData() {
  var jwtToken = getTokenFromSessionStorage();
  var userId = getURLParam("userId");
  $.ajax({
    url: `http://203.237.169.125:2002/user/${userId}`,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log(data.user);
      $("#handle").attr("value", data.user.handle);
      $("#name").attr("value", data.user.name);
      $("#preview").attr("src", data.user.thumbnail);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("로그인 되지 않은 사용자입니다.");
        window.location.href = "./login.html";
      } else if (jqXHR.status === 404) {
        console.error("Not Found:", jqXHR.responseText);
        alert("존재하지 않는 사용자입니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
      }
    },
  });
}

$("#image_input").on("change", function (event) {
  // variable management---------------------------
  const file = event.target.files[0];
  const preview = $("#preview");

  const reader = new FileReader();
  reader.onload = function (event) {
    preview.attr("src", event.target.result);
  };
  reader.readAsDataURL(file);
  // console.log(file);
  // console.log($("#making_badge_attach_image_input")[0].files[0]);
});

$(".logout").click(function () {
  sessionStorage.removeItem("jwtToken");
  sessionStorage.removeItem("currentUserAccountType");
  sessionStorage.removeItem("handle");
  sessionStorage.removeItem("currentUserId");
  sessionStorage.removeItem("thumbnail");
  window.location.href = "./login.html";
});

$(".signout").click(function () {
  var jwtToken = getTokenFromSessionStorage();
  var userId = getURLParam("userId");
  $.ajax({
    url: `http://203.237.169.125:2002/user/${userId}`,
    type: "DELETE",
    // dataType: "json",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      alert("회원탈퇴에 성공했습니다");
      window.location.href = "./login.html";
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("접근 권한이 없는 사용자입니다.");
        window.location.href = "./login.html";
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
      }
    },
  });
});

function setUserData() {
  var jwtToken = getTokenFromSessionStorage();
  var userId = getURLParam("userId");
  var profileData = new FormData();
  var handle = $("#handle").val();
  var name = $("#name").val();
  var fileInput = $("#image_input")[0].files[0];
  profileData.append("handle", handle);
  profileData.append("name", name);
  profileData.append("profile_image", fileInput);

  $.ajax({
    url: `http://203.237.169.125:2002/user/${userId}`,
    type: "PATCH",
    dataType: "json",
    data: profileData,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("로그인 되지 않은 사용자입니다.");
        window.location.href = "./login.html";
      } else if (jqXHR.status === 404) {
        console.error("Not Found:", jqXHR.responseText);
        alert("존재하지 않는 사용자입니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
      }
    },
  });
}
