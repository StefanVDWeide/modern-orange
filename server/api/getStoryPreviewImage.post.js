import ogs from "open-graph-scraper";

const setPreviewImageAsyncTimeOut = async (storyURL) => {
    let timeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
            resolve("standard");
        }, 1000);
    });
    const storyPreviewImage = await fetchStoryPreviewImage({ url: storyURL, timeout: 800 })
    const response = await Promise.race([storyPreviewImage, timeoutPromise]);

    if (timeout) {
        clearTimeout(timeout);
    }

    return response;
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
};

const validURL = (url) => {
    const regex = new RegExp("^https?://");
    return regex.test(url);
};

// TODO: Add a timeout and retry function to the fetching of the story
export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        const storyURL = body.storyURL;
        const previewImageURL = await setPreviewImageAsyncTimeOut(storyURL);

        return previewImageURL;

    } catch (error) {
        console.log("An error occured while retrieving an individual story on the server")
        console.log(error);
        return {
            error: true,
        }
    }
})

