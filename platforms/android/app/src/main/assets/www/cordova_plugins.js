cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "com.borismus.webintent.WebIntent",
    "file": "plugins/com.borismus.webintent/www/webintent.js",
    "pluginId": "com.borismus.webintent",
    "clobbers": [
      "WebIntent"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com.borismus.webintent": "1.1.0",
  "cordova-plugin-statusbar": "2.3.0",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});