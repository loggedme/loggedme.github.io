$(document).ready(function () {
    var foryou = $("#foryou");
    var person = $("#person");
    var company = $("#company");
    var underline = $(".searchMain_nav_underline");

    $(".grid_container_person, .grid_container_company").hide();
    
    underline.css("transform", "translateX(-110%)");
    foryou.addClass('selected');
    person.removeClass('selected');
    company.removeClass('selected');

    foryou.on("click", function () {
        $(".grid_container_forYou").show();
        $(".grid_container_person, .grid_container_company").hide();
        underline.css("transform", "translateX(-110%)");
        foryou.addClass('selected');
        person.removeClass('selected');
        company.removeClass('selected');
      });

    person.on("click", function () {
        $(".grid_container_person").show();
        $(".grid_container_forYou, .grid_container_company").hide();
        underline.css("transform", "translateX(0%)");
        person.addClass('selected');
        foryou.removeClass('selected');
        company.removeClass('selected');
      });

    company.on("click", function () {
        $(".grid_container_company").show();
        $(".grid_container_foryou, .grid_container_person").hide();
        underline.css("transform", "translateX(110%)");
        company.addClass('selected');
        foryou.removeClass('selected');
        person.removeClass('selected');
      });
});


// mock data
$.getJSON("../mock/searchingData.json", function (data) {
    console.log(data);
    
    // for you 이미지 그리드
    $.each(data, function (index, item) {
      var foryouImgItem = $("<div onclick=location.href='#';>").addClass("img_item");
      var foryouImgElement = $("<img>").attr({
        src: item.imageSrc,
        alt: item.name,
        width: "13rem",
        height: "13rem",
      });
      
      foryouImgItem.append(foryouImgElement);
      $(".grid_container_forYou").append(foryouImgItem);
    });
  
    // person 이미지 그리드
    $.each(data, function (index, item) {
      var personImgItem = $("<div onclick=location.href='#';>").addClass("img_item");
      var personImgElement = $("<img>").attr({
        src: item.imageSrc,
        alt: item.name,
        width: "13rem",
        height: "13rem",
      });
      
      personImgItem.append(personImgElement);
      $(".grid_container_person").append(personImgItem);
    });

    // company 이미지 그리드
    $.each(data, function (index, item) {
        var companyImgItem = $("<div onclick=location.href='#';>").addClass("img_item");
        var companyImgElement = $("<img>").attr({
          src: item.imageSrc,
          alt: item.name,
          width: "13rem",
          height: "13rem",
        });
        
        companyImgItem.append(companyImgElement);
        $(".grid_container_company").append(companyImgItem);
      });
  
  });