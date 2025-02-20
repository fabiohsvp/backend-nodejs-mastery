/* eslint-disable no-undef */
import { diskStorage } from "multer";
import { randomBytes } from "crypto";
import { extname, resolve } from "path";

const storage = diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    filename: (req, file, callback) => {
        randomBytes(16, (err, res) => {
            if (err) return callback(err);
            return callback(
                null,
                res.toString("hex") + extname(file.originalname)
            );
        });
    },
});

export default { storage };
