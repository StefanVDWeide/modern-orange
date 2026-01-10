import * as timeago from "timeago.js";

export const formatTime = (timestamp: number): string => timeago.format(timestamp, "en-US")
