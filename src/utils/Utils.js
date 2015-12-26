import { navigateAction } from "fluxible-router";

const Utils = {
  decodeURL: function (url) {
    return decodeURIComponent(url.split("_").join(" "));
  },

  encodeURL: function (url) {
    return url.split(" ").join("_").toLowerCase();
  },

  navigate: function (name, params, context) {
    var url = context.getStore("RouteStore").makePath(name, params);
    context.executeAction(navigateAction, {
      method: "get",
      url: url
    });
  }
};

export default Utils;
