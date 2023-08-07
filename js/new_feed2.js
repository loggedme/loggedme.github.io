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


/*
    게시물 작성 페이지-1
*/
/* 맨 아래 base 구간 */
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


// close버튼 클릭 시 뒤로가기
function goBack() {
  window.history.back();
}

// photo_add부분 사진 추가시 작게 보이는 preview부분

var input = document.getElementById("input");
var initLabel = document.getElementById("label");
const imageList = [];
var imageLengthCount = 0;

// 마우스 올렸을 때 효과
initLabel.addEventListener("mouseover", (event) => {
  event.preventDefault();
  const label = document.getElementById("label");
  
  label?.classList.add("label--hover");
});



initLabel.addEventListener("mouseout", (event) => {
  event.preventDefault();
  const label = document.getElementById("label");
  
  label?.classList.remove("label--hover");
});

// test 해보는 중... (아이디어 handleUpdate함수에 매개변수를 하나 더 만들어서 배열 마지막 요소도 같이 줘보자)

// change이벤트 -> 요소 변경이 끝나면 발생
input.addEventListener("change", (event) => {   // html에서 onchange 이벤트를 js에서 하는 방법이다
  const files = changeEvent(event);
  const fileLastElement = files.slice(-1); // last라는 변수에 files로 온 이미지의 마지막 요소를 저장
  const reverse = [...files].reverse();
  /* 검사
  console.log(files);
  console.log(fileLastElement);
  console.log(files[0]);
  console.log(fileLastElement[0]);
  console.log(reverse);
  */
  
  

  var check = handleUpdate(reverse);  // 원래 handleUpdate(files)인데 last 추가한거야
  if (check == 1) {
      alert("이미지 개수는 10개까지입니다.");
  } else {
      handleUpdatePre(fileLastElement);
  }
  
});

// test 해보는 중...

function changeEvent(event) {
  const { target } = event;   // const target = event.target 이랑 똑같데(설명: object 안에 존재하는 값을 바로 변수 할당 시켜주는 것)
  return [...target.files];   // target.files == event.target.files (둘이 똑같다...)
};

function handleUpdate(fileList) {
  //console.log(fileList);
  const preview = document.getElementById("preview"); 
  // 이미지 개수 10개 제한
  if (imageLengthCount + fileList.length > 10) {
      return 1;
  } else {
      imageList.push(...fileList);
      imageLengthCount = imageLengthCount + fileList.length;
      /* 검사!!!*/
      console.log(imageList);
      console.log(imageLengthCount);
  }
  fileList.forEach((file) =>{
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
          const img = el("img", {
              className: "embed-img",
              src: event.target?.result,  // src는 base-64형태
          });

          const imgContainer = el("div", {className: "container-img"}, img);
          preview.append(imgContainer);
      });
  
      reader.readAsDataURL(file);
  });    
};

/***********************테스트 중!!!**************8 */
function handleUpdatePre(fileLast) {
  const preview_image = document.getElementById("preview_image"); // 새로 만든 부분 
  
  fileLast.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
          const img_pre = el("img", { // 새로 만든 부분
              className: "preview_image",
              src: event.target?.result,
          });
          const imgContainer_pre = el("div", {className: "container-img"}, img_pre);  // 새로 만든 부분
          preview_image.append(imgContainer_pre); // 새로 만든 부분
          // append 는 최초 1번만 두번째부터 if문으로 소스 바꾸기
          // 기본 이미지 넣어놓고 새로 들어오면 소스만 바꿔줘
      });
      reader.readAsDataURL(file);
  });
};

function el(nodeName, attributes, ...children) {
  const node = nodeName === "fragment" ? document.createDocumentFragment() : document.createElement(nodeName);
  Object.entries(attributes).forEach(([key, value]) => {
      if (key === "events") {
          Object.entries(value).forEach(([type, listener]) => {
              node.addEventListener(type, listener);
          });
      } else if (key in node) {
          try {
              node[key] = value;
          } catch(err){
              node.setAttribute(key, value);
          }
      } else {
          node.setAttribute(key, value);
      }
  });

  children.forEach((childNode) => {
      if(typeof childNode === "string") {
          node.appendChild(document.createTextNode(childNode));
      } else {
          node.appendChild(childNode);
      }
  });
  return node;
}

/* ***********이 부분은 드래그로 파일을 올릴 때만 필요***********

document.addEventListener("dragenter", (event) => {
  event.preventDefault();
  console.log("dragenter");   // 확인하는 부분
  if( event.target.className === "inner") {
      event.target.style.background = "#616161";
  }
});

document.addEventListener("dragover", (event) => {
  console.log("dragover");
  event.preventDefault();
});

document.addEventListener("dragleave", (event) => {
  event.preventDefault();
  console.log("dragleave");   // 확인하는 부분
  if( event.target.className === "inner") {
      event.target.style.background = "#3a3a3a";
  }
});

document.addEventListener("drop", (event) => {
  event.preventDefault();
  console.log("drop");   // 확인하는 부분
  if( event.target.className === "inner") {
      const files = event.dataTransfer?.files;
      
      event.target.style.background = "#3a3a3a";
      handleUpdate([...files]);
  }
});
*/

/* Next를 누르면 다음 new_feed2로 넘어갈 때, 리스트를 로컬 스토리지에 저장하는 함수
function goNext(image_List) {
  
}

goNext(imageList);
*/


// 이미지 리스트를 로컬 스토리지로 보내는 방법
document.getElementById('Next').addEventListener("click", () => {
  localStorage.setItem('imageList', JSON.stringify(imageList));
});

/*
const dataTranster = new DataTransfer();

Array.from(imageList)
  .filter(file => file.lastModified != removeTargetId)
  .forEach(file => {
      dataTranster.items.add(file);
  });

input.imageList = dataTranster.imageList;

*/
/*
const resetFileList = (target: EventTarget & HTMLInputElement) => {
  const dataTransfer = new DataTransfer();
  target.files = dataTransfer.files;
*/

/*
    게시물 작성 페이지-2
 */

// back버튼 클릭 시 뒤로가기("게시물 작성 페이지-1" 로 이동)
function goBack() {
  window.history.back();
}

/* 
  이미지 슬라이더 부분!!!!!!
*/
// preview_image(업로드할 사진(10장이하)) 부분
const storedList = JSON.parse(localStorage.getItem('imageList'));

// 2. 좌우 버튼

// 3. 이미지가 보여질 div


const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = document.querySelector(".slider__img");       // 보여지는 영역
const sliderInner = document.querySelector(".slider__inner");   // 움직이는 영역
const slider = document.querySelectorAll(".slider"); 
const sliderBtn = document.querySelector(".slider__btn");    //버튼
const sliderBtnPrev = document.querySelector(".prev");       //왼쪽버튼
const sliderBtnNext = document.querySelector(".next");       //오른쪽버튼
const sliderDot = document.querySelector(".slider__dot");       //닷 메뉴
const BtnNext = document.getElementById("Next");              // 다음 버튼을 통해 오른쪽으로 슬라이드
const BtnBack = document.getElementById("backBtn");            // 뒤로 가기를 통해 왼쪽으로 슬라이드
const pageImg = document.querySelector(".page__img");         // 페이지가 보여지는 영역
const pageInner = document.querySelector(".page__inner");

let currentIndex = 0;                       //현재 이미지
let sliderCount = slider.length;            //이미지 갯수(imageList.length)
let sliderWidth = sliderImg.offsetWidth;    //이미지 가로
let dotIndex = "";
let currentPage = 0;                        //현재 페이지
let pageWidth = pageImg.offsetWidth;        //페이지 가로


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

// Next 버튼을 클릭했을 때
BtnNext.addEventListener("click", () => {
  /* 
    버튼이 클릭되면 이미지 개수에 따라서 div요소가 생성되어야 한다.
    <div class = "slider" role="group"><img src="..이미지 주소"></div>
    위의 형식으로 해야 됨. createElement, setAttribute 등의 메소드들이 있지만
    Next버튼과 Back버튼이 여러번 눌리게 되는 것을 가정하면
    이미지를 다시 추가하여 Next버튼을 여러번 누를 수 있기에 그에 따른 변동 사항
    적용을 위해서 innerHTML을 통해(템픞릿으로 따로 만들자 해당 공간 값을 바꾸기)
  */
  
    /* 템플핏과 innerHTML을 작성하자!!!! 8월 8월
  let template= `
    <div class=
  `
  */
  
  pageInner.style.transition = "all 400ms";
  pageInner.style.transform = "translateX("+ -pageWidth +"px)";
  currentPage = 1;
});

// Back 버튼을 클릭했을 때
BtnBack.addEventListener("click", () => {
  pageInner.style.transition = "all 400ms";
  pageInner.style.transform = "translateX(" + 0 + "px)";
  currentPage= 0;
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

/*
  html요소 추가 test!!!!!!!!
*/

/*
let childElement = null;

for (let i=0; i < imageLengthCount; i++) {
  childElement = document.createElement("div");
  childElement.className = "slider slide" + (i+1);
  childElement.role = "group";
  sliderInner.append(childElement);
  var slide = document.querySelector("")
}
*/

/* Object.assing() 메서드를 이용한 html요소 추가 (보류)
document.querySelector(".slider__inner").appendChild(
  Object.assign(
    document.createElement('div'),
    { class : 'slider' },
    { role: 'group'}
  )  
)
*/