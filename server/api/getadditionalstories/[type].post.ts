import {
    get,
    child,
    query,
    limitToFirst,
    startAt,
    orderByKey,
} from "firebase/database";

import { db } from "~~/utils/firebase.js"

const fetchAdditionalAskStories = async (lastKey: number, storyType: string) => {
    const snapshot = await get(
        query(
            child(db, `v0/${storyType}stories`),
            startAt(lastKey),
            limitToFirst(Number(useRuntimeConfig().maxStoriesPerFeedPage)),
            orderByKey()
        )
    )
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot;
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
        const body = await useBody(event);
        const lastKey = body.lastKey
        const storyType = event.context.params.type;
        const storyIDs = await fetchAdditionalAskStories(lastKey, storyType);
        return storyIDs;

    } catch (error) {
        console.log("An error occured while retrieving an additional stories on the server")
        console.log(error);
        return {
            error: true,
        }
    }
})
