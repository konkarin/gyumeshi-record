const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

exports.record = functions.https.onCall((data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.')
  }
  data.scores.forEach(score => {
    if (typeof score !== 'number') {
      throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.')
    }
  })
  // if (!data.scores) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
  //       'while authenticated.')
  // }

  db.collection('records')
    .add({
      date: admin.firestore.FieldValue.serverTimestamp(),
      memo: data.memo,
      scores: data.scores,
      uid: context.auth.uid
    })
    .then(() => {
      console.log('Done')
    })
    .catch(error => {
      console.log(error)
      return error
    })
  return '記録しました。'
})

exports.updateRecord = functions.https.onCall((data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.')
  }
  // data.scores.forEach(score => {
  //   if (typeof score !== 'number') {
  //     throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' + 'while authenticated.')
  //   }
  // })
  db.collection('records').doc(data.id).update({
    // data: data.data
  })
    .then(() => console.log('Done'))
    .catch(error => console.log(error))
})
