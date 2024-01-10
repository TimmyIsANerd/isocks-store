/**
 * recordCreationFailed.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.recordCreationFailed();
 *     // -or-
 *     return res.recordCreationFailed(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'recordCreationFailed'
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

module.exports = function recordCreationFailed(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  return res.status(500).json({
    message: "Internal Server Error",
    error: optionalData ? optionalData : "Record Creation failed due to a server side error",
  });
};
