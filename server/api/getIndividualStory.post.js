import { get, child } from "firebase/database";
import { db } from "~~/utils/firebase.js"
import { formatTime } from "~~/utils/formatTime.js";
import ogs from "open-graph-scraper";


const fetchIndividualStory = async (itemID) => {
    console.log(`Fetch individual story function called for ${itemID}`)
    const snapshot = await get(child(db, `v0/item/${itemID}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(`Snapshot value found for item: ${itemID}`)
                return snapshot.val();
            } else {
                console.log("No data avaible");
                throw "No data avaible"
            }
        })
        .catch((error) => {
            console.log(error);
        });
    console.log(`Returning data for item: ${itemID}`)
    return snapshot;
};


const fetchStoryPreviewImage = async (options) => {
    console.log(`Preview image function called for: ${options.url}`)
    try {
        const response = await ogs(options);
        console.log(`Response retrived for preview image url: ${options.url}`)

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
    console.log(`Started cleaning the story: ${itemRanking}`)
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
        console.log(`URL found for story: ${itemRanking}`)
        processedStoryObject.storyURL = storyObject.url;
        processedStoryObject.formattedURL = formatURL(storyObject.url);
        processedStoryObject.previewImage = await fetchStoryPreviewImage(
            { url: storyObject.url, timeout: 500 }
        );
        console.log(`Finished getting preview image for story: ${itemRanking}`)
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
    console.log(`Returning clean story object for story: ${itemRanking}`)
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
        console.log(`Request received for story ranking ${body.itemRanking}`);
        const itemID = body.itemID;
        console.log(`Item id for the received request: ${body.itemID}`)
        const itemRanking = body.itemRanking || 0
        console.log(`starting fetching the inidivual story for: ${body.itemRanking}`)
        const storyObject = await fetchIndividualStory(itemID);
        console.log(`finished fetching the inidivual story for: ${body.itemRanking}`)
        console.log(`starting cleaning the inidivual story for: ${body.itemRanking}`)
        const cleanStoryObject = await processStoryObject(storyObject, itemID, itemRanking);
        console.log(`finished cleaning the inidivual story for: ${body.itemRanking}`)

        return cleanStoryObject;

    } catch (error) {
        console.log("An error occured while retrieving an individual story on the server")
        console.log(error);
        return {
            error: true,
        }
    }
})
