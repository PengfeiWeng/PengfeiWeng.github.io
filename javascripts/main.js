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
                this.targetSource = null;
                this.targetOrigin = null;
            }
            OAuthRedirectHandler.prototype.start = function () {
                var _this = this;
                window.onload = function () {
                    // Listen to the senders
                    window.addEventListener("message", function (e) { return _this.receiveMessage(e); });
                    // Detect the response from thirdparty. When receiver accepts the response, it will send it back to the iFrame.
                    if (window.location.search) {
                        console.log("Response is: " + window.location.href);
                        window.opener.postMessage("Res=" + window.location.href, 'https://' + window.opener.location.host);
                        //window.close();
                    }
                };
            };
            OAuthRedirectHandler.prototype.receiveMessage = function (event) {
                if (this.verifySender(event.origin) !== true)
                    return;
                if (event.data.substring(0, 4) !== "Res=") {
                    this.targetSource = event.source;
                    this.targetOrigin = event.origin;
                    this.popUpWindow(event.data, 550, 530);
                }
                else {
                    console.log("In Iframe Response is: " + event.data.substring(4));
                    console.log(this.targetSource);
                    console.log(this.targetOrigin);
                    if (this.targetSource && this.targetOrigin) {
                        console.log("Sending back!");
                        this.targetSource.postMessage(event.data.substring(4), this.targetOrigin);
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
