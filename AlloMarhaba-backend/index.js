require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const swaggerJsdoc = require("./Config/swagger");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./Routes/AuthRoutes");
const userRoutes = require("./Routes/UserRoutes");
const mailRoutes = require("./Routes/MailRoutes");
const managaerRoutes = require("./Routes/ManagerRoutes");
const restaurantRoutes = require("./Routes/RestaurantRoutes");
const { urlencoded } = require("express");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./Database/connect");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');
    const socketId = socket.id;

    // Listen for 'sendNotification' event from the client
    // socket.on('sendNotification', (data) => {

    //     // Extract data received from the client
    //     const { senderName, message } = data;

    //     console.log(`Received notification from ${senderName}: ${message}`);
        
    //     // Emit the notification to the intended delivery person
    //     io.emit('notificationForDeliveryPersons', message);
    // });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api/", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/manager", managaerRoutes);
app.use("/api", restaurantRoutes);

app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectToDatabase(process.env.MONGODB_URI);

        server.listen(PORT, () => {
            console.log(`Listening to ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};


start();




