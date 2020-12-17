import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
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

async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ThemeSettingsService.getSettings()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    await ThemeSettingsService.updateSettings(req.body)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSettingsSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ThemeSettingsService.getSettingsSchema()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

function uploadFile(req: Request, res: Response, next: NextFunction) {
  ThemeAssetsService.uploadFile(req, res, next)
}

async function deleteFile(req: Request, res: Response, next: NextFunction) {
  try {
    await ThemeAssetsService.deleteFile(req.params.file)
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getPlaceholders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ThemePlaceholdersService.getPlaceholders()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSinglePlaceholder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ThemePlaceholdersService.getSinglePlaceholder(
      req.params.key
    )
    if (data) {
      res.send(data)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function addPlaceholder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ThemePlaceholdersService.addPlaceholder(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updatePlaceholder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ThemePlaceholdersService.updatePlaceholder(
      req.params.key,
      req.body
    )
    if (data) {
      res.send(data)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function deletePlaceholder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ThemePlaceholdersService.deletePlaceholder(
      req.params.key
    )
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
