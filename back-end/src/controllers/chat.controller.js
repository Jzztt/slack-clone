export const getStreamToken = async (req, res) => {
  try {
    const token = await generateStreamToken(req.auth().userId);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken:", error);

    res.status(500).json({ error: "Failed to generate token" });
  }
};
