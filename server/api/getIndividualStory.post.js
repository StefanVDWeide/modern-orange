import { get, child } from "firebase/database";
import { db } from "~~//utils/firebase.js"
import { formatTime } from "~~/utils/formatTime.js";
import ogs from "open-graph-scraper";


const fetchIndividualStory = async (itemID) => {
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
        processedStoryObject.previewImage = await fetchStoryPreviewImage(
            { url: storyObject.url, timeout: 1000 }
        );
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


export default defineEventHandler(async (event) => {
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
