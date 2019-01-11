/**
 * Prevent the code to use `this.actionCall()` from the action `actionCall`
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { get, getRuleMeta } = require("../helpers/util");

function reportMessage(action = "") {
  return `Closure action '${action}' must not have same name as calling action '${action}'`;
}

module.exports = {
  meta: getRuleMeta(
    reportMessage,
    "Disallow closure actions to have same name as calling actions"
  ),

  create: function create(context) {
    function isActionProperty(node) {
      return (
        node &&
        get(node, "key.name") === "actions" &&
        get(node, "type") === "Property"
      );
    }

    function isFunctionProperty(node) {
      return (
        node &&
        get(node, "type") === "Property" &&
        get(node, "value.type") === "FunctionExpression"
      );
    }

    function isObjectExpression(node) {
      return node && get(node, "type") === "ObjectExpression";
    }

    function getActionName(node) {
      let current = node.parent;
      while (current) {
        if (
          isFunctionProperty(current) &&
          isObjectExpression(get(current, "parent")) &&
          isActionProperty(get(current, "parent.parent"))
        ) {
          return get(current, "key.name");
        }
        current = current.parent;
      }
      return "";
    }

    function isThisMemberExpression(node) {
      return (
        node &&
        get(node, "callee.type") === "MemberExpression" &&
        get(node, "callee.object.type") === "ThisExpression"
      );
    }

    function isTryInvokeExpression(node) {
      return node && get(node, "callee.name") === "tryInvoke";
    }

    function getCalleeName(node) {
      if (isThisMemberExpression(node)) {
        return get(node, "callee.property.name");
      } else if (isTryInvokeExpression(node)) {
        return get(node, "arguments.1.value");
      }
      return "";
    }

    return {
      CallExpression(node) {
        const calleeActionName = getCalleeName(node);
        if (calleeActionName) {
          const actionName = getActionName(node);
          if (actionName === calleeActionName) {
            context.report(node, reportMessage(actionName));
          }
        }
      }
    };
  }
};
