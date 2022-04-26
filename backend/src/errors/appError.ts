export default class AppError {
  readonly message: string
  readonly statusCode: number

  constructor(msg: string = "Unexpected error", code: number = 400) {
    this.message = msg
    this.statusCode = code
  }
}
