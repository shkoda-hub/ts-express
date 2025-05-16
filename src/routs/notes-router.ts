import { Router } from 'express'
import {NotesController} from "../controllers/notes-controller";
import {typecheckMiddleware} from "../middlewares/typecheck.middleware";
import {AddNoteRequestBody} from "../dto/create-note.dto";
import {UpdateNoteDto} from "../dto/update-node.dto";

export class NotesRouter {
  private readonly notesRouter: Router;
  private readonly controller: NotesController;

  constructor() {
    this.notesRouter = Router();
    this.controller = new NotesController();
    this.registerRoutes();
  }

  private registerRoutes() {
    this.notesRouter.get('/', this.controller.getAllNotes);
    this.notesRouter.get('/:id', this.controller.getNote);
    this.notesRouter.post('/', typecheckMiddleware(AddNoteRequestBody), this.controller.createNote);
    this.notesRouter.put('/:id', typecheckMiddleware(UpdateNoteDto), this.controller.updateNote);
    this.notesRouter.delete('/:id', this.controller.deleteNote);
  }

  public get router() {
    return this.notesRouter;
  }
}
