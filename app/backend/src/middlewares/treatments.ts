import { ErrorRequestHandler } from 'express';

const Treatments: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error.statusResponse) {
    return response.status(error.statusResponse).json({ message: error.message });
  }
  return response.status(500).json({ message: error.message });
};

export default Treatments;
