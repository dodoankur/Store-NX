import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import FilesService from "../services/files"

const router = Router()

router
  .get(
    "/v1/files",
    security.checkUserScope.bind(this, security.scope.READ_FILES),
    getFiles.bind(this)
  )
  .post(
    "/v1/files",
    security.checkUserScope.bind(this, security.scope.WRITE_FILES),
    uploadFile.bind(this)
  )
  .delete(
    "/v1/files/:file",
    security.checkUserScope.bind(this, security.scope.WRITE_FILES),
    deleteFile.bind(this)
  )

async function getFiles(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await FilesService.getFiles()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

function uploadFile(req: Request, res: Response, next: NextFunction) {
  FilesService.uploadFile(req, res)
}

async function deleteFile(req: Request, res: Response, next: NextFunction) {
  try {
    await FilesService.deleteFile(req.params.file)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
