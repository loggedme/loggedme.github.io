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

input.addEventListener("change", (event) => {
    const files = changeEvent(event);
    handleUpdate(files);
});

function changeEvent(event) {
    const { target } = event;
    return [...target.files];
};

function handleUpdate(fileList) {
    const preview = document.getElementById("preview"); 
    const preview_image = document.getElementById("preview_image"); // 새로 만든 부분 
    fileList.forEach((file) =>{
        const reader = new FileReader();

        reader.addEventListener("load", (event) => {
            const img = el("img", {
                className: "embed-img",
                src: event.target?.result,  // src는 base-64형태
            });
            const img_pre = el("img", { // 새로 만든 부분
                className: "preview_image",
                src: event.target?.result,
            });
            const imgContainer = el("div", {className: "container-img"}, img);
            const imgContainer_pre = el("div", {className: "container-img"}, img_pre);  // 새로 만든 부분
            preview.append(imgContainer);
            preview_image.append(imgContainer_pre); // 새로 만든 부분
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