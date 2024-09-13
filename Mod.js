/**
 * ModBase
 * base for ShellShock.io mods.
 * add your code and wrap this into a tampermonkey script and you're ready to go!
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
})();
