import { uploadToCloudinary } from "../lib/email/cloudinary.js";

const uploadFile = async (req , res) => {
  try {
    let image;
    const photoLocalPath = req.files?.photo?.[0]?.path;
    if (photoLocalPath) {
      try {
        image = await uploadToCloudinary(photoLocalPath);

        return res.status(200).json({
            "url":image?.secure_url
        })
      } catch (error) {}
    }
  } catch (error) {}
};

export { uploadFile };
