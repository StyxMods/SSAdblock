// ==UserScript==
// @name        ShellShock.io adblocker
// @namespace   Violentmonkey Scripts
// @match       *://shellshock.io/*
// @version     1.0
// @author      https://github.com/StyxMods/SSAdblock
// @description Block ads on shellshock.io
// @license     GPL-3.0
// @updateURL   https://raw.githubusercontent.com/StyxMods/SSAdblock/master/Mod.js
// ==/UserScript==

/**
 * AdBlock
 * AdBlock for ShellShock.io mods.
 */
(function () {
  const modBaseVersion = 2;
  const styxURLS = {
    SSI: "https://raw.githubusercontent.com/Char0nStyx/SSI/master/SSI.js",
    VNL: "https://raw.githubusercontent.com/Char0nStyx/VNL/master/VNL.js",
  };
  console.log(`using ModBase version ${modBaseVersion}`);
  /**
   * fetches text from a remote URL. Use the return result of this
   * with eval to import a script.
   * @param {String} url URL of the remote source
   * @returns {String} the fetched text
   */
  function fetchScript(url) {
    var rReq = new XMLHttpRequest();
    rReq.open("GET", url, false);
    rReq.send();
    const status = rReq.status;
    if (!status === 200) {
      console.error(`ModBase: Error: Couldn't fetch script at ${url}!`);
      return null;
    }
    const script = rReq.responseText;
    return script;
  }
  eval(fetchScript(styxURLS.SSI));
  eval(fetchScript(styxURLS.VNL));
  loadVN();
  window.abf = function (input) {
    if (typeof input == "boolean") {
      return true;
    } else if (input == 10) {
      return 5;
    } else if (input == "adsBlocked") {
      return false;
    }
  };

  function inject(inj) {
    const FUNCTIONPARAM = new RegExp(
      "function " + f(H._connectFail) + "\\(([a-zA-Z$_]+)\\)",
    ).exec(js)[1];
    inj(
      "adsBlocked=" + FUNCTIONPARAM,
      "adsBlocked=" + window.abf + '("adsBlocked")',
    );
    inj('"user-has-adblock"', window.abf + '("user-has-adblock")');
    inj("layed=!1", "layed=window." + window.abf + "(!1)");
    inj("showAdBlockerVideo", "hideAdBlockerVideo");
    inj(
      VN.USERDATA + ".playerAccount.isUpgraded()",
      window.abf + "(" + f(VN.USERDATA) + ".playerAccount.isUpgraded())",
    );
  }
})();
