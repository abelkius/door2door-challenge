/* eslint no-unused-vars: 0 */
export const apiErrorHandler = (error, req, res, next) => {
  console.error('Error: ', error.stack);
  console.info('res', res);
  res.status(500).send(error.message || error.toString());
};
