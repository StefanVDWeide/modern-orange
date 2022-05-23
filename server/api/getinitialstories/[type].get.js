import {
    get,
    child,
    query,
    limitToFirst,
    orderByKey,
} from "firebase/database";

import { db } from "~~/utils/firebase.js"

const fetchInitialAskStories = async (storyType) => {
    const snapshot = await get(
        query(child(db, `v0/${storyType}stories`), limitToFirst(30), orderByKey())
    )
        .then((snapshot) => {
            if (snapshot.exists()) {
                let itemIDs = [];
                snapshot.forEach((object) => {
                    itemIDs.push(object.key);
                });
                return { storyIDs: snapshot.val(), itemIDs: itemIDs };
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });

    return snapshot;
};


export default defineEventHandler(async (event) => {
    try {
        const storyType = event.context.params.type;
        const storyIDs = await fetchInitialAskStories(storyType);
        return storyIDs;

    } catch (error) {
        console.log("An error occured in the server route")
        console.log(error);
        return {
            error: true,
        }
    }
})

