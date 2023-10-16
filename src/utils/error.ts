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
