// 각자 페이지에서 맡게 불러오면 됩니다.
//페이지 로딩 시 각 카테고리에 맡게 하단바의 이미지를 변경

$(document).ready(function () {
    $("#bottom_nav_profile_image").attr(
      "src",
      "../image/bottom_nav_profile_black.png"
    );
});

/*
$.ajax({
  url: `http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/user/${user.id}`,
  type: 'GET',
  dataType: 'json',
  contentType: 'application/json',
  headers: {
    Authorization: `Bearer ${jwtToken}`
  },
  success: function(data) {
    console.log('response:', jqXHR.responseText);
  },
  error: function(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 400) {
      console.error('Bad Request:', jqXHR.responseText);
    } else if (jqXHR.status === 401) {
      console.error('Unauthorized:', jqXHR.responseText);
    } else if (jqXHR.status === 404) {
      console.error('Not Found:', jqXHR.responseText);
    } else {
      console.error('Error:', jqXHR.status, errorThrown);
    }
  }
});

*/

/* ok 누르면 전 화면으로 돌아가(근데 지금까지 수정된 것들을 보내주긴 해야 됨.) */
function sendAndGoBack() {
  

  // 변경된 데이터를 보내고 나서 뒤로 가는 함수 실행  
  window.history.back();
}