import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDocs, getFirestore, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const getAllDocuments = async (docName) => {
  const docs = [];

  const querySnapshot = await getDocs(collection(db, docName));
  querySnapshot.forEach((doc) => {
    docs.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return docs;
};

const createNewDoc = async (collectionName, newDocProperties) => {
  return await addDoc(
    collection(db, collectionName),
    {
      ...newDocProperties
    }
  );
};

export const getQuizzes = async () => {
  return await getAllDocuments('quizzes');
};

export const createQuizApi = async (newQuizzProperties) => {
  let newQuiz = {}
  try {
    newQuiz = await createNewDoc('quizzes', newQuizzProperties);
  } catch (error) {
    newQuiz = {
      error
    };
  }
  return newQuiz;
};

export const removeQuizApi = async (id) => {
  const quizRef = doc(db, 'quizzes', id);
  try {
    const batch = writeBatch(db);
    batch.delete(quizRef);
    await batch.commit();
  } catch (error) {
    
  }
  return quizRef.id
};
