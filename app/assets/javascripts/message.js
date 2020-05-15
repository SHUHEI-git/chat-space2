$(function(){
  function buildHTML(message) {
    if (message.image) {
      var html =
       `<div class="main__message" data-message-id=${message.id}>
          <div class="main__message__box__top">
            <p class="main__message__box__top__name">
              ${message.user_name}
            </p>
            <p class="main__message__box__top__time">
              ${message.created_at}
            </p>
          <div class="main__message__box__text">
            <p class="main__message__box__text__content">
              ${message.content}
            </p>
            <img src=${message.image} class="main__message__box__text__image">
          </div>
        </div>`
      return html;
    } else {
      var html = 
      `<div class="main__message" data-message-id=${message.id}>
        <div class="main__message__box__top">
          <p class="main__message__box__top__name">
            ${message.user_name}
          </p>
          <p class="main__message__box__top__time">
            ${message.created_at}
          </p>
        </div>
        <div class="main__message__box__text">
          <p class="main__message__box__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.new_message__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__messages').append(insertHTML);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});