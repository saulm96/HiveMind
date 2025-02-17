import express from 'express';
import dotenv from 'dotenv';
import router from "./routers/router.js"


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.use('/', router);

app.listen(3000, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
});

