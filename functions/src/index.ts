
import admin from "firebase-admin";
import { beforeUserCreated } from "firebase-functions/v2/identity";
import { onValueWritten } from "firebase-functions/v2/database";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

export const createProfile = beforeUserCreated((event) => {
    const user = event.data;

    logger.log("Creating User Profile: ", user)

    return admin.database().ref(`/userProfile/${user.uid}`).set({ email: user.email, name: user.displayName, role: "user" });
});

export const updateUserClaims = onValueWritten("/userProfile/{uid}/role", (event) => {
    const role = event.data.after.val();
    const uid = event.params.uid

    logger.log("Updating custom claims: ", { uid, role })

    if (role === "admin") return admin.auth().setCustomUserClaims(uid, { admin: true });
    return admin.auth().setCustomUserClaims(uid, { admin: false });

});
