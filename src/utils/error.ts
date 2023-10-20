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
