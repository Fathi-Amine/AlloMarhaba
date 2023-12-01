const socketio = require("socket.io");

function initializeSocket(server) {
    const io = socketio(server, {
        cors: {
            origin: "http://localhost:3000", // Adjust the origin to match your frontend URL
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("joinRestaurantRoom", (restaurantId) => {
            socket.join(`restaurant_${restaurantId}`);
            console.log(
                `Socket ${socket.id} joined room restaurant_${restaurantId}`
            );
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });

    return io;
}

module.exports = { initializeSocket };