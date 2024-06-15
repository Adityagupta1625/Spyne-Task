class HttpException extends Error {
  errorCode: number

  constructor(
    errorCode: number,
    public readonly message: string | any
  ) {
    super(message ?? "Internal Server Error")
    this.errorCode = errorCode ?? 500
  }
}

export default HttpException
