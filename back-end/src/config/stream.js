import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

export const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET
);

export const upsertStreamUser = async (user) => {
  try {
    await streamClient.upsertUser(user);
    console.log("Stream user upserted:", user.name);
    return user;
  } catch (error) {
    console.log("Error upserting stream user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted:", userId);
  } catch (error) {
    console.log("Error deleting stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.log("Error generating stream token:", error);
    return null;
  }
};
