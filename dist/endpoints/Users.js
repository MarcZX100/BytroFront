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

// src/endpoints/Users.ts
var Users_exports = {};
__export(Users_exports, {
  UserApi: () => UserApi
});
module.exports = __toCommonJS(Users_exports);
var UserApi = class {
  /**
   * Creates an instance of the UserApi class.
   * @param {Record<string, any>} apiClient - The API client instance used to send requests.
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.defaultUserOptionsArray = ["username", "avatarURL", "regTstamp", "alliance", "rankProgress", "gameStats"];
    this.allUserOptionsArray = ["acl", "alliance", "allianceInvites", "allianceMemberShip", "askForEmail", "askForPassword", "avatarURL", "country", "deletionStatus", "email", "emailChangeRequest", "inventory", "isPaying", "battlePassProgress", "lastOfferPurchaseTimeSeconds", "links", "minModVersion", "notifications", "pushNotificationPreferences", "rank", "rankProgress", "referrer", "regTstamp", "shopPlatform", "showSocialMediaButtons", "isAllowedToShowStoreLinks", "sources", "subscriptions", "unreadMessages", "useFastPaypalCheckout", "username", "useShop2017", "canAdjustEmail", "shouldDisableInGameUserRegistration", "canUseInventorySystem", "publisherID", "qualityMatchAdsSupport", "useFirefly", "mayUseGgsShopWithoutPaymentMethods", "stats", "scenarioStats", "awardProgress", "gameStats"];
    this.rankingOptionsArray = ["monthRank", "weekRank", "globalRank", "highestMonthRank", "highestWeekRank", "lastMonthRank", "lastWeekRank"];
  }
  /**
   * Retrieves detailed information for a specific user by their user ID.
   * Allows for the selection of specific properties to retrieve.
   * 
   * @param {number} userID - The unique identifier of the user.
   * @param {string[]} [options=this.defaultUserOptionsArray] - Optional list of user properties to include in the response.
   * @returns {Promise<any>} - A promise resolving to the user details, including the requested properties.
   */
  getDetails(_0) {
    return __async(this, arguments, function* (userID, options = this.defaultUserOptionsArray) {
      const startTime = Date.now();
      const data = { userID };
      if (Array.isArray(options)) {
        options.forEach((option) => {
          if (this.allUserOptionsArray.includes(option)) {
            data[option] = 1;
          } else {
            console.warn(`The "${option}" option does not exist.`);
          }
        });
      }
      const result = yield this.apiClient.sendRequest("getUserDetails", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Searches for a user by their username.
   * Optionally allows for an exact match search.
   * 
   * @param {string} username - The username to search for.
   * @param {boolean} [exactResult=false] - Flag to indicate whether the search should return only an exact match.
   * @returns {Promise<any>} - A promise resolving to the search results.
   */
  search(username, exactResult = false) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const data = {
        username
      };
      const result = yield this.apiClient.sendRequest("searchUser", data);
      if (exactResult) {
        if (result.result.find((x) => x.username.toLowerCase() == username.toLowerCase())) {
          result.result = [result.result.find((x) => x.username.toLowerCase() == username.toLowerCase())];
        } else {
          result.resultCode = -1;
          result.resultMessage = "not found";
        }
      }
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Sends a private message (PM) to a user.
   * 
   * @param {number} targetUserID - The user ID of the recipient.
   * @param {string} subject - The subject of the message.
   * @param {string} body - The body/content of the message.
   * @returns {Promise<any>} - A promise resolving to the result of the message sending request.
   */
  sendMail(targetUserID, subject, body) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      const data = {
        receiverID: targetUserID,
        subject,
        body,
        mode: "pm"
      };
      const result = yield this.apiClient.sendRequest("sendMessage", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
  /**
   * Retrieves a ranking list based on a specified ranking type.
   * Allows pagination and selection of the number of entries to return.
   * 
   * @param {string} [type="globalRank"] - The type of ranking to fetch. Types allowed: "monthRank", "weekRank", "globalRank", "highestMonthRank", "highestWeekRank", "lastMonthRank", "lastWeekRank".
   * @param {number} [page=0] - The page number for pagination.
   * @param {number} [numEntries=10] - The number of entries to retrieve per page.
   * @returns {Promise<any>} - A promise resolving to the ranking data for the selected type.
   */
  getRanking(type = "globalRank", page = 0, numEntries = 10) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      if (numEntries > 50) {
        console.warn("The maximum number of entries allowed is 50.");
      } else if (numEntries < 5) {
        console.warn("The minimum number of entries allowed is 5.");
      }
      const data = {
        type,
        page,
        numEntries
      };
      if (!this.rankingOptionsArray.includes(type)) {
        return {
          resultCode: -1,
          resultMessage: "incorrect option",
          result: `The ${type} type does not exist.`,
          elapsedTime: Date.now() - startTime,
          receivedData: data
        };
      }
      const result = yield this.apiClient.sendRequest("getRankingFirefly", data);
      result.elapsedTime = Date.now() - startTime;
      return result;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserApi
});
//# sourceMappingURL=Users.js.map