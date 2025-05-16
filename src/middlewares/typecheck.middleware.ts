import { Request, Response, NextFunction } from "express";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

export function typecheckMiddleware<T>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoObject = plainToInstance(dtoClass, req.body);
      const errors = await validate(dtoObject as any);
      if (errors.length) {
        res.status(400).json(
          errors.map(e => ({
            property: e.property,
            constraints: e.constraints,
          }))
        );
        return;
      }
      next();
    } catch (error) {
      console.error('[type check middleware error]: ', error);
      next(error);
    }
  }
}
