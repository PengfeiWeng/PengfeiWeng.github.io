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
            constants.defaultWindowWidth = 600;
            constants.defaultWindowHeight = 480;
            constants.autherizedDomains = ['portal.analysis.windows-int.net', 'preview.powerbi.com', 'analysis.windows.net', 'analysis.windows-int.net', 'pengfeiweng.github.io'];
        })(constants = thirdParty.constants || (thirdParty.constants = {}));
    })(thirdParty = powerbi.thirdParty || (powerbi.thirdParty = {}));
})(powerbi || (powerbi = {}));
//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
/// <reference path="constants.ts" />
/*
    These codes will be executed in two places: iFrame window and pop-up redirect window.
    After user logs in, pop-up redirect window will send the response back to iFrame window.
    Then iFrame window will post it to the powerbi host page.
*/
var powerbi;
(function (powerbi) {
    var thirdParty;
    (function (thirdParty) {
        var OAuthRedirectHandler = (function () {
            function OAuthRedirectHandler() {
                this.autherizedDomains = thirdParty.constants.autherizedDomains;
                this.hostSource = null;
                this.hostOrigin = null;
                this.popedWindow = null;
            }
            OAuthRedirectHandler.prototype.start = function () {
                var _this = this;
                window.onload = function () {
                    // Listen to the host page.
                    window.addEventListener("message", function (e) { return _this.receiveMessage(e); });
                    // Detect the response from thirdparty to pop-up redirect window. 
                    // When pop-up redirect window receives the response, it will send it back to iFrame.
                    if (window.location.search) {
                        // To pop-up redirect window, window.opener will be the iFrame.
                        console.log("pop up send back " + window.location.href);
                        window.opener.postMessage("Res=" + window.location.href, 'https://' + window.opener.location.host);
                    }
                };
            };
            // Only iFrame window will run this function since nobody sends message to the pop-up window.
            OAuthRedirectHandler.prototype.receiveMessage = function (event) {
                
                if (this.verifySender(event.origin) !== true) {
                    console.log("Invalid sender");
                    return;
                }
                
                if (event.data.substring(0, 4) !== "Res=") {
                    // This message is from powerbi host window
                    this.hostSource = event.source;
                    this.hostOrigin = event.origin;
                    this.popedWindow = this.popUpWindow(event.data, 550, 530);
                }
                else {
                    // This message is from pop-up window
                    if (this.hostSource && this.hostOrigin) {
                        this.hostSource.postMessage(event.data.substring(4), this.hostOrigin);
                    }
                    if (this.popedWindow) {
                        this.popedWindow.close();
                    }
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
            OAuthRedirectHandler.prototype.popUpWindow = function (url, width, height) {
                if (!width) {
                    width = thirdParty.constants.defaultWindowWidth;
                }
                if (!height) {
                    height = thirdParty.constants.defaultWindowHeight;
                }
                var leftOffset = (window.outerWidth - width) / 2;
                leftOffset += window.screenX;
                var topOffset = (window.outerHeight - height) / 2;
                topOffset += window.screenY;
                // We are using /popupredirect.html to avoid the case that some browsers will block the pop-up window from a different domain.
                return window.open(url, '_blank', 'top=' + topOffset + ', left=' + leftOffset + ', screenX=' + leftOffset + ', screenY=' + topOffset + ', width=' + width + ', height=' + height + ', resizable=yes');
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
