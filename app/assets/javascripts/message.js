$(function(){
  function buildHTML(message) {
    if (message.image) {
      var html =
       `<div class="main__message">
          <div class="main__message__box__top">
            <p class="main__message__box__top__name">
              ${message.user_name}
            </p>
            <p class="main__message__box__top__time">
              ${message.created_at}
            </p>
          <div class"main__message__box__text">
            <p class="main__message__box__text__content">
              ${message.content}
            </p>
            <img src=${message.image} class="main__message__box__text__image">
          </div>
        </div>`
      return html;
    } else {
      var html = 
      `<div class="main__message">
        <div class="main__message__box">
          <p class="main__message__box__name">
            ${message.user_name}
          </p>
          <p class="main__message__box__time">
            ${message.created_at}
          </p>
          <p class="main__message__box__message">
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
});