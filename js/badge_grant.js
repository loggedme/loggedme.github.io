$(function () {
  getPersonData();
});

$(document).on("click", ".item_element", function (e) {
  e.preventDefault();
  checkboxHandler(this.key);
});

function checkboxHandler(key) {
  const checkbox = $(`#item_checkbox${key}`);
  const label = $(`#item_checkbox_btn_label${key}`);
  const container = $(`#item_element${key}`);
  if (checkbox.is(":checked")) {
    checkbox.prop("checked", false);
    label.css("backgroundColor", "rgba(217, 217, 217, 0.70)");
    container.css("backgroundColor", "transparent");
  } else {
    checkbox.prop("checked", true);
    label.css("backgroundColor", "#056CF2");
    container.css("backgroundColor", "#D9D9D9");
  }
}

function getPersonData() {
  $.getJSON(`../mock/PersonData.json`, function (data) {
    $.each(data, function (index, item) {
      var itemElement = $("<a>").prop({
        class: "item_element",
        key: index,
        id: `item_element${index}`,
        href: "#",
      });

      var imageWrap = $("<div>").prop({
        class: "item_image_wrap",
      });

      var imgElement = $("<img>").attr({
        src: item.image,
        alt: item.name,
        class: "item_image",
      });

      var userNameElement = $("<div>").prop({
        class: "item_username_wrap",
      });
      var userName = $("<div>").prop({
        class: "item_username",
        id: `item_username${index}`,
        textContent: item.name,
      });
      var userHandle = $("<div>").prop({
        class: "item_userhandle",
        textContent: item.handle,
      });
      userNameElement.append(userName).append(userHandle);

      imageWrap.append(imgElement);

      var checkBoxWrap = $("<div>").prop({
        class: "item_checkbox_wrap",
      });

      var checkBox = $("<input>").prop({
        class: "item_checkbox_btn",
        name: "grant_checkbox",
        type: "checkbox",
        id: `item_checkbox${index}`,
      });

      var checkBoxLabel = $("<label>").prop({
        for: `item_checkbox${index}`,
        class: "item_checkbox_btn_label",
        id: `item_checkbox_btn_label${index}`,
      });

      checkBoxWrap.append(checkBox);
      checkBoxWrap.append(checkBoxLabel);

      itemElement.append(imageWrap);
      itemElement.append(userNameElement);
      itemElement.append(checkBoxWrap);

      $(".main_section").append(itemElement);
      console.log(item);
    });
  });
}

//실시간 email input change event
var timer;
$(".search_input").on("keydown", function () {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    const query = $(".search_input").val();
    getSearchData(query);
  }, 1000);
});

function getSearchData(query) {
  var requestData = {
    type: "personal",
    query: query,
  };
  $.ajax({
    url: `http://192.168.1.181/user`, // 서버의 API 엔드포인트
    method: "GET",
    dataType: "json",
    data: requestData,
    success: function (responseData) {
      // responseData를 처리하거나 화면에 표시하는 로직 추가
      console.log(responseData);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.status);
      console.error("AJAX 요청 실패:", textStatus, errorThrown);
    },
  });
}
