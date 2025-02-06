import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

//Set up the router here


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
