/**
 * Prevent the code to use `EmberObject.extend` favoring the ES6 native class `extends`
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const { get, getRuleMeta } = require("../helpers/util");

const REPORT_MESSAGE = "Extend using ES6 class syntax";

module.exports = {
  meta: getRuleMeta(
    REPORT_MESSAGE,
    "disallow EmberObject.extend usage favoring ES6 class extends"
  ),

  create: function create(context) {
    function startsWithUpperCase(word) {
      return /^[A-Z]/.test(word);
    }

    function checkForObjectExtend(node) {
      const objectName = get(node, "callee.object.name");
      const propName = get(node, "callee.property.name");
      if (propName === "extend" && startsWithUpperCase(objectName)) {
        context.report(
          node,
          get(context, "meta.reportMessage") || REPORT_MESSAGE
        );
      }
    }
    return { CallExpression: checkForObjectExtend };
  }
};
