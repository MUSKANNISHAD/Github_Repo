import AWS from "aws-sdk";

AWS.config.update({ region: "ap-south-1" });

const s3 = new AWS.S3();
const S3_BUCKET = "nishad1209-s3";


export {s3,S3_BUCKET};
