function Chat(socket) {
  this.socket = socket;
}

Chat.prototype.sendMessage = function (room, text) {
  var message = {
    room: room,
    text: text
  };
  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function (room) {
  this.socket.emit('join', {
    newRoom: room
  });
};

Chat.prototype.processCommand = function (command) {
  var words = command.split(' '),
      command = words[0].substring(1, words[0].length).toLowerCase(),
      message = false;

  switch (command) {
    case 'join':
      words.shift();
      var room = words.join(' ');
      this.changeRoom(room);
      return;
    case 'nick':
      words.shift();
      var name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      return;
    default:
      message = 'Unrecognized command.';
      return;
  }

  return message;
};

