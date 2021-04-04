/* eslint-disable func-names */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-extend-native */
module.exports.format = function () {
  if (!String.prototype.format) {
    String.prototype.format = function () {
      const args = arguments;
      return this.replace(/{(\d+)}/g, (match, number) => (typeof args[number] !== 'undefined'
        ? args[number]
        : match));
    };
  }
};
