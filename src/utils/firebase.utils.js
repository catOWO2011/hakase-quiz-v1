import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where, writeBatch } from "firebase/firestore";

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

const auth = getAuth();

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password)
    return
  return await signInWithEmailAndPassword(auth, email, password);
};

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

export const createQuizApi = async (newQuizzProperties, newQuestions = null) => {
  let newQuiz = {}
  try {
    if (newQuestions) {
      const batch = writeBatch(db);
      const quizCollectionRef = collection(db, 'quizzes');
      const quizRef = doc(quizCollectionRef);
      batch.set(quizRef, newQuizzProperties);
      newQuestions.forEach((question) => {
        const questionRef = doc(collection(db, 'questions'));
        batch.set(questionRef, {
          ...question,
          quizId: quizRef.id
        });
      });
      await batch.commit();
      newQuiz = { id: quizRef.id };
    } else {
      newQuiz = await createNewDoc('quizzes', newQuizzProperties);
    }
  } catch (error) {
    console.error(error);
    newQuiz = {
      error
    };
  }
  return newQuiz;
};

export const removeQuizApi = async (id) => {
  const quizRef = doc(db, 'quizzes', id);
  try {
    const q = query(collection(db, 'questions'), where('quizId', '==', id));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapshot.forEach(async (questionDoc) => {
      batch.delete(doc(db, 'questions', questionDoc.id));
    });
    batch.delete(quizRef)
    await batch.commit();
  } catch (error) {
    return error;
  }
  return quizRef.id
};

export const getQuizApi = async (id) => {
  const quizRef = doc(db, 'quizzes', id);
  let quizData = { id: quizRef.id };
  try {
    const q = query(collection(db, 'questions'), where('quizId', '==', quizRef.id));
    const querySnapshot = await getDocs(q);
    quizData.questions = []
    querySnapshot.forEach((doc) => {
      quizData.questions.push({
        id: doc.id,
        ...doc.data()
      });
    });
  } catch (error) {
    
  }
  return {
    quiz: {
      ...quizData
    }
  };
};

export const createQuestionApi = async (quiz) => {
  return createNewDoc('questions', quiz);
};

export const deleteQuestionApi = async (id) => {
  await deleteDoc(doc(db, 'questions', id));
};

export const editQuestionApi = async (id, newData) => {
  await setDoc(doc(db, 'questions', id), newData);
};
