import {randomUUID} from "node:crypto";
import {Note} from "../dto/note.dto";
import {AddNoteRequestBody} from "../dto/create-note.dto";
import {UpdateNoteDto} from "../dto/update-node.dto";
import createHttpError from "http-errors";

export class NotesService {
  private readonly notes: Map<string, Note> = new Map();

  constructor() {
  }

  public async addNote(addNoteDto: AddNoteRequestBody) {
    const note: Note = {
      id: randomUUID(),
      title: addNoteDto.title,
      content: addNoteDto.content,
      createdAt: new Date().toISOString()
    }
    this.notes.set(note.id, note);
    return note;
  }

  public async getNote(id: string): Promise<Note | undefined> {
    const note = this.notes.get(id);

    if (!note) {
      throw new createHttpError.NotFound('Note not found');
    }

    return this.notes.get(id);
  }

  public async getNotes() {
    return Array.from(this.notes.values());
  }

  public async updateNote(id: string, noteDto: UpdateNoteDto): Promise<Note> {
    const note = this.notes.get(id);

    if (!note) {
      throw new createHttpError.NotFound('Note not found');
    }

    const keys = Object.keys(noteDto) as (keyof UpdateNoteDto)[];
    for (const key of keys) {
      const value = noteDto[key];
      if (value !== undefined) {
        note[key] = value;
      }
    }

    return note;
  }

  public async deleteNote(id: string): Promise<string> {
    const note = this.notes.get(id);

    if (!note) {
      throw new createHttpError.NotFound('Note not found');
    }

    this.notes.delete(id);
    return id;
  }
}
