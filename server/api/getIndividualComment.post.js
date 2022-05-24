import { get, child } from "firebase/database";
import { db } from "~~/utils/firebase.js"
import { formatTime } from "~~/utils/formatTime";

// Methods
const fetchIndividualComment = async (itemID) => {
    const snapshot = await get(child(db, `v0/item/${itemID}`))
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
        const body = await useBody(event);
        const itemID = body.itemID;
        const storyObject = await fetchIndividualComment(itemID);
        storyObject.time = formatTime(storyObject.time * 1000, "en-US");
        return storyObject;

    } catch (error) {
        console.log("An error occured while retrieving an additional stories on the server");
        console.log(error);
        return {
            error: true,
        }
    }
})
