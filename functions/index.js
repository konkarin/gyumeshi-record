const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

exports.record = functions.https.onCall((data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.')
  }
  // if (!data.scores) {
  //   // Throwing an HttpsError so that the client gets the error details.
  //   throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
  //       'while authenticated.')
  // }

  db.collection('records')
    .add({
      date: admin.firestore.FieldValue.serverTimestamp(),
      memo: data.memo,
      recordId: admin.firestore.FieldValue.increment(1),
      scores: data.scores,
      uid: context.auth.uid
    })
    .then(() => {
      console.log('Done')
      return '記録しました。'
    })
    .catch(() => {
      console.log('Error')
      return 'エラー！'
    })
  return '完了'
})

// exports.record = functions.https.onRequest((request, response) => {
//   const recordRef = firestore.collection('records')
//   const data = {
//     recordId: firestore.FieldValue.increment(1),
//     scores: request.scores,
//     date: request.date,
//     memo: request.memo
//   }
//   recordRef.collection('records').add({
//     data
//   }).then(() => {
//     console.log('Done')
//     response.status(200).send('記録しました。')
//   }).catch(() => {
//     response.send('エラー！')
//   })
// })
