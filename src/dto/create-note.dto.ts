import {IsNotEmpty, IsString, validate} from "class-validator";

export class AddNoteRequestBody {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}

// (async () => {
//   const some = {
//     title: 'some',
//     content: 'test'
//   }
//
//   const dto = plainToInstance(AddNoteRequestBody, some);
//
//   const errors = await validate(dto);
//   console.log(errors);
// })()
