import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

//file imports
import connectDB from './config/connectdb.js'
import authRouter from './routes/authRoute.js';
import messageRouter from './routes/messageRoute.js';

const app = express();  

//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)


const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Server is running');
})

app.listen(port, () => {
    console.log('Server is running on port:', port);
});

