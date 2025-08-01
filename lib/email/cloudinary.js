import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dha5fql70",
  api_key: "295824116663984",
  api_secret: "aJIFDs8-VRQcDZgKU84NpyzF5cU",
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export { uploadToCloudinary };
