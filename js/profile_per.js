/*
  개인 프로필(게시물 여러개) 
  개인 프로필(게시물 없음)
*/

// 각자 페이지에서 맡게 불러오면 됩니다.
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
/*
$('.open_modal').click(function () {
  $('.modal_overlay').show()
})
*/

let FeedList = [];
let imageList = []; // 피드 값 중에서 image_urls 부분에서 첫 이미지들(image_urls[0])만 따로 받아오기(프로필 페이지 썸네일용)
var FeedListLength = FeedList.length; // 피드 개수

/*
  posts, followers, following 숫자 변경 부분
*/

/* 임시로 100, 200 값 넣어놓음 */
var Followers = 100;  // "api 사용자 프로필 조회" 에서 받아오게
var Following = 200;  // "api 사용자 프로필 조회" 에서 받아오게

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
myFollowers(Followers);     // 팔로워 숫자 부분
myFollowing(Following);     // 팔로우 숫자 부분



/* 
  뱃지 받아오는 부분
*/

let badgeList = [];   // 뱃지 받아와서 리스트에 저장
var badgeListLength = badgeList.length; // 뱃지 개수
let badgeImage = [];  // 뱃지 이미지(썸네일) 리스트(bageList로 불러 올 수 있으면 굳이 필요 없을 수도있음)

function showBadge() {
  let template=``;

  if(badgeListLength != 0) {
    for(let i = 0; i < badgeListLength; i++) {
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

function modal_On(num) {
  document.querySelector(".modal_image").src = badgeImage[num]; // badgeList를 통해서 받아올 수 있으면 그걸로 간다.(하지만.. 지금처럼 이미지들만 따로 배열에 넣은게 편할 수도 있다...)
  document.getElementsByClassName("modal_document")[0].innerText = badgeList[num];  // 스택에서 보면 classname으로 받아오면 배열로 받아옴. 그래서 첫번째 요소로 받아와야 원하는대로 된다.
  $('.modal_overlay').show()  // 모달 보여주는 코드
}


/* 
  피드가 있을 경우 피드 없는 상태일 때의 div 삭제
 */

/* 여기에 있던거 위로 갔음.
let FeedList = [0];
let imageList = []; // 피드 값 중에서 image_urls 부분에서 첫 이미지들(image_urls[0])만 따로 받아오기(프로필 페이지 썸네일용)
var FeedListLength = FeedList.length; // 피드 개수
console.log(FeedListLength);
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