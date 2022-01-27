const formatMessage = require('./../utils/formatDate')
const {
  getActiveUser,
  exitRoom,
  newUser,
  getIndividualRoomUsers
} = require('./../utils/userHelper');

module.exports =  function(io) {
   // this block will run when the client connects

io.on('connection', socket => {
  console.log('A user connected');

   socket.on('joinRoom', ({ username, room, photo }) => {
     //console.log(username, room, photo)
     const user = newUser(socket.id, username, room, photo);
     socket.join(user.room);
     // General welcome
 
     // Broadcast everytime users connects
     socket.broadcast
       .to(user.room)
       .emit(
         'notification', ` ${user.username} user is connected`);
  
     // Current active users and room name
     io.to(user.room).emit('roomUsers', {
       room: user.room,
       users: getIndividualRoomUsers(user.room)
     });
   });
 
   // Listen for client message
   socket.on('chatMessage', msg => {
     const user = getActiveUser(socket.id);
     io.to(user.room).emit('message', {user, msg});
   });
 
   // Runs when client disconnects
   socket.on('disconnect', () => {
     const user = exitRoom(socket.id);
 
     if (user) {
       io.to(user.room).emit(
         'notification',`${user.username} has left the room`);
 
       // Current active users and room name
       io.to(user.room).emit('roomUsers', {
         room: user.room,
         users: getIndividualRoomUsers(user.room)
       });
     }
   });
 });
}
