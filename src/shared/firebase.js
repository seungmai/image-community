// import를 한다.
import firebase from "firebase/app";
// auth를 사용한다.
import "firebase/auth";
// firebase에 컬랙션에 임시로 넣어준 데이터를 가져온다.
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAcLwEk20W2Eu3eGwPmQ62M5cAcEKxArNo",
  authDomain: "image-community-d6449.firebaseapp.com",
  projectId: "image-community-d6449",
  storageBucket: "image-community-d6449.appspot.com",
  messagingSenderId: "69079823492",
  appId: "1:69079823492:web:72c72d8d3ac9909bffbed1",
  measurementId: "G-1WYDEDSGVF",
};

// 초기화해준다.
firebase.initializeApp(firebaseConfig);

// apiKey를 내보낸다.
const apiKey = firebaseConfig.apiKey;

// 파이어베이스를 가지고온다.
// 인증을 만들어준다.
const auth = firebase.auth();

// 파이어스토어를 사용한다.
const firestore = firebase.firestore();

// 파이어베이스의 스토리지를 사용한다.
const storage = firebase.storage();

const realtime = firebase.database();

const analytics = firebase.analytics();

export { auth, apiKey, firestore, storage, realtime, analytics };
