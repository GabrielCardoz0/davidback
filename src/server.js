import express from 'express';
import cors from "cors";
import env from 'dotenv';
import router from './routers/routers.js';

env.config();

const server = express();

server
    .use(express.json())
    .use(cors({ origin: '*' }))
    .use(router);


<<<<<<< HEAD
server.listen(process.env.PORT || 3040, () => console.log(`Server start at port: ${process.env.PORT || 3040}`));
=======
server.listen(process.env.PORT || 3040, () => console.log(`Server start at port: ${process.env.PORT || 3040}`));
>>>>>>> 738560f863fc330f36e3784a170ee056f866d314
