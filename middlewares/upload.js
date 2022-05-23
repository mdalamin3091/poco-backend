// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/uploads");
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()} -- ${file.originalname}`;
//     console.log(file)
//     console.log(fileName)
//     cb(null, fileName);
//   },
// });

// const fileValidation = (req, file, cb) => {
//   console.log("fileValidation", file.mimetype)
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(true, null);
//   } else {
//     throw new Error("Only .jpg, .png or .jpeg format allowed!");
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileValidation });
// module.exports = upload;



const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
const fileValidator = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileValidator,
});

module.exports = upload;
