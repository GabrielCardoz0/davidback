import express from 'express';
import cors from "cors";
import env from 'dotenv';
import router from './routers/routers.js';

env.config();

const server = express();

server
    .use(express.json())
    .use(cors())
    .use(router);


server.listen(process.env.PORT || 3040, () => console.log(`Server start at port: ${process.env.PORT || 3040}`));