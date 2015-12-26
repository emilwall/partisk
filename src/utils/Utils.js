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
  },

  searchItem: function (option, value) {
    let text = option.name || option.title;
    // TODO: SLOW
    return text.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }
};

export default Utils;
