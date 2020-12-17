import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import CategoriesService from "../services/products/productCategories"

const router = Router()

router
  .get(
    "/v1/product_categories",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCT_CATEGORIES),
    getCategories.bind(this)
  )
  .post(
    "/v1/product_categories",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCT_CATEGORIES),
    addCategory.bind(this)
  )
  .get(
    "/v1/product_categories/:id",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCT_CATEGORIES),
    getSingleCategory.bind(this)
  )
  .put(
    "/v1/product_categories/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCT_CATEGORIES),
    updateCategory.bind(this)
  )
  .delete(
    "/v1/product_categories/:id",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCT_CATEGORIES),
    deleteCategory.bind(this)
  )
  .post(
    "/v1/product_categories/:id/image",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCT_CATEGORIES),
    uploadCategoryImage.bind(this)
  )
  .delete(
    "/v1/product_categories/:id/image",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCT_CATEGORIES),
    deleteCategoryImage.bind(this)
  )

async function getCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CategoriesService.getCategories(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await CategoriesService.getSingleCategory(req.params.id)
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

async function addCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CategoriesService.addCategory(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CategoriesService.updateCategory(req.params.id, req.body)
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

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await CategoriesService.deleteCategory(req.params.id)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

function uploadCategoryImage(req: Request, res: Response, next: NextFunction) {
  CategoriesService.uploadCategoryImage(req, res, next)
}

function deleteCategoryImage(req: Request, res: Response, next: NextFunction) {
  CategoriesService.deleteCategoryImage(req.params.id)
  res.end()
}

export default router
