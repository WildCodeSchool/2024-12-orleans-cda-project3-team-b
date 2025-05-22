export default class HttpError extends Error {
  title: string;
  status: number;

  constructor(title: string, message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
    this.title = title;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
