export default class AppError {
  readonly message: string
  readonly statusCode: number

  constructor(msg: string = "Ops! Erro inesperado.", code: number = 400) {
    this.message = msg
    this.statusCode = code
  }
}
