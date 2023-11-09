import multer from "multer";

//multer configuration file to handle file uploads
const storage = multer.memoryStorage();

let upload = multer({ storage: storage });
export default upload;
