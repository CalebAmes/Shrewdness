
const AWS = require("aws-sdk");

const NAME_OF_BUCKET = "shrewdness";

const multer = require("multer");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------

const singlePublicFileUpload = async (file) => {

  const { mimetype, buffer } = await file;

  const Key = new Date().getTime().toString()
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Location;
};


const singlePublicFileUpload2 = async (file) => {

  const Key = new Date().getTime().toString();
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: file,
    ACL: "public-read",
  };

  const result = await s3.upload(uploadParams).promise();

  return result.Location;
};

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const singleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).single(nameOfKey);

const multipleMulterUpload = (nameOfKey) =>
  multer({ storage: storage }).array(nameOfKey);

module.exports = {
  s3,
  singlePublicFileUpload,
  singlePublicFileUpload2,
  singleMulterUpload,
  multipleMulterUpload,
};