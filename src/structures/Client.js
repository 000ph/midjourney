const { default: axios } = require("axios");
const { MODEL_VERSION } = require("../util/constants");
const constants = require("../util/constants");
const timers = require("node:timers/promises");

class MidjourneyClient {
  constructor() {
    this.version = constants.MODEL_VERSION;
    this.name = constants.MODEL_NAME;
    this.baseUri = "https://replicate.com";
    this.defaultOptions = constants.DEFAULT_OPTIONS;
  }
  /**
   *
   * @returns {Promise<string>}
   */
  async getAccessToken() {
    const res = await axios.get(`${this.baseUri}/${this.name}`);
    const setCookieString = res.headers["set-cookie"][0];
    const csrfTokenRegex = /^csrftoken=(.{32})/;
    const [_input, token] = setCookieString.match(csrfTokenRegex);
    return token;
  }
  /**
   *
   * @param {string} token
   * @param {import("../types/Request").PromptOptions} options
   * @returns {Promise<string[]>}
   */
  async predict(token, options) {
    const ENDPOINT = `${this.baseUri}/api/models/${this.name}/versions/${MODEL_VERSION}/predictions`;

    const res = await axios.post(
      ENDPOINT,
      {
        inputs: { ...this.defaultOptions, ...options },
      },
      { withCredentials: true, headers: { "x-csrftoken": token } }
    );

    const { uuid } = res.data;

    for (
      let timeoutCounter = 0;
      timeoutCounter < constants.TIMEOUT;
      timeoutCounter++
    ) {
      const tempResponse = await axios.get(`${ENDPOINT}/${uuid}`, {
        headers: {
          accept: "*/*",
        },
      });

      let output = tempResponse?.data?.prediction?.output;
      if (output && output.length) {
        return output;
      }

      await timers.setTimeout(1000);
    }
    return [];
  }
  /**
   *
   * @param {*} token
   * @param {import("../types/Request").PromptOptions} options
   */
  async imagine(options) {
    const token = await this.getAccessToken();
    const prediction = await this.predict(token, options);

    return prediction;
  }
}

module.exports = MidjourneyClient;
