import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import postsRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

//TO PROPERLY SEND OUR REQUESTS AND WE ALSO LIMIT THE SIZE AS WE NEED TO SEND THE IMAGES TO THE DATABASE
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

//Routes
app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => app.listen(PORT, () => console.log(`Server is running on port: ${PORT} && connected to MongoDB`)))  
    .catch((error) => console.log(error.message)
);