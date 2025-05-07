
const { BUCKET_NAME}=require("../../config/env.config")
const s3=require("../../config/s3.config")
const {PutObjectCommand}=require("@aws-sdk/client-s3")
const handleS3Upload = async ( filename, file, folder) => {
    try {
      const fileBuffer = file.buffer
      const command = new PutObjectCommand({
        Bucket:BUCKET_NAME,
        Key: `${folder}/${filename}`,
        ContentType: file.mimetype,
        Body: fileBuffer,
      });
      await s3.send(command);
      return `${process.env.S3_ACCESS_URL}/${folder}/${filename}`;
    } catch (error) {
      throw new Error(error);
    }
  };
  module.exports={handleS3Upload}