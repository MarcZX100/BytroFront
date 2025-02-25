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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/endpoints/Alliances.ts
var Alliances_exports = {};
__export(Alliances_exports, {
  AllianceApi: () => AllianceApi
});
module.exports = __toCommonJS(Alliances_exports);
var AllianceApi = class {
  /**
   * Constructs a new instance of the `AllianceApi` class.
   * 
   * @param apiClient - The API client instance for sending requests.
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  /**
   * Retrieves detailed information about a specific alliance.
   * 
   * @param allianceID - The alliance's identifier.
   * @param members - Whether to include the list of alliance members in the response. Defaults to `true`.
   * @returns A promise resolving to the details of the specified alliance, including elapsed time.
   */
  getDetails(allianceID, members = true) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const data = {
        allianceID,
        members: members ? 1 : 0,
        invites: 0
      };
      const result = yield this.apiClient.sendRequest("getAlliance", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Retrieves battle statistics for a given alliance.
   * 
   * @param allianceID - The alliance's identifier.
   * @returns A promise resolving to the battle statistics of the specified alliance, including elapsed time.
   */
  getBattles(allianceID) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const data = {
        allianceID
      };
      const result = yield this.apiClient.sendRequest("getAllianceBattleStats", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Searches for alliances by name.
   * 
   * @param name - The name of the alliance to search for.
   * @param exactResult - Whether to return only exact matches for the alliance name. Defaults to `false`.
   * @returns A promise resolving to the search results, including elapsed time.
   * If `exactResult` is `true`, only exact matches are returned.
   * If no matches are found, the result code and message indicate "not found."
   */
  search(name, exactResult = false) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const data = {
        name
      };
      const result = yield this.apiClient.sendRequest("searchAlliance", data);
      if (exactResult) {
        const exactMatch = result.result.find(
          (x) => x.properties.name.toLowerCase() === name.toLowerCase()
        );
        if (exactMatch) {
          result.result = [exactMatch];
        } else {
          result.resultCode = -1;
          result.resultMessage = "not found";
        }
      }
      if (result.result.length === 0) {
        result.resultCode = -1;
        result.resultMessage = "not found";
      }
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Retrieves the alliance ranking, paginated by the specified page and number of entries.
   * 
   * @param page - The page of the ranking to retrieve. Defaults to `0`.
   * @param numEntries - The number of entries to retrieve per page. Defaults to `10`.
   *                     Must be between `10` and `50`. If out of range, a warning is logged.
   * @returns A promise resolving to the alliance ranking, including elapsed time.
   */
  getRanking(page = 0, numEntries = 10) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      if (numEntries > 50) {
        console.warn("The maximum number of entries allowed is 50.");
      } else if (numEntries < 10) {
        console.warn("The minimum number of entries allowed is 10.");
      }
      const data = {
        page,
        numEntries
      };
      const result = yield this.apiClient.sendRequest("getAllianceRanking", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Retrieves a list of open alliances. The result typically includes 30 alliances
   * that are not full, but the response cannot be further filtered.
   * 
   * @returns A promise resolving to the list of open alliances, including elapsed time.
   */
  getOpenAlliances() {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const data = {};
      const result = yield this.apiClient.sendRequest("getAlliances", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllianceApi
});
//# sourceMappingURL=Alliances.js.map