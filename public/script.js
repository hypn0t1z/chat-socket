const socket = io('http://localhost:5001');
const id = socket.id;
let nickname = '';
while (!nickname) {
    nickname = prompt('Enter your nickname: ');
}
socket.emit('new-user', nickname);
$('#chat-input').keypress((event) => {
    if (event.which === 13) {
        const message = $('#chat-input').val();
        if (message) {
            socket.emit('chat', message);
            $('#chat-input').val('');
        }
    }
})

$('#send-button').click(() => {
    console.log('clicked');
    const message = $('#chat-input').val();
    if (message) {
        socket.emit('chat', message);
        $('#chat-input').val('');
    }
});

socket.on('joined', data => {
    let check = data.id == socket.id;
    $('#content').append(`<div class="text-center my-4"><small class="text-muted">
        <i>${check ? 'You' : data.nickname} has joined group</i>
        </small><div>`);
})

socket.on('chat', (data) => {
    let check = data.id == socket.id;
    $('#content').append(`<div class="my-4">
                              <div class="${check ? 'float-right bg-info text-white rounded' : 'float-left bg-secondary text-white rounded'} p-2">
                                <span>${check ? '' : '<b>'+data.nickname+'</b>: '}${data.message}</span>    
                              </div>
                            </div>
                            <br>`);
})