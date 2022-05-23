import {
    get,
    child,
    query,
} from "firebase/database";

import { db } from "~~/utils/firebase.js"

const fetchIndividualUser = async (userID) => {
    const snapshot = await get(
        query(child(db, `v0/user/${userID}`))
    )
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data avaible");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return snapshot;
};


export default defineEventHandler(async (event) => {
    try {
        const userID = event.context.params.username;
        const userData = await fetchIndividualUser(userID);
        return userData;

    } catch (error) {
        console.log("An error occured in the server route")
        console.log(error);
        return {
            error: true,
        }
    }
})

