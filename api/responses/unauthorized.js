/**
 * unauthorized.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.unauthorized();
 *     // -or-
 *     return res.unauthorized(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'unauthorized'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function unauthorized(optionalData) {
  const res = this.res;
  const req = this.req;

  sails.log.verbose("Ran custom response: res.unauthorized()");

  optionalData &&
    sails.log.error(`${optionalData}`);

  return res.status(401).json({
    error:"Unauthorized",
    message:"Incorrect Password, Please confirm and try again"
  })
};
