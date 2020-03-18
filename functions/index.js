const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

// TODO: 引数チェック強化
exports.deleteRecord = functions.https.onCall((data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.')
  }

  if (!(data.uid && data.recordId)) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.')
  }

  db
    .collection('users').doc(data.uid)
    .collection('records').doc(data.recordId)
    .delete()
    .then(() => console.log('Deleted'))
    .catch(error => console.erorr(error))
})
