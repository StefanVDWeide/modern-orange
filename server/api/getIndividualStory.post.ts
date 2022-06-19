import { get, child } from "firebase/database";
import { db } from "~~/utils/firebase.js"
import { formatTime } from "~~/utils/formatTime.js";

interface storyObject {
    url: string,
    score: string,
    title: string,
    text?: string,
    descendants: string,
    by: string,
    time: number,
    kids: string[]

}

interface processedStoryObject {
    storyURL: string,
    formattedURL: string,
    previewImage: string,
    storyTitle: string,
    storyText?: string,
    storyRanking: string,
    storyScore: string,
    storyDescendants: string,
    storyBy: string,
    storyByLink: string,
    storyItemLink: string,
    storyTime: string,
    storyType: string,
    storyKids: string[]
}

const fetchIndividualStory = async (itemID: string) => {
    try {
        const snapshot = await get(child(db, `v0/item/${itemID}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data availble")
            throw "no data availble"
        }
    } catch (error) {
        console.log(error)
        return "Error"
    }
};

const processStoryObject = async (storyObject: storyObject, itemID: string, itemRanking: string): Promise<processedStoryObject> => {
    let processedStoryObject: processedStoryObject = {
        storyURL: "",
        formattedURL: "",
        previewImage: "",
        storyTitle: "",
        storyText: "",
        storyRanking: "",
        storyScore: "",
        storyDescendants: "",
        storyBy: "",
        storyByLink: "",
        storyItemLink: "",
        storyTime: "",
        storyType: "",
        storyKids: []
    };
    if (storyObject.url) {
        processedStoryObject.storyURL = storyObject.url;
        processedStoryObject.formattedURL = formatURL(storyObject.url);
        processedStoryObject.previewImage = "standard"
    } else {
        processedStoryObject.storyURL = `/item/${itemID}`;
        processedStoryObject.previewImage = "standard";
        processedStoryObject.formattedURL = "modernorange.com";
    }
    if (storyObject.text) {
        processedStoryObject.storyText = storyObject.text;
    }
    processedStoryObject.storyTitle = storyObject.title;
    processedStoryObject.storyRanking = itemRanking + 1;
    processedStoryObject.storyScore = storyObject.score;
    processedStoryObject.storyDescendants = storyObject.descendants;
    processedStoryObject.storyBy = storyObject.by;
    processedStoryObject.storyByLink = `/user/${storyObject.by}`;
    processedStoryObject.storyItemLink = `/item/${itemID}`;
    processedStoryObject.storyTime = formatTime(
        storyObject.time * 1000,
    );
    processedStoryObject.storyType = checkItemType(storyObject.title);
    processedStoryObject.storyKids = storyObject.kids;
    return processedStoryObject;
};

const checkItemType = (title: string): string => {
    if (title.includes("Ask HN:")) {
        return "Ask HN";
    } else if (title.includes("Show HN:")) {
        return "Show HN";
    } else if (title.includes("Launch HN:")) {
        return "Launch HN";
    } else {
        return "Story";
    }
};

const formatURL = (url) => {
    const domain = new URL(url);
    return domain.hostname.replace("www.", "");
};

export default defineEventHandler(async (event): Promise<processedStoryObject | { error: boolean }> => {
    try {
        const body = await useBody(event);
        const itemID = body.itemID;
        const itemRanking = body.itemRanking || 0
        const storyObject = await fetchIndividualStory(itemID);
        const cleanStoryObject = await processStoryObject(storyObject, itemID, itemRanking);

        return cleanStoryObject;

    } catch (error) {
        console.log("An error occured while retrieving an individual story on the server")
        console.log(error);
        return {
            error: true,
        }
    }
})
