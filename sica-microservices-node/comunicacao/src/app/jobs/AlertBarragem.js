const PORT = process.env.SERVER_PORT || 3334;
const
    io = require("socket.io"),
    server = io.listen(PORT);

var socket = server.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  // when socket disconnects, remove it from the list: 
});

export default {
  key: 'AlertBarragem',
  async handle({ data }) {
    await socket.emit('barragem', JSON.stringify(data));
	}
};



    
