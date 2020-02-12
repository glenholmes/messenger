function startChatting() {
    var username = $('#username').val();
    window.location.replace('/chat?' + username);
}

function sendMessage() {
    var path = window.location.href;
    var username = path.replace("http://localhost:1337/chat?", "");
    var message = $('#message').val();
    var url = "/messenger?username=" + username + "&message=" + message;
    $.post(url, function (data) {
        getMessages();
    });
}

function getMessages() {
    $.get("/messenger", function (data) {
        $('#comments').html("");
        $.each(data, function (i, message) {
            $('#comments').append('<div class="row" style="padding-top: 5px;"><div class="col-md-11 text-center"> '+
            '<div class="card"> <div class="card-body">'+message.message+
            '</div></div></div><div class="col-md-1 text-center"> <i cla'+
            'ss="far fa-user fa-2x" style="padding-top: 5px;"></i><br>'+
            message.username +'</div></div>');
        })
    });
}

setInterval(getMessages(), 1500);