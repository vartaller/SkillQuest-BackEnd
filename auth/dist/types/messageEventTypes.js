"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEventTypes = void 0;
var MessageEventTypes;
(function (MessageEventTypes) {
    MessageEventTypes["UserRegistered"] = "user_registered";
    MessageEventTypes["UserLogged"] = "user_logged";
    MessageEventTypes["PasswordReset"] = "password_reset";
    MessageEventTypes["OrderCreated"] = "order_created";
})(MessageEventTypes || (exports.MessageEventTypes = MessageEventTypes = {}));
