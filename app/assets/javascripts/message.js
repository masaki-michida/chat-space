$(function(){
  function buildHTML(message){
    if(message.image){
      var html = `<div class="main-chat__message-list__data">
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
      var html = `<div class="main-chat__message-list__data">
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
    console.log(url);
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
});