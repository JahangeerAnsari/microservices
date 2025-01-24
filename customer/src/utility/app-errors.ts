export const STATUS_CODES = {
    CREATED:201,
    CONFLICT:409,
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
} as const;
export type StatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
export class AppError extends Error {
  public statusCode: StatusCode | undefined;
  public isOperational: boolean | undefined;
  public errorStack?: string;
  public logError?: boolean;
  constructor(
    name: string,
    statusCode: StatusCode,
    description: string,
    isOperational: boolean,
    errorStack?: string,
    logError?: boolean
  ) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errorStack = errorStack;
      this.logError = logError;
      Error.captureStackTrace(this);
  }
}

// API SPECIFIC ERROR
export class APIError extends AppError {
  constructor(
    name: string,
    statusCode: StatusCode = STATUS_CODES.INTERNAL_ERROR,
    description: string = "Internal Server Error",
    isOperational: boolean = true
  ) {
      super(name, statusCode, description, isOperational);
  }
}
// 400 - Bad Request
export class BadRequestError extends AppError {
  constructor(description: string = "Bad Request", logError?: boolean) {
    super(
      "Bad Request",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      undefined,
      logError
    );
  }
}
export class CreatedResponse extends AppError {
  constructor(description: string = "Resource Created Successfully") {
    super("Created", STATUS_CODES.CREATED, description, true);
  }
}
export class NotFoundError extends AppError {
  constructor(description: string = "Resource Not Found") {
    super("Not Found", STATUS_CODES.NOT_FOUND, description, true);
  }
}
export class ConflictError extends AppError {
  constructor(description: string = "Resource already exists") {
    super("Conflict", STATUS_CODES.CONFLICT, description, true);
  }
}