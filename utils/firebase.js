const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./smart-vest-93a68-firebase-adminsdk-27f09-498baffbb5.json');

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://smart-vest-93a68.appspot.com`);

exports.uploadFile = async (path, filename) => {

  const storageLink = await storageRef.upload(path, {
      public: true,
      destination: `/${filename}`,
      metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
      }
  });

  return storageLink[0].metadata.mediaLink;
  
}



