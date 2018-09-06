export class SystemError extends Error {
  name = "SystemError";
  type = "system";
}

export class BusinessError extends Error {
  name = "BusinessError";
  type = "business";
}

export class HttpSystemError extends SystemError {
  name = "HttpSystemError";
  constructor(request, response, message) {
    super(message);
    this.request = request;
    this.response = response;
  }
}

export class HttpBusinessError extends BusinessError {
  name = "HttpBusinessError";
  constructor(request, response, message) {
    super(message);
    this.request = request;
    this.response = response;
  }
}
