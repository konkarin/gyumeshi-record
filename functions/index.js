const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp()

const firestore = admin.firestore()

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

exports.record = functions.https.onCall(async (data, context) => {
  // Checking that the user is authenticated.
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.')
  }

  firestore.collection('records')
    .add({
      date: data.date,
      memo: data.memo,
      recordId: firestore.FieldValue.increment(1),
      scores: data.socres,
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
})
