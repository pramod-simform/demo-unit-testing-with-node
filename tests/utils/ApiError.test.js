const ApiError = require('../../src/utils/ApiError');

describe('ApiError test suite:', () => {
  let sut;

  beforeEach(() => {
    sut = ApiError;
  });

  it('should instance of the class.', () => {
    const result = new sut();

    expect(result).toBeInstanceOf(ApiError);
  });

  it('should match the error message and status code for 500.', () => {
    const message = 'Something went wrong!';
    const expectedMessage =
      'An unexpected error has occurred. To solve the issue, contact the person responsible for your Server.';

    let result = new sut(500, message);

    expect(result.message).toBe(expectedMessage);
  });

  it('should match the error message of JWT and status code for 500.', () => {
    const message = 'jwt expired';
    const expectedMessage = 'Your session has expired. Please login again.';

    let result = new sut(500, message);

    expect(result.message).toBe(expectedMessage);
  });

  it('should match the error message if status code is other than 500.', () => {
    const expectedMessage = 'Error message!.';

    let result = new sut(400, expectedMessage);

    expect(result.message).toBe(expectedMessage);
  });

  it('should match the error message and message dev blank if message_dev not passed and status code is not equal to 500.', () => {
    const expectedMessage = 'Error message!.';

    let result = new sut(400, expectedMessage);

    expect(result.message).toBe(expectedMessage);
    expect(result.message_dev).toBe('');
  });

  it('should match the error message and message dev and status code is not equal to 500.', () => {
    const expectedMessage = 'Error message!.';
    const expectedMessageDev = 'Dev error message!.';

    let result = new sut(400, expectedMessage, expectedMessageDev);

    expect(result.message).toBe(expectedMessage);
    expect(result.message_dev).toBe(expectedMessageDev);
  });

  it('should set the isOperational value if passed.', () => {
    const message = 'Error message!.';
    const messageDev = 'Dev error message!.';

    const error = new sut(500, message, messageDev, false);

    expect(error.isOperational).toBe(false);
  });

  it('should set the stack value if passed.', () => {
    const message = 'Error message!.';
    const messageDev = 'Dev error message!.';
    const errorStack = {
      key: 'value',
    };

    const error = new sut(500, message, messageDev, false, errorStack);

    expect(error.stack).toEqual(errorStack);
  });
});
