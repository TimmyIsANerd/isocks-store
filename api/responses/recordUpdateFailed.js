/**
 * recordUpdateFailed.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.recordUpdateFailed();
 *     // -or-
 *     return res.recordUpdateFailed(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'recordUpdateFailed'
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

module.exports = function recordUpdateFailed(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  return res.status(500).json({
    message: "Internal Server Error",
    error: optionalData
      ? optionalData
      : "Failed to update resource. Please try again later.",
  });
};
