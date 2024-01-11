/**
 * emailinuse.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.emailAlreadyInUse();
 *     // -or-
 *     return res.emailAlreadyInUse(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'emailAlreadyInUse'
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

module.exports = function emailAlreadyInUse(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  sails.log.verbose("Ran custom response: res.emailinuse()");

  sails.log.error(`User already exists`);

  res.status(409).json({
    status: "Conflict Error",
    message: `${
      optionalData
        ? optionalData
        : "User with this emailAddress/Phone Number already Exists"
    }`,
  });
};
