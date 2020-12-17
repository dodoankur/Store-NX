import { NextFunction, Request, Response, Router } from "express"
import winston from "winston"
import security from "../lib/security"
import ProductImagesService from "../services/products/images"
import ProductOptionsService from "../services/products/options"
import ProductOptionValuesService from "../services/products/optionValues"
import ProductsService from "../services/products/products"
import ProductVariantsService from "../services/products/variants"

const router = Router()

router
  .get(
    "/v1/products",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getProducts.bind(this)
  )
  .post(
    "/v1/products",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    addProduct.bind(this)
  )
  .get(
    "/v1/products/:productId",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getSingleProduct.bind(this)
  )
  .put(
    "/v1/products/:productId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    updateProduct.bind(this)
  )
  .delete(
    "/v1/products/:productId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    deleteProduct.bind(this)
  )

  .get(
    "/v1/products/:productId/images",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getImages.bind(this)
  )
  .post(
    "/v1/products/:productId/images",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    addImage.bind(this)
  )
  .put(
    "/v1/products/:productId/images/:imageId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    updateImage.bind(this)
  )
  .delete(
    "/v1/products/:productId/images/:imageId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    deleteImage.bind(this)
  )

  .get(
    "/v1/products/:productId/sku",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    isSkuExists.bind(this)
  )
  .get(
    "/v1/products/:productId/slug",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    isSlugExists.bind(this)
  )

  .get(
    "/v1/products/:productId/options",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getOptions.bind(this)
  )
  .get(
    "/v1/products/:productId/options/:optionId",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getSingleOption.bind(this)
  )
  .post(
    "/v1/products/:productId/options",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    addOption.bind(this)
  )
  .put(
    "/v1/products/:productId/options/:optionId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    updateOption.bind(this)
  )
  .delete(
    "/v1/products/:productId/options/:optionId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    deleteOption.bind(this)
  )

  .get(
    "/v1/products/:productId/options/:optionId/values",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getOptionValues.bind(this)
  )
  .get(
    "/v1/products/:productId/options/:optionId/values/:valueId",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getSingleOptionValue.bind(this)
  )
  .post(
    "/v1/products/:productId/options/:optionId/values",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    addOptionValue.bind(this)
  )
  .put(
    "/v1/products/:productId/options/:optionId/values/:valueId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    updateOptionValue.bind(this)
  )
  .delete(
    "/v1/products/:productId/options/:optionId/values/:valueId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    deleteOptionValue.bind(this)
  )

  .get(
    "/v1/products/:productId/variants",
    security.checkUserScope.bind(this, security.scope.READ_PRODUCTS),
    getVariants.bind(this)
  )
  .post(
    "/v1/products/:productId/variants",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    addVariant.bind(this)
  )
  .put(
    "/v1/products/:productId/variants/:variantId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    updateVariant.bind(this)
  )
  .delete(
    "/v1/products/:productId/variants/:variantId",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    deleteVariant.bind(this)
  )
  .put(
    "/v1/products/:productId/variants/:variantId/options",
    security.checkUserScope.bind(this, security.scope.WRITE_PRODUCTS),
    setVariantOption.bind(this)
  )

async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductsService.getProducts(req.query)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductsService.getSingleProduct(req.params.productId)
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

async function addProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductsService.addProduct(req.body)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductsService.updateProduct(
      req.params.productId,
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

async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductsService.deleteProduct(req.params.productId)
    res.status(data ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getImages(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductImagesService.getImages(req.params.productId)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function addImage(req: Request, res: Response, next: NextFunction) {
  await ProductImagesService.addImage(req, res, next)
}

async function updateImage(req: Request, res: Response, next: NextFunction) {
  try {
    await ProductImagesService.updateImage(
      req.params.productId,
      req.params.imageId,
      req.body
    )
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function deleteImage(req: Request, res: Response, next: NextFunction) {
  try {
    await ProductImagesService.deleteImage(
      req.params.productId,
      req.params.imageId
    )
    res.end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function isSkuExists(req: Request, res: Response, next: NextFunction) {
  try {
    const exists = await ProductsService.isSkuExists(
      req.query.sku,
      req.params.productId
    )
    res.status(exists ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function isSlugExists(req: Request, res: Response, next: NextFunction) {
  try {
    const exists = await ProductsService.isSlugExists(
      req.query.slug,
      req.params.productId
    )
    res.status(exists ? 200 : 404).end()
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getOptions(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductOptionsService.getOptions(req.params.productId)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleOption(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductOptionsService.getSingleOption(
      req.params.productId,
      req.params.optionId
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

async function addOption(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductOptionsService.addOption(
      req.params.productId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateOption(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductOptionsService.updateOption(
      req.params.productId,
      req.params.optionId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function deleteOption(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductOptionsService.deleteOption(
      req.params.productId,
      req.params.optionId
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getOptionValues(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductOptionValuesService.getOptionValues(
      req.params.productId,
      req.params.optionId
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getSingleOptionValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductOptionValuesService.getSingleOptionValue(
      req.params.productId,
      req.params.optionId,
      req.params.valueId
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

async function addOptionValue(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductOptionValuesService.addOptionValue(
      req.params.productId,
      req.params.optionId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateOptionValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductOptionValuesService.updateOptionValue(
      req.params.productId,
      req.params.optionId,
      req.params.valueId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function deleteOptionValue(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductOptionValuesService.deleteOptionValue(
      req.params.productId,
      req.params.optionId,
      req.params.valueId
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function getVariants(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductVariantsService.getVariants(req.params.productId)
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function addVariant(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductVariantsService.addVariant(
      req.params.productId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function updateVariant(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductVariantsService.updateVariant(
      req.params.productId,
      req.params.variantId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function deleteVariant(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductVariantsService.deleteVariant(
      req.params.productId,
      req.params.variantId
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

async function setVariantOption(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ProductVariantsService.setVariantOption(
      req.params.productId,
      req.params.variantId,
      req.body
    )
    res.send(data)
  } catch (error) {
    winston.error(error)
    next(error)
  }
}

export default router
