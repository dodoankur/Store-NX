import { NextFunction, Request, Response, Router } from "express"
import security from "../lib/security"
import ThemeAssetsService from "../services/theme/assets"
import ThemePlaceholdersService from "../services/theme/placeholders"
import ThemeSettingsService from "../services/theme/settings"
import ThemeService from "../services/theme/theme"

const router = Router()

router
  .get(
    "/v1/theme/export",
    security.checkUserScope.bind(this, security.scope.READ_THEME),
    exportTheme.bind(this)
  )
  .post(
    "/v1/theme/install",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    installTheme.bind(this)
  )

  .get(
    "/v1/theme/settings",
    security.checkUserScope.bind(this, security.scope.READ_THEME),
    getSettings.bind(this)
  )
  .put(
    "/v1/theme/settings",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    updateSettings.bind(this)
  )
  .get(
    "/v1/theme/settings_schema",
    security.checkUserScope.bind(this, security.scope.READ_THEME),
    getSettingsSchema.bind(this)
  )

  .post(
    "/v1/theme/assets",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    uploadFile.bind(this)
  )
  .delete(
    "/v1/theme/assets/:file",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    deleteFile.bind(this)
  )

  .get(
    "/v1/theme/placeholders",
    security.checkUserScope.bind(this, security.scope.READ_THEME),
    getPlaceholders.bind(this)
  )
  .post(
    "/v1/theme/placeholders",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    addPlaceholder.bind(this)
  )
  .get(
    "/v1/theme/placeholders/:key",
    security.checkUserScope.bind(this, security.scope.READ_THEME),
    getSinglePlaceholder.bind(this)
  )
  .put(
    "/v1/theme/placeholders/:key",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    updatePlaceholder.bind(this)
  )
  .delete(
    "/v1/theme/placeholders/:key",
    security.checkUserScope.bind(this, security.scope.WRITE_THEME),
    deletePlaceholder.bind(this)
  )

function exportTheme(req: Request, res: Response, next: NextFunction) {
  ThemeService.exportTheme(req, res)
}

function installTheme(req: Request, res: Response, next: NextFunction) {
  ThemeService.installTheme(req, res)
}

function getSettings(req: Request, res: Response, next: NextFunction) {
  ThemeSettingsService.getSettings()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateSettings(req: Request, res: Response, next: NextFunction) {
  ThemeSettingsService.updateSettings(req.body)
    .then(() => {
      res.end()
    })
    .catch(next)
}

function getSettingsSchema(req: Request, res: Response, next: NextFunction) {
  ThemeSettingsService.getSettingsSchema()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function uploadFile(req: Request, res: Response, next: NextFunction) {
  ThemeAssetsService.uploadFile(req, res, next)
}

function deleteFile(req: Request, res: Response, next: NextFunction) {
  ThemeAssetsService.deleteFile(req.params.file)
    .then(() => {
      res.end()
    })
    .catch(next)
}

function getPlaceholders(req: Request, res: Response, next: NextFunction) {
  ThemePlaceholdersService.getPlaceholders()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSinglePlaceholder(req: Request, res: Response, next: NextFunction) {
  ThemePlaceholdersService.getSinglePlaceholder(req.params.key)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addPlaceholder(req: Request, res: Response, next: NextFunction) {
  ThemePlaceholdersService.addPlaceholder(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updatePlaceholder(req: Request, res: Response, next: NextFunction) {
  ThemePlaceholdersService.updatePlaceholder(req.params.key, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deletePlaceholder(req: Request, res: Response, next: NextFunction) {
  ThemePlaceholdersService.deletePlaceholder(req.params.key)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

export default router
