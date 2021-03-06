import {
    get,
    child,
    query,
    limitToFirst,
    orderByKey,
} from "firebase/database";

import { db } from "~~/utils/firebase.js"

const fetchInitialAskStories = async (storyType: string) => {
    const snapshot = await get(
        query(child(db, `v0/${storyType}stories`), limitToFirst(Number(useRuntimeConfig().maxStoriesPerFeedPage)), orderByKey())
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
        console.log("An error occured while retrieving an the initial stories on the server")
        console.log(error);
        return {
            error: true,
        }
    }
})

