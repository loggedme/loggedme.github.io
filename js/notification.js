$.getJSON("../mock/notificationData.json", function (data) {
  $.each(data, function (index, item) {
    var itemElement = $("<a>").prop({
      class: "item_element",
      href: "#",
    });
    var imgElement = $("<img>").attr({
      src: item.imageSrc,
      alt: item.name,
      class: "item_image",
    });
    var elementWrap = $("<div>").prop({
      class: "content_wrap",
    });
    var contentElement = $("<span>").prop({
      class: "item_content",
      textContent: item.docuement,
    });

    var createdElement = $("<span>").prop({
      class: "item_created_at",
      textContent: " " + item.created_at,
    });

    contentElement.append(createdElement);
    elementWrap.append(contentElement);
    itemElement.append(imgElement);
    itemElement.append(elementWrap);
    $(".notification_main_section").append(itemElement);
  });
});
