//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
var powerbi;
(function (powerbi) {
    var thirdParty;
    (function (thirdParty) {
        var constants;
        (function (constants) {
            //export var defaultWindowWidth: number = 600;
            //export var defaultWindowHeight: number = 480;
            constants.autherizedDomains = ['portal.analysis.windows-int.net', 'preview.powerbi.com', 'analysis.windows.net', 'analysis.windows-int.net'];
        })(constants = thirdParty.constants || (thirdParty.constants = {}));
    })(thirdParty = powerbi.thirdParty || (powerbi.thirdParty = {}));
})(powerbi || (powerbi = {}));
//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
/// <reference path="constants.ts" />
var powerbi;
(function (powerbi) {
    var thirdParty;
    (function (thirdParty) {
        var OAuthRedirectHandler = (function () {
            function OAuthRedirectHandler() {
                this.autherizedDomains = thirdParty.constants.autherizedDomains;
            }
            OAuthRedirectHandler.prototype.start = function () {
                var _this = this;
                window.onload = function () {
                    // Listen to the senders
                    window.addEventListener("message", function (e) { return _this.receiveMessage(e); });
                };
            };
            OAuthRedirectHandler.prototype.receiveMessage = function (event) {

                //if (this.verifySender(event.origin) !== true || event.data !== "Request")
                //    return;
                console.log("Will send back message");
                if (window.location.search) {
                    console.log("sending back message");
                    event.source.postMessage(window.location.href, event.origin);
                    //window.close();
                }
            };
            OAuthRedirectHandler.prototype.verifySender = function (origin) {
                var hasAuthorization = false;
                var normalizedOrigin = origin.toLowerCase();
                var originLength = origin.length;
                for (var i = 0; i < this.autherizedDomains.length; i++) {
                    var domainLength = this.autherizedDomains[i].length;
                    if (normalizedOrigin.substring(originLength - domainLength) === this.autherizedDomains[i].toLowerCase()) {
                        hasAuthorization = true;
                        break;
                    }
                }
                return hasAuthorization;
            };
            return OAuthRedirectHandler;
        })();
        thirdParty.OAuthRedirectHandler = OAuthRedirectHandler;
    })(thirdParty = powerbi.thirdParty || (powerbi.thirdParty = {}));
})(powerbi || (powerbi = {}));
//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
(function () {
    var receiver = new powerbi.thirdParty.OAuthRedirectHandler();
    receiver.start();
})();
