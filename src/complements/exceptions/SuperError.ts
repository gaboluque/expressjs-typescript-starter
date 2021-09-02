export const SUPER_ERROR = 'SuperError';
class SuperError extends Error {
  code: number;

  type: string;

  constructor(message: string, code: number, type: string) {
    super(message);
    this.name = SUPER_ERROR;
    this.code = code;
    this.type = type;
  }
}

export default SuperError;
