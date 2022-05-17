function connectWS() {
  const socket = new WebSocket('ws://127.0.0.1:8030/xq');

  socket.addEventListener('open', function (event) {
  });

  return socket;
}


(function() {
  const socket = connectWS();

  onDragMove = function(newLocation, oldLocation, source,
                        piece, position, orientation) {
    console.log('New location: ' + newLocation);
    console.log('Old location: ' + oldLocation);
    console.log('Source: ' + source);
    console.log('Piece: ' + piece);
    console.log('Position: ' + Xiangqiboard.objToFen(position));
    console.log('Orientation: ' + orientation);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    const msg = {
      event: 0,
      move: "abc"
    }

    socket.send(JSON.stringify(msg));
  }

  const config = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    onDragMove: onDragMove,
    ssparePieces: true
  };
  const board = Xiangqiboard('board', config);
  socket.addEventListener('message', function (event) {
    board.move('c3-c4');
  });
})()
