"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserClaims = exports.createProfile = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const identity_1 = require("firebase-functions/v2/identity");
const database_1 = require("firebase-functions/v2/database");
const logger = __importStar(require("firebase-functions/logger"));
firebase_admin_1.default.initializeApp();
exports.createProfile = (0, identity_1.beforeUserCreated)((event) => {
    const user = event.data;
    logger.log("Creating User Profile: ", user);
    return firebase_admin_1.default.database().ref(`/userProfile/${user.uid}`).set({ email: user.email, name: user.displayName, role: "user" });
});
exports.updateUserClaims = (0, database_1.onValueWritten)("/userProfile/{uid}/role", (event) => {
    const role = event.data.after.val();
    const uid = event.params.uid;
    logger.log("Updating custom claims: ", { uid, role });
    if (role === "admin")
        return firebase_admin_1.default.auth().setCustomUserClaims(uid, { admin: true, systemAdmin: false });
    if (role === "system-admin")
        return firebase_admin_1.default.auth().setCustomUserClaims(uid, { admin: true, systemAdmin: true });
    return firebase_admin_1.default.auth().setCustomUserClaims(uid, { admin: false, systemAdmin: false });
});
//# sourceMappingURL=index.js.map