function get(obj, path) {
  return path.split(".").reduce(function(currentObject, pathSegment) {
    return typeof currentObject == "undefined" || currentObject === null
      ? currentObject
      : currentObject[pathSegment];
  }, obj);
}

function getRuleMeta(
  reportMessage = "",
  description = "",
  category = "Stylistic Issues"
) {
  return {
    docs: {
      description,
      category,
      recommended: false
    },
    reportMessage
  };
}

module.exports = {
  get,
  getRuleMeta
};
