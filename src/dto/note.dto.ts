import {Exclude, Expose} from "class-transformer";

@Exclude()
export class Note {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  createdAt!: string;
}
