/**
 * Prevent the code to use `EmberObject.extend` favoring the ES6 native class `extends`
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const REPORT_MESSAGE = "Extend using ES6 class syntax";

module.exports = {
  meta: {
    docs: {
      description:
        "disallow EmberObject.extend usage favoring ES6 class extends",
      category: "Stylistic Issues",
      recommended: false
    },
    reportMessage: REPORT_MESSAGE
  },
  create: function create(context) {
    function get(obj, path) {
      return path.split(".").reduce(function(currentObject, pathSegment) {
        return typeof currentObject == "undefined" || currentObject === null
          ? currentObject
          : currentObject[pathSegment];
      }, obj);
    }

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
