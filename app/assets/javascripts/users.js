$(function() {

  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
    `;
    $("#user-search-result").append(html);
  }

  function appendMemberList(name, user_id) {
    var html = `
    <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
      <input name='group[user_ids][]' type='hidden' value=${ user_id }>
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
    </div>
    `;
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users)
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else if (input.length == 0){
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
  $(function() {
    $(document).on('click', '.user-search-add', function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendMemberList(name, user_id)
    })

    $(document).on('click', '.user-search-remove', function(){
      $(this).parent().remove();
    });
  })
});