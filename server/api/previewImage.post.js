import ogs from "open-graph-scraper";

export default defineEventHandler(async (event) => {
    try {
        const body = await useBody(event);
        const options = { url: body.url };
        const { error, result } = await ogs(options);

        return {
            error: error,
            result: result
        }

    } catch (error) {
        return {
            error: true,
        }
    }
})
