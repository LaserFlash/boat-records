import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const FieldValue = require('firebase-admin').firestore.FieldValue;

exports.createProfile = functions.auth.user()
  .onCreate((userRecord, context) => {
    admin.auth().getUser(userRecord.uid)
      .then(function(userData) {
        console.log("Successfully fetched user data:", userData.toJSON());
        return admin.database().ref(`/userProfile/${userData.uid}`).set({
          email: userData.email,
          name: userData.displayName,
          role: "user"
        });
      })
      .catch(function(error) {
        console.log("Error fetching user data:", error);
      });
  });

exports.updateUserClaims = functions.database.ref('/userProfile/{uid}/role').onWrite((snapshot, context) => {
  const role = snapshot.after.val();
  console.log("Updating custom claims: ", role);
  if (role === 'admin') {
    return admin.auth().setCustomUserClaims(context.params.uid, { admin: true });
  }
  return admin.auth().setCustomUserClaims(context.params.uid, { admin: false })
});
