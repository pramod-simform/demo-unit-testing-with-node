const httpMocks = require('node-mocks-http');
const ApiError = require('../../src/utils/ApiError');
const catchModelErrors = require('../../src/utils/catchModelErrors');

describe('catchModelErrors test suite:', () => {
  // should call the 'next' function with the error returned by 'fn' if 'fn' throws a non-ApiError error
  it("should call the 'next' function with the error returned by 'fn' if 'fn' throws a non-ApiError error", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const err = new Error('Something error!');

    const fn = jest.fn().mockRejectedValue(err);

    const middleware = catchModelErrors(fn);
    let x = await middleware(req, res, next);
    expect(next).toHaveBeenCalledWith(err);
  });

  it("should call the 'fn' function with the req, res, and next arguments", () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const fn = jest.fn();

    const middleware = catchModelErrors(fn);
    middleware(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
  });

  // should call the 'next' function with the error returned by 'fn' if 'fn' throws an error with code 11000 and keyPattern is empty
  it("should call the 'next' function with the error returned by 'fn' if 'fn' throws an error with code 11000 and keyPattern is empty", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const err = {
      code: 11000,
      keyPattern: {},
    };

    const fn = jest.fn().mockRejectedValue(err);

    const middleware = catchModelErrors(fn);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  // should call the 'next' function with the error returned by 'fn' if 'fn' throws an error with code different than 11000
  it("should call the 'next' function with the error returned by 'fn' if 'fn' throws an error with code different than 11000", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const err = {
      code: 500,
    };

    const fn = jest.fn().mockRejectedValue(err);

    const middleware = catchModelErrors(fn);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  // should call the 'next' function with the ApiError object if 'fn' throws an error with code 11000 and keyPattern is not empty
  it("should call the 'next' function with the ApiError object if 'fn' throws an error with code 11000 and keyPattern is not empty", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const err = {
      code: 11000,
      keyPattern: {
        name: 1,
      },
    };

    const fn = jest.fn().mockRejectedValue(err);

    const middleware = catchModelErrors(fn);
    await middleware(req, res, next);

    const expectedErrorMessage = 'Blog name has already been taken';
    const expectedError = new ApiError(400, expectedErrorMessage);

    expect(next).toHaveBeenCalledWith(expectedError);
  });

  // should not throw an error if 'fn' resolves without errors
  it("should not throw an error if 'fn' resolves without errors", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const fn = jest.fn().mockResolvedValue();

    const middleware = catchModelErrors(fn);
    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  // should return a function that returns a Promise
  it('should return a function that returns a Promise', () => {
    const fn = jest.fn();
    const middleware = catchModelErrors(fn);
    const result = middleware();
    expect(result).toBeInstanceOf(Promise);
  });
});
