require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const swaggerJsdoc = require('./Config/swagger');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT;
const authRoutes = require('./Routes/AuthRoutes');
const userRoutes = require('./Routes/UserRoutes');
const mailRoutes = require('./Routes/MailRoutes');
const managaerRoutes = require('./Routes/ManagerRoutes');
const clientRoutes = require('./Routes/ClientRoutes');
const restaurantRoutes = require('./Routes/RestaurantRoutes');
const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./Database/connect');
const helmet = require('helmet');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const errorHandlerMiddleware = require('./Middlewares/errorHandler');
const http = require('http');
const server = http.createServer(app);
const { initializeSocket } = require("./socket");
const io = initializeSocket(server);
app.set("socketio", io);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(helmet());
app.use('/api/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/manager', managaerRoutes);
app.use('/api/client', clientRoutes);
app.use('/api', restaurantRoutes);

app.use(errorHandlerMiddleware);

// const Order = require('./Models/Order');
// Order.schema.post('findOneAndUpdate', function (doc) {
//     io.emit('orderStatusChanged', {  status: doc.status });
    
// });

// io.on('connection', (socket) => {
//     console.log('A client connected');
// });

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
