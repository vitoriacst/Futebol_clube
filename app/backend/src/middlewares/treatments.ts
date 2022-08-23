import { ErrorRequestHandler } from 'express';

const Treatments: ErrorRequestHandler = async (error, _request, response, next) => {
  if (error.statusResponse) {
    response.status(error.statusResponse).json({ message: error.message });
    return next();
  }
  response.status(500).json({ message: error.message });
  return next();
};

export default Treatments;
