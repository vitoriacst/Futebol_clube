export default class Errors extends Error {
  public statusResponse: number;

  constructor(statusResponse: number, message: string) {
    super(message);
    this.statusResponse = statusResponse;
  }
}
