"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/errors.ts
var errors_exports = {};
__export(errors_exports, {
  default: () => errors_default
});
module.exports = __toCommonJS(errors_exports);
var CustomErrors = class {
  /**
   * Retrieves a structured error object based on a given result message.
   *
   * @param resultMessage - The error message to look up.
   * @returns An object containing the error details, including result codes,
   *          detailed messages, and additional metadata. If the error is not
   *          found, a default "unknown error" response is returned.
   *
   * @example
   * ```typescript
   * const error = CustomErrors.getError("game not found");
   * console.log(error);
   * // {
   * //   resultCode: -1,
   * //   resultMessage: "game not found",
   * //   resultMessageLarge: "The provided game ID was not found. Have you entered the proper client configuration?",
   * //   result: null,
   * //   version: "4831_live"
   * // }
   * ```
   */
  static getError(resultMessage) {
    const error = this.errors[resultMessage];
    return {
      resultCode: error ? error.resultCode : -1,
      resultMessage,
      resultMessageLarge: error ? error.resultMessageLarge : "Unknown error",
      result: error ? error.result : null,
      version: "4831_live"
      // I don't really know if the real API version changes, so as of now I'll keep it like this.
    };
  }
};
/**
 * A map of predefined errors, keyed by their result messages, providing
 * additional details such as result codes and detailed error descriptions.
 */
CustomErrors.errors = {
  "game not found": {
    resultCode: -1,
    resultMessageLarge: "The provided game ID was not found. Have you entered the proper client configuration?",
    result: null
  },
  "user not found": {
    resultCode: -1,
    resultMessageLarge: "The provided user ID was not found. Have you entered the proper client configuration?",
    result: null
  }
};
var errors_default = CustomErrors;
//# sourceMappingURL=errors.js.map