import express from 'express';
import {NotesRouter} from "./routs/notes-router";
import {errorHandler} from './middlewares/errorHandling.middleware';

const app = express();

app.use(express.json());
app.use('/notes', new NotesRouter().router);
app.use(errorHandler);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
