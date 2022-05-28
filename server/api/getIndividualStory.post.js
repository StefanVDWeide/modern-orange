import { get, child } from "firebase/database";
import { db } from "~~/utils/firebase.js"
import { formatTime } from "~~/utils/formatTime.js";
import ogs from "open-graph-scraper";


const fetchIndividualStory = async (itemID) => {
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

const setPreviewImageAsyncTimeOut = async (storyObject) => {
    let timeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
            resolve("standard");
        }, 1000);
    });
    const storyPreviewImage = await fetchStoryPreviewImage({ url: storyObject.url, timeout: 1000 })
    const response = await Promise.race([storyPreviewImage, timeoutPromise]);

    if (timeout) { //the code works without this but let's be safe and clean up the timeout
        clearTimeout(timeout);
    }
    return response;
}

const fetchStoryPreviewImage = async (options) => {
    try {
        const response = await ogs(options);

        if (response.error) {
            return "standard";
        }

        if (
            response.result.ogImage !== undefined &&
            validURL(response.result.ogImage.url)
        ) {
            return response.result.ogImage.url;
        } else if (
            response.result.twitterImage !== undefined &&
            validURL(response.result.twitterImage.url)
        ) {
            return response.result.twitterImage.url;
        } else {
            return "standard";
        }
    } catch (error) {
        console.log(`An error occured while fetching the preview image from: ${options.url}`)
        return "standard"
    }
}

const processStoryObject = async (storyObject, itemID, itemRanking) => {
    let processedStoryObject = {
        storyURL: "",
        formattedURL: "",
        previewImage: "",
        storyTitle: "",
        storyRanking: "",
        storyScore: "",
        storyDescendants: "",
        storyBy: "",
        storyByLink: "",
        storyItemLink: "",
        storyTime: "",
        storyType: "",
        storyKids: ""
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

const validURL = (url) => {
    const regex = new RegExp("^https?://");
    return regex.test(url);
};

const checkItemType = (title) => {
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

// TODO: Add a timeout and retry function to the fetching of the story
export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        const itemID = body.itemID;
        const itemRanking = body.itemRanking || 0
        const storyObject = await fetchIndividualStory(itemID);
        const cleanStoryObject = await processStoryObject(storyObject, itemID, itemRanking);

        if (storyObject.url) {
            cleanStoryObject.previewImage = await setPreviewImageAsyncTimeOut(storyObject);
        }
        return cleanStoryObject;

    } catch (error) {
        console.log("An error occured while retrieving an individual story on the server")
        console.log(error);
        return {
            error: true,
        }
    }
})
