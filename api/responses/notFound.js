/**
 * notFound.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.notFound();
 *     // -or-
 *     return res.notFound(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'notFound'
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

module.exports = function notFound(optionalData) {
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  sails.log.info("Ran custom response: res.notFound()");

  return res
    .status(404)
    .json({
      error: "Resource Not Found",
      message: optionalData ? optionalData : "iSocks Store API could not find that",
    });
};
