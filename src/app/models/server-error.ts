export class ServerError {

  statusCode: Number;
  errorMessage: string;

  constructor(statusCode: number, errorMessage: string) {
      this.statusCode = statusCode;
      this.errorMessage = errorMessage;
  }
}
