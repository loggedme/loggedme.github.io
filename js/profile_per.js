/*
  개인 프로필(게시물 여러개) 
  개인 프로필(게시물 없음)
*/
//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경

$(document).ready(function () {
    $("#bottom_nav_profile_image").attr(
      "src",
      "../image/bottom_nav_profile_black.png"
    );
});


/* 모달창 부분 */
$('.modal_overlay').hide()

$('.close_btn').click(function () {
  $('.modal_overlay').hide()
})


let badgeList = [];   // 뱃지 배열을 badgeList에 저장
var badgeListLength = badgeList.length; // 뱃지 개수
let badgeImage = [];  // 뱃지 이미지(썸네일) 리스트(bageList로 불러 올 수 있으면 굳이 필요 없을 수도있음)
var badgeDescription = [] // 뱃지 설명이 들어있는 배열

/* ajax 부분 */
// ajax url에 user.id에 들어갈 값을 받아오는 부분

// http://127.0.0.1:5500/html/profile_per.html?userId=1&&userAccountType=personal
// -> 뒤에서 2가지 key=value 오고 그걸 get으로 받아오기
let params = new URLSearchParams(window.location.search); // 현재 페이지의 실제 주소(프론트에서의)
let userId = params.get("userId");
let userAccountType = params.get("userAccountType"); // 본인 
/* 이해를 위한 예시 코드
let Ac = params.get("userAccountType");
console.log(userId);
console.log(Ac);
*/


/* 본인이 본인의 계정으로 들어온 것인지 확인하는 if문 (플러스 버튼의 유무를 위함) */
// 세션에 본인꺼 currentAccountType(personal/business), currentUserId가 들어있다.
if( ( userAccountType === sessionStorage.getItem("currentUserAccountType") ) && ( userId === sessionStorage.getItem("currentUserId") )) {

} else {
  $("a").remove("#feed_plus_btn");
}

// 토큰 받아오는 함수
function getTokenFromSessionStorage() {
  return sessionStorage.getItem("jwtToken");
}
var jwtToken = getTokenFromSessionStorage();

// get 부분 (handle, 프사, 팔로워, 팔로잉, 뱃지)
$.ajax({
  url: `http://203.237.169.125:2002/user/${userId}`,  // ${userId}에 백엔드의 user.id가 들어갈거고
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  headers: {
    Authorization: `Bearer ${jwtToken}`
  },
  success: function(data) {
    console.log('success:', JSON.stringify(data));

    var Followers = data.follow.follower;  // "api 사용자 프로필 조회" 에서 받아오게
    var Following = data.follow.following;  // "api 사용자 프로필 조회" 에서 받아오게
    myFollowers(Followers);     // 팔로워 숫자 부분 html로 보내기
    myFollowing(Following);     // 팔로우 숫자 부분 html로 보내기

    /* 
      뱃지 받아오는 부분
    */
    
    // ajax 밖에 있는 빈 배열 badgeList에 뱃지의 data 넣기
    $.each(data.badge.items, function (item) {
      badgeList.push(item); // 각각의 뱃지 썸네일을 빈 badgeImage 배열에 하나씩 푸쉬
    })

    badgeListLength = badgeList.length; // 뱃지 개수

    // ajax 밖에 있는 빈 배열 badgeImage에 뱃지의 썸네일 넣기
    $.each(data.badge.items, function (item) {
      badgeImage.push(item.thumbnail); // 각각의 뱃지 썸네일을 빈 badgeImage 배열에 하나씩 푸쉬
    })

    // ajax 밖에 있는 빈 배열 badgeDescription에 뱃지 설명 넣기
    $.each(data.badge.items, function (explain) {
      badgeDescription.push(item.description);
    })



    //----------------------------------------------------
  },
  error: function(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 404) {
      console.error('404 Not Found', jqXHR.responseText);
      alert("조회 하려는 유저가 존재하지 않을 때");
    } 
  }
});

// get 부분(피드, 피드썸네일) (-> 피드를 눌렀을 때, 해당 피드로 이동)
$.ajax({
  url: `http://203.237.169.125:2002/user/${userId}`,
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  headers: {
    Authorization: `Bearer ${jwtToken}`
  },
  success: function(data) {
    console.log('success:', JSON.stringify(data));

},
  error: function(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 404) {
      console.error('404 Not Found', jqXHR.responseText);
      alert("조회 하려는 유저가 존재하지 않을 때");
    } 
  }
});

let FeedList = [];
let imageList = []; // 피드 값 중에서 image_urls 부분에서 첫 이미지들(image_urls[0])만 따로 받아오기(프로필 페이지 썸네일용)
var FeedListLength = FeedList.length; // 피드 개수

/*
  posts, followers, following 숫자 변경 부분
*/

function FeedPosts(num) { // posts 숫자 함수
  document.getElementsByClassName("number")[0].innerText = num;
}

function myFollowers(num) {
  document.getElementsByClassName("number")[1].innerText = num;
}

function myFollowing(num) {
  document.getElementsByClassName("number")[2].innerText = num;
}

FeedPosts(FeedListLength);  // posts 숫자 부분

function showBadge(num) {
  let template=``;

  if(num != 0) {
    for(let i = 0; i < num; i++) {
      template += `
      <div class="badge" id="badge${i+1}"><img class="open_modal" onclick="modal_On(${0})" src="${badgeList[i]}"></div>
      `
    }
    $('.badge_inner').append(template);
  }
}

/*
  뱃지 눌렀을 때, 뱃지 모달창의 내용 변경 부분
*/
// 이 부분은 badgeImage 배열 변수와, badgeList와 같이 있어야 됨.
function modal_On(num) {  // showBadge(num) 함수가 실행되어야 실행되는 함수
  document.querySelector(".modal_image").src = badgeImage[num]; // badgeList를 통해서 받아올 수 있으면 그걸로 간다.(하지만.. 지금처럼 이미지들만 따로 배열에 넣은게 편할 수도 있다...)
  document.getElementsByClassName("modal_document")[0].innerText = badgeDescription[num];  // 스택에서 보면 classname으로 받아오면 배열로 받아옴. 그래서 첫번째 요소로 받아와야 원하는대로 된다.
  $('.modal_overlay').show()  // 모달 보여주는 코드
}
//---------------------------------------------------------------

/* 
  피드가 있을 경우 피드 없는 상태일 때의 div 삭제
 */

function showFeed(imageList) {
  let template=``;

  if(FeedListLength != 0) {
    $('div').remove('.zero_feed');  // 피드가 1개라도 있으면 게시물 없다는 표시의 div를 html에서 삭제
    for(let i = 0; i < FeedListLength; i++) {
      template += `
      <button class="goto_feed" id="feed_btn${i}" onclick="GoToFeed(${i})"><img class=feed_img src="${imageList[i]}"></button>
      `
    }
    $('my_feed').append(template);
  }
}

function GoToFeed(num) {
  console.log(FeedList[num]);
  return FeedList[num]; // 피드의 정보를 리턴
  /* 사실 해당 페이지로 이동 필요 (a태그를 이용해야 한다. 일단 목업 받고 생각) */
}

showFeed(FeedList);   // 피드의 개수에 따라 보여줄 화면에 대한 함수
showBadge();

