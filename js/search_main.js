// 세션에서 받아올 값
function getTokenFromSessionStorage() {
  return sessionStorage.getItem("jwtToken");
}

function getCurrentUserIdFromSessionStorage() {
  return sessionStorage.getItem("currentUserId");
}

function getCurrentFeedIdFromSessionStorage() {
  return sessionStorage.getItem("currentFeedId");
}

function getCurrentUserAccountTypeFromSessionStorage() {
  return sessionStorage.getItem("currentUserAccountType");
}

// mockup api

  $(document).ready(function (jwtToken) {
    var foryou = $("#foryou");
    var person = $("#person");
    var company = $("#company");
    var underline = $(".searchMain_nav_underline");

    $(".grid_container_person, .grid_container_company").hide();
    
    underline.css("transform", "translateX(-110%)");
    foryou.addClass('selected');
    person.removeClass('selected');
    company.removeClass('selected');

    foryou.on("click", forYouBtn);
    person.on("click", personBtn);
    company.on("click", companyBtn);

    //함수들
    function forYouBtn() {
      $(".grid_container_forYou").show();
      $(".grid_container_person, .grid_container_company").hide();
      underline.css("transform", "translateX(-110%)");
      foryou.addClass('selected');
      person.removeClass('selected');
      company.removeClass('selected');
    }

    function personBtn() {
      $(".grid_container_person").show();
      $(".grid_container_forYou, .grid_container_company").hide();
      underline.css("transform", "translateX(0%)");
      person.addClass('selected');
      foryou.removeClass('selected');
      company.removeClass('selected');
    }

    function companyBtn() {
      $(".grid_container_company").show();
      $(".grid_container_forYou, .grid_container_person").hide();
      underline.css("transform", "translateX(110%)");
      company.addClass('selected');
      foryou.removeClass('selected');
      person.removeClass('selected');
    }

    // foryou 이미지 그리드 
    $.ajax({
        url: "http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/feed?trending=true",
        type: "GET",
        dataType: "json",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        success: function (data) {
            console.log("sueccess: " + JSON.stringify(data.items));
           
            $.each(data.items, function (index, item) {
              var foryouImgItem = $("<a>").prop({
                class: "img_item",
                href: "../html/profile_per.html"
              });
              var foryouImgElement = $("<img>").attr({
                src: item.image_urls[0],
                //alt: item.image_urls,
                width: "13rem",
                height: "13rem",
              });
              
              foryouImgItem.append(foryouImgElement);
              $(".grid_container_forYou").append(foryouImgItem);
          });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 400) {
            console.error('Bad Request:', jqXHR.responseText);
            alert("잘못된 주소입니다.");
            } else if (jqXHR.status === 401) {
            console.error('Unauthorized:', jqXHR.responseText);
            alert("로그인되지 않은 사용자입니다.")
            } else {
            console.error('Error:', jqXHR.status, errorThrown);
            }
        }

    });

    // person 이미지 그리드
    $.ajax({
      url: "http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/feed?type=personal",
      type: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      success: function (data) {

          //console.log("sueccess: " + JSON.stringify(data.items));
        
          $.each(data.items, function (index, item) {
            var personImgItem = $("<a>").prop({
              class: "img_item",
              href: "../html/profile_per.html"
            });
            var personImgElement = $("<img>").attr({
              src: item.image_urls,
              // alt: item.image_urls,
              width: "13rem",
              height: "13rem",
            });
            
            personImgItem.append(personImgElement);
            $(".grid_container_person").append(personImgItem);
   
          });

      },
      error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 400) {
          console.error('Bad Request:', jqXHR.responseText);
          alert("잘못된 주소입니다.");
          } else if (jqXHR.status === 401) {
          console.error('Unauthorized:', jqXHR.responseText);
          alert("로그인되지 않은 사용자입니다.")
          } else {
          console.error('Error:', jqXHR.status, errorThrown);
          }
      }

    });

    // company 이미지 그리드
    $.ajax({
      url: "http://ec2-52-79-233-240.ap-northeast-2.compute.amazonaws.com/feed?type=business",
      type: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      success: function (data) {

          //console.log("sueccess: " + JSON.stringify(data.items));
        
          $.each(data.items, function (index, item) {
            var companyImgItem = $("<a>").prop({
              class: "img_item",
              href: "../html/profile_ent.html"
            });
            var companyImgElement = $("<img>").attr({
              src: item.image_urls,
              // alt: item.image_urls,
              width: "13rem",
              height: "13rem",
            });
            
            companyImgItem.append(companyImgElement);
            $(".grid_container_company").append(companyImgItem);
        });

      },
      error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 400) {
          console.error('Bad Request:', jqXHR.responseText);
          alert("잘못된 주소입니다.");
          } else if (jqXHR.status === 401) {
          console.error('Unauthorized:', jqXHR.responseText);
          alert("로그인되지 않은 사용자입니다.")
          } else {
          console.error('Error:', jqXHR.status, errorThrown);
          }
      }

    });
})


function setCurrentFeedIdFromSessionStorage(currentFeedId) {
  return sessionStorage.setItem("currentFeedId", currentFeedId);
}
function setTokenFromSessionStorage(jwtToken) {
  return sessionStorage.setItem("jwtToken", jwtToken);
}

function setCurrentUserIdFromSessionStorage(currentUserId) {
  return sessionStorage.setItem("currentUserId", currentUserId);
}

function setCurrentUserAccountTypeFromSessionStorage(currentUserAccountType) {
  return sessionStorage.setItem(
    "currentUserAccountType",
    currentUserAccountType
  );
}
