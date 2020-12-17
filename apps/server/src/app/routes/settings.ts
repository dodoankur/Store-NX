import { NextFunction, Request, Response, Router } from "express"
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

function updateSettings(req: Request, res: Response, next: NextFunction) {
  SettingsService.updateSettings(req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function getEmailSettings(req: Request, res: Response, next: NextFunction) {
  EmailSettingsService.getEmailSettings()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateEmailSettings(req: Request, res: Response, next: NextFunction) {
  EmailSettingsService.updateEmailSettings(req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function getImportSettings(req: Request, res: Response, next: NextFunction) {
  ImportSettingsService.getImportSettings()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateImportSettings(req: Request, res: Response, next: NextFunction) {
  ImportSettingsService.updateImportSettings(req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function retrieveCommerceSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  CommerceSettingsService.retrieveCommerceSettings()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateCommerceSettings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  CommerceSettingsService.updateCommerceSettings(req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function getEmailTemplate(req: Request, res: Response, next: NextFunction) {
  EmailTemplatesService.getEmailTemplate(req.params.name)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateEmailTemplate(req: Request, res: Response, next: NextFunction) {
  EmailTemplatesService.updateEmailTemplate(req.params.name, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function getCheckoutFields(req: Request, res: Response, next: NextFunction) {
  CheckoutFieldsService.getCheckoutFields()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getCheckoutField(req: Request, res: Response, next: NextFunction) {
  CheckoutFieldsService.getCheckoutField(req.params.name)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateCheckoutField(req: Request, res: Response, next: NextFunction) {
  CheckoutFieldsService.updateCheckoutField(req.params.name, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function uploadLogo(req: Request, res: Response, next: NextFunction) {
  SettingsService.uploadLogo(req, res, next)
}

function deleteLogo(req: Request, res: Response, next: NextFunction) {
  SettingsService.deleteLogo().then(() => {
    res.end()
  })
}

export default router
