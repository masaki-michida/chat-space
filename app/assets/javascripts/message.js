$(function(){
  function buildHTML(message){
    if(message.image){
      var html = `<div class="main-chat__message-list__data" data-message-id=${message.id}>
                    <div class="main-chat__message-list__data__info">
                      <p class="main-chat__message-list__data__info__name">
                        ${message.user_name}
                      </p>
                      <p class="main-chat__message-list__data__info__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="main-chat__message-list__data__text">
                      ${message.body}
                    </p>
                    <img src=${message.image}>
                  </div>`
      return html;
    } else{
      var html = `<div class="main-chat__message-list__data" data-message-id=${message.id}>
                    <div class="main-chat__message-list__data__info">
                      <p class="main-chat__message-list__data__info__name">
                        ${message.user_name}
                      </p>
                      <p class="main-chat__message-list__data__info__date">
                        ${message.created_at}
                      </p>
                    </div>
                    <p class="main-chat__message-list__data__text">
                      ${message.body}
                    </p>
                  </div>`
      return html;
    }
  }

  function sendDisableFalse(){
    $('.main-chat__message-form__parts__send').prop('disabled', false);
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
    }).done(function(data){
        var html = buildHTML(data);
        $('.main-chat__message-list').append(html);
        $('form')[0].reset();
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
        sendDisableFalse();
    }).fail(function(){
        alert("メッセージの送信に失敗しました");
        sendDisableFalse();
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__data:last').data("message-id");
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
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if(document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }

});