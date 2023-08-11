// state 값에 따라 화면 분기

// session에 대한 get function
function getTokenFromSessionStorage() {
  return sessionStorage.getItem("jwtToken");
}

function getCurrentUserIdFromSessionStorage() {
  return sessionStorage.getItem("currentUserId");
}

function getStateFromSessionStorage() {
  return sessionStorage.getItem("state");
}

function getHandleFromSessionStorage() {
  return sessionStorage.getItem("handle");
}

// ajax function
function getDataforPageInit(param) {
  var jwtToken = getTokenFromSessionStorage();
  var currentUserId = getCurrentUserIdFromSessionStorage();
  $.ajax({
    // url: `http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/user/${currentUserId}/following`,
    url: `http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/user/${currentUserId}/${param}`,
    type: "GET",
    dataType: "json",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log("sueccess: " + JSON.stringify(data.items));
      $.each(data.items, function (index, item) {
        var itemElement = $("<a>").prop({
          class: "item_element",
          id: "wrap" + item.id,
        });

        var leftDiv = $("<div>").prop({
          class: "item_left_div",
        });

        var imgElement = $("<img>").attr({
          src: item.thumbnail,
          alt: item.name,
          class: "item_image",
        });

        var userNameElement = $("<div>").prop({
          class: "item_userName",
          textContent: item.handle,
        });

        leftDiv.append(imgElement);
        leftDiv.append(userNameElement);

        var rightDiv = $("<div>").prop({
          class: "item_right_div",
        });

        var followElement = $("<button>").prop({
          class: "item_following_btn",
          textContent: "Following",
          id: "btn" + item.id,
        });

        var moreElement = $("<i>").prop({
          class: "fa-solid fa-ellipsis",
        });

        rightDiv.append(followElement);
        rightDiv.append(moreElement);

        itemElement.append(leftDiv);
        itemElement.append(rightDiv);

        $(`.${param}_list_main_section`).append(itemElement);
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("접근 권한이 없습니다.");
        window.location.href = "./login.html";
      } else if (jqXHR.status === 404) {
        console.error("Not found:", jqXHR.responseText);
        alert("사용자가 존재하지 않습니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}

// function getDataforPageInit(param) {
//   $.getJSON(`../mock/${param}Data.json`, function (data) {
//     $.each(data, function (index, item) {
//       var itemElement = $("<a>").prop({
//         class: "item_element",
//         id: "wrap" + item.id,
//       });

//       var leftDiv = $("<div>").prop({
//         class: "item_left_div",
//       });

//       var imgElement = $("<img>").attr({
//         src: item.imageSrc,
//         alt: item.name,
//         class: "item_image",
//       });

//       var userNameElement = $("<div>").prop({
//         class: "item_userName",
//         textContent: item.userName,
//       });

//       leftDiv.append(imgElement);
//       leftDiv.append(userNameElement);

//       var rightDiv = $("<div>").prop({
//         class: "item_right_div",
//       });

//       var followElement = $("<button>").prop({
//         class: item.Follow ? "item_following_btn" : "item_follow_btn",
//         textContent: item.Follow ? "Following" : "Follow",
//         id: "btn" + item.id,
//       });

//       var moreElement = $("<i>").prop({
//         class: "fa-solid fa-ellipsis",
//       });

//       rightDiv.append(followElement);
//       rightDiv.append(moreElement);

//       itemElement.append(leftDiv);
//       itemElement.append(rightDiv);

//       $(`.${param}_list_main_section`).append(itemElement);
//     });
//   });
// }

$(function () {
  initUserHandle();
  getDataforPageInit("follower");
  getDataforPageInit("following");
  if (getStateFromSessionStorage() === "following") {
    slideFollowing();
  }
});

// init user handle
function initUserHandle() {
  const userHandle = getHandleFromSessionStorage();
  $(".follow_list_main_header_title").text(userHandle);
}

// button click event----------------------------------------------
// profile click event
$(document).on("click", ".item_element", function () {
  let userId = $(this).attr("id").slice(4);
  console.log(userId);
  profileClickHandler(userId);
});
// following button click event
$(document).on("click", ".item_following_btn", function (e) {
  e.stopPropagation();
  $(this).attr("class", "item_follow_btn");
  $(this).text("Follow");
  unfollowHandler($(this).attr("id").slice(3));
});

// follow button click event
$(document).on("click", ".item_follow_btn", function (e) {
  e.stopPropagation();
  $(this).attr("class", "item_following_btn");
  $(this).text("Following");
  followHandler($(this).attr("id").slice(3));
});

$("#Follower_list").click(function () {
  slideFollwer();
});

$("#Following_list").click(function () {
  slideFollowing();
});

//디바운스 구현------------------------------------------------------------------------
var timer;
$(".follow_list_main_search_input").on("input", function () {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    const query = $(".follow_list_main_search_input").val();
    console.log(query);
    $(".item_userName").each(function () {
      var personName = $(this).text().toLowerCase();
      if (personName.includes(query)) {
        $(this).parent().parent().show();
      } else {
        $(this).parent().parent().hide();
      }
    });
  }, 300);
});

// slide event 처리 function------------------------------------------------------------
let startPoint = 0;
let endPoint = 0;

$(".follow_list_main_section").on("mousedown touchstart", (e) => {
  startPoint = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
});
$(".follow_list_main_section").on("mouseup touchend", (e) => {
  endPoint = e.type === "mouseup" ? e.pageX : e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    slideFollwer();
  } else if (startPoint > endPoint) {
    slideFollowing();
  }
});

// toggle page ---------------------------------------------------------------------------
function slideFollowing() {
  $(".follow_list_main_section").css({
    transform: "translateX(-50%)",
    transition: "transform 0.5s ease-in-out",
  });
  $(".toggle_wrap").removeClass("follwers");
  $(".toggle_wrap").addClass("following");
  $(".follow_list_main_search_input").val("");
  $(".follow_list_main_search_input").trigger("input");
}

function slideFollwer() {
  $(".follow_list_main_section").css({
    transform: "translateX(0%)",
    transition: "transform 0.5s ease-in-out",
  });
  $(".toggle_wrap").removeClass("following");
  $(".toggle_wrap").addClass("follwers");
  $(".follow_list_main_search_input").val("");
  $(".follow_list_main_search_input").trigger("input");
}

//프로필 클릭 시 함수
function profileClickHandler(userId) {
  sessionStorage.setItem("userId", userId);
  window.location.href = "./profile_per.html";
}

// ajax for 팔로우 취소
function unfollowHandler(userId) {
  var jwtToken = getTokenFromSessionStorage();
  var currentUserId = getCurrentUserIdFromSessionStorage();
  $.ajax({
    url: `http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/user/${currentUserId}/following/${userId}`,
    type: "DELETE",
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
      } else if (jqXHR.status === 404) {
        console.error("Not found:", jqXHR.responseText);
        alert("사용자가 존재하지 않습니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}

// ajax for 팔로우 요청
function followHandler(userId) {
  var jwtToken = getTokenFromSessionStorage();
  var currentUserId = getCurrentUserIdFromSessionStorage();
  $.ajax({
    url: `http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/user/${currentUserId}/following/${userId}`,
    type: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    success: function (data) {
      console.log("팔로우 성공: " + JSON.stringify(data));
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        console.error("Unauthorized:", jqXHR.responseText);
        alert("접근 권한이 없습니다.");
        window.location.href = "./login.html";
      } else if (jqXHR.status === 404) {
        console.error("Not found:", jqXHR.responseText);
        alert("사용자가 존재하지 않습니다.");
      } else {
        console.error("Error:", jqXHR.status, errorThrown);
        alert("서버 에러");
      }
    },
  });
}
