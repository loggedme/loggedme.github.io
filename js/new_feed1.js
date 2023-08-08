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
    */
    console.log(reverse);
    

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
    if (imageLengthCount + fileList.length > 3) {
        return 1;
    } else {
        imageList.push(...fileList);
        imageLengthCount = imageLengthCount + fileList.length;
        /* 검사!!!
        console.log(imageList);
        console.log(imageLengthCount);*/
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