import {NotesService} from "../services/notes-service";
import {Request, Response} from "express";

export class NotesController {
  private readonly notesService: NotesService;

  constructor() {
    this.notesService = new NotesService();
  }

  public getAllNotes = async (
    request: Request,
    response: Response
  ) : Promise<void> => {
    const notes = await this.notesService.getNotes();
    response.json(notes);
  }

  public getNote = async (
    request: Request,
    response: Response
  ) : Promise<void> => {
    const note = await this.notesService.getNote(request.params.id);
    response.status(200).json(note);
  }

  public createNote = async (
    request: Request,
    response: Response
  ) : Promise<void> => {
    const note = await this.notesService.addNote(request.body);
    response.status(201).json(note);
  }

  public updateNote = async (
    request: Request,
    response: Response
  ) : Promise<void> => {
    const note = await this.notesService.updateNote(request.params.id, request.body);
    response.status(200).json(note);
  }

  public deleteNote = async (
      request: Request,
      response: Response
  ): Promise <void> => {
    const id = await this.notesService.deleteNote(request.params.id);
    response.status(204).json({ message: `Note ${id} was deleted` });
  }
}
