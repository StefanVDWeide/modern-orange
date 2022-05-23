import { initializeApp } from "firebase/app"
import { getDatabase, ref } from "firebase/database"


const firebaseConfig = {
    databaseURL: "https://hacker-news.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = ref(getDatabase(firebaseApp));
