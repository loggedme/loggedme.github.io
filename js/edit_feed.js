// 지금 있는 페이지 버튼 검정으로
$(document).ready(function () {
    $(".base_bottom_nav_plus_image").attr(
      "src",
      "../image/bottom_nav_plus_black.png"
    );
});

// 원래 검정색인거 회색으로
$(document).ready(function () {
    $("#bottom_nav_person_image").attr(
      "src",
      "../image/bottom_nav_person.png"
    );
});


/* tag company 모달창 기능 */
$('.modal_overlay').hide()
$('.close_btn').click(function () {
  $('.modal_overlay').hide()
})
$('.open_modal').click(function () {
  $('.modal_overlay').show()
})

// Cancle 버튼 클릭 시 뒤로가기
function goBack() {
    window.history.back();
}

const imageList = [];
var imageLengthCount = 0;

const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = document.querySelector(".slider__img");       // 보여지는 영역
const sliderInner = document.querySelector(".slider__inner");   // 움직이는 영역
const slider = document.querySelectorAll(".slider"); 
const sliderBtn = document.querySelector(".slider__btn");    //버튼
const sliderBtnPrev = document.querySelector(".prev");       //왼쪽버튼
const sliderBtnNext = document.querySelector(".next");       //오른쪽버튼
const sliderDot = document.querySelector(".slider__dot");       //닷 메뉴

let currentIndex = 0;                       //현재 이미지
let sliderCount = slider.length;            //이미지 갯수(imageList.length)
let sliderWidth = sliderImg.offsetWidth;    //이미지 가로
let dotIndex = "";

// 이미지 움직이는 영역
function gotoSlider(num){
    sliderInner.style.transition = "all 400ms";
    sliderInner.style.transform = "translateX("+ -sliderWidth * num +"px)";
    currentIndex = num;

    // 두번째 이미지 == 두번째 닷에 클래스 추가
    // 닷 메뉴 클래스 모두 삭제 -> 해당 이미지의 닷 메뉴에 클래스 추가
    let dotActive = document.querySelectorAll(".slider__dot .dot");
    dotActive.forEach(el => el.classList.remove("active"));
    dotActive[num].classList.add("active");
}

// 왼쪽 버튼을 클릭했을 때
sliderBtnPrev.addEventListener("click", () => {
    let prevIndex = (currentIndex + (sliderCount -1)) % sliderCount
    // 4, 1, 2, 3, 4, 1, 2, ...
    gotoSlider(prevIndex);
});

// 오른쪽 버튼을 클릭했을 때
sliderBtnNext.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % sliderCount
    // 1, 2, 3, 4, 0, 1, 2, ...
    gotoSlider(nextIndex);
});

// 초기값 설정 함수 init()
function init(){
    // <a href="#" class="dot active">이미지1</a>
  
    slider.forEach(() => {dotIndex += "<a href='#' class='dot'>이미지1</a>";});
    sliderDot.innerHTML = dotIndex;
  
    // 첫 번째 닷 버튼에 활성화 표시(active)
    sliderDot.firstChild.classList.add("active");
  }
  init();

 // 닷 버튼을 클릭했을 때 해당 이미지로 이동
 document.querySelectorAll(".slider__dot .dot").forEach((dot, index) => {
    dot.addEventListener("click", () => {
        gotoSlider(index);
    });
  })