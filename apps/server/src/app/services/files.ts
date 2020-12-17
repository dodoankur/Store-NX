import { Request, Response } from "express"
import formidable from "formidable"
import fse from "fs-extra"
import mongodb from "mongodb"
import path from "path"
import winston from "winston"
import { db } from "../lib/mongo"
import settings from "../lib/settings"
import utils from "../lib/utils"

const contentPath = path.resolve(settings.filesUploadPath)

class FilesService {
  getFileData(fileName: string) {
    const filePath = contentPath + "/" + fileName

    const stats = fse.statSync(filePath)
    if (stats.isFile()) {
      return {
        file: fileName,
        size: stats.size,
        modified: stats.mtime,
      }
    } else {
      const bucket = new mongodb.GridFSBucket(db)
      bucket
        .openDownloadStreamByName(fileName)
        .pipe(fse.createWriteStream(filePath))
        .on("error", (error: Error) => {
          winston.error(error)
        })
        .on("finish", () => {
          winston.info("Done!")
        })
      return {
        file: fileName,
        size: stats.size,
        modified: stats.mtime,
      }
    }
  }

  getFilesData(files) {
    return files
      .map((fileName: string) => this.getFileData(fileName))
      .filter(fileData => fileData !== null)
      .sort((a, b) => a.modified - b.modified)
  }

  getFiles() {
    return new Promise((resolve, reject) => {
      // const bucket = new mongodb.GridFSBucket(db)
      // resolve(bucket.find({}))
      fse.readdir(contentPath, (err, files) => {
        if (err) {
          reject(err)
        } else {
          const filesData = this.getFilesData(files)
          resolve(filesData)
        }
      })
    })
  }

  deleteFile(fileName: string) {
    return new Promise((resolve, reject) => {
      const filePath = contentPath + "/" + fileName
      const bucket = new mongodb.GridFSBucket(db)
      bucket.find({ filename: fileName }).destroy()
      // if (fse.existsSync(filePath)) {
      //   fse.unlink(filePath, err => {
      //     resolve(200)
      //   })
      // } else {
      //   reject("File not found")
      // }
    })
  }

  uploadFile(req: Request, res: Response) {
    const uploadDir = contentPath

    let form = new formidable.IncomingForm(),
      file_name = null,
      file_size = 0

    form.uploadDir = uploadDir

    form
      .on("fileBegin", (name, file) => {
        // Emitted whenever a field / value pair has been received.
        file.name = utils.getCorrectFileName(file.name)
        file.path = uploadDir + "/" + file.name
      })
      .on("file", (name, file) => {
        // every time a file has been uploaded successfully,
        file_name = file.name
        file_size = file.size
        const bucket = new mongodb.GridFSBucket(db)
        fse
          .createReadStream(file.path)
          .pipe(bucket.openUploadStream(file_name))
          .on("error", error => {
            winston.error(error)
          })
        //     .on("finish", function () {
        //       console.log("done!");
        //       process.exit(0);
        //     });
      })
      .on("error", error => {
        res.status(500).send(this.getErrorMessage(error))
      })
      .on("end", () => {
        //Emitted when the entire request has been received, and all contained files have finished flushing to disk.
        if (file_name) {
          res.send({ file: file_name, size: file_size })
        } else {
          res
            .status(400)
            .send(this.getErrorMessage("Required fields are missing!"))
        }
      })

    form.parse(req)
  }

  getErrorMessage(error: string) {
    return { error: true, message: error.toString() }
  }
}

export default new FilesService()
