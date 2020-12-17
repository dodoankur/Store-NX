import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import CheckoutFieldsService from "../services/settings/checkoutFields"
import CommerceSettingsService from "../services/settings/commerce"
import EmailSettingsService from "../services/settings/email"
import EmailTemplatesService from "../services/settings/emailTemplates"
import ImportSettingsService from "../services/settings/import"
import SettingsService from "../services/settings/settings"

const router = Router()

router
  .get(
    "/v1/settings",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getSettings.bind(this)
  )
  .put(
    "/v1/settings",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateSettings.bind(this)
  )
  .get(
    "/v1/settings/email",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getEmailSettings.bind(this)
  )
  .put(
    "/v1/settings/email",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateEmailSettings.bind(this)
  )
  .get(
    "/v1/settings/import",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getImportSettings.bind(this)
  )
  .put(
    "/v1/settings/import",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateImportSettings.bind(this)
  )
  .get(
    "/v1/settings/commerceform",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    retrieveCommerceSettings.bind(this)
  )
  .put(
    "/v1/settings/commerceform",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateCommerceSettings.bind(this)
  )
  .get(
    "/v1/settings/email/templates/:name",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getEmailTemplate.bind(this)
  )
  .put(
    "/v1/settings/email/templates/:name",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateEmailTemplate.bind(this)
  )
  .get(
    "/v1/settings/checkout/fields",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getCheckoutFields.bind(this)
  )
  .get(
    "/v1/settings/checkout/fields/:name",
    security.checkUserScope.bind(this, security.scope.READ_SETTINGS),
    getCheckoutField.bind(this)
  )
  .put(
    "/v1/settings/checkout/fields/:name",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    updateCheckoutField.bind(this)
  )
  .post(
    "/v1/settings/logo",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    uploadLogo.bind(this)
  )
  .delete(
    "/v1/settings/logo",
    security.checkUserScope.bind(this, security.scope.WRITE_SETTINGS),
    deleteLogo.bind(this)
  )

async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SettingsService.getSettings()
    res.send(data)
  } catch (error) {
    console.error(error)
    next()
  }
}

async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await SettingsService.updateSettings(req.body)
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

async function getEmailSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await EmailSettingsService.getEmailSettings()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateEmailSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await EmailSettingsService.updateEmailSettings(req.body)
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

async function getImportSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ImportSettingsService.getImportSettings()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateImportSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ImportSettingsService.updateImportSettings(req.body)
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

async function retrieveCommerceSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CommerceSettingsService.retrieveCommerceSettings()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateCommerceSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CommerceSettingsService.updateCommerceSettings(req.body)
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

async function getEmailTemplate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await EmailTemplatesService.getEmailTemplate(req.params.name)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateEmailTemplate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await EmailTemplatesService.updateEmailTemplate(
      req.params.name,
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

async function getCheckoutFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CheckoutFieldsService.getCheckoutFields()
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getCheckoutField(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CheckoutFieldsService.getCheckoutField(req.params.name)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateCheckoutField(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CheckoutFieldsService.updateCheckoutField(
      req.params.name,
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

function uploadLogo(req: Request, res: Response, next: NextFunction) {
  SettingsService.uploadLogo(req, res, next)
}

async function deleteLogo(req: Request, res: Response, next: NextFunction) {
  try {
    await SettingsService.deleteLogo()
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
