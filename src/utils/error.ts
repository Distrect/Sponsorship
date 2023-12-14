import { HttpException, HttpStatus } from '@nestjs/common';

interface IFieldError {
  field: string;
  errorMessage: string;
}

export class FormFieldError extends HttpException {
  public fields: IFieldError[];

  constructor(message: string = 'Form has errors', fields: IFieldError[]) {
    super(message, HttpStatus.BAD_REQUEST);
    this.fields = fields;
  }
}

export class AuthorizationError extends HttpException {
  constructor() {
    super(
      'You sir, are unauthorized. Please leave or face the consequences',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class ServerError extends HttpException {
  constructor(
    message: string = 'A Server Error Has Occured. Please Try Again Later',
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class UserNotFoundError extends HttpException {
  constructor(message: string = 'The Thing You Looking For is Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class NotFound extends HttpException {
  constructor(message: string = 'The Thing You Are Looking For Is Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class HasActiveNeedGroupError extends Error {
  constructor() {
    super('The Child has Active Needs. You Cannot Create New Need Group');
  }
}

export class IsNotActiveGroup extends Error {
  constructor(message: string = 'The Need Group is Not Active') {
    super(message);
  }
}

export class EmptyData extends HttpException {
  constructor(message: string = 'Data is Empty') {
    super(message, HttpStatus.NO_CONTENT);
  }
}

export class AlreadyHave extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
