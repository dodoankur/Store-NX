import { NextFunction, Request, Response, Router } from "express"
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

function getProducts(req: Request, res: Response, next: NextFunction) {
  ProductsService.getProducts(req.query)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleProduct(req: Request, res: Response, next: NextFunction) {
  ProductsService.getSingleProduct(req.params.productId)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addProduct(req: Request, res: Response, next: NextFunction) {
  ProductsService.addProduct(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateProduct(req: Request, res: Response, next: NextFunction) {
  ProductsService.updateProduct(req.params.productId, req.body)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function deleteProduct(req: Request, res: Response, next: NextFunction) {
  ProductsService.deleteProduct(req.params.productId)
    .then(data => {
      res.status(data ? 200 : 404).end()
    })
    .catch(next)
}

function getImages(req: Request, res: Response, next: NextFunction) {
  ProductImagesService.getImages(req.params.productId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

async function addImage(req: Request, res: Response, next: NextFunction) {
  await ProductImagesService.addImage(req, res, next)
}

function updateImage(req: Request, res: Response, next: NextFunction) {
  ProductImagesService.updateImage(
    req.params.productId,
    req.params.imageId,
    req.body
  ).then(data => {
    res.end()
  })
}

function deleteImage(req: Request, res: Response, next: NextFunction) {
  ProductImagesService.deleteImage(
    req.params.productId,
    req.params.imageId
  ).then(data => {
    res.end()
  })
}

function isSkuExists(req: Request, res: Response, next: NextFunction) {
  ProductsService.isSkuExists(req.query.sku, req.params.productId)
    .then(exists => {
      res.status(exists ? 200 : 404).end()
    })
    .catch(next)
}

function isSlugExists(req: Request, res: Response, next: NextFunction) {
  ProductsService.isSlugExists(req.query.slug, req.params.productId)
    .then(exists => {
      res.status(exists ? 200 : 404).end()
    })
    .catch(next)
}

function getOptions(req: Request, res: Response, next: NextFunction) {
  ProductOptionsService.getOptions(req.params.productId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleOption(req: Request, res: Response, next: NextFunction) {
  ProductOptionsService.getSingleOption(
    req.params.productId,
    req.params.optionId
  )
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addOption(req: Request, res: Response, next: NextFunction) {
  ProductOptionsService.addOption(req.params.productId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateOption(req: Request, res: Response, next: NextFunction) {
  ProductOptionsService.updateOption(
    req.params.productId,
    req.params.optionId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function deleteOption(req: Request, res: Response, next: NextFunction) {
  ProductOptionsService.deleteOption(req.params.productId, req.params.optionId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getOptionValues(req: Request, res: Response, next: NextFunction) {
  ProductOptionValuesService.getOptionValues(
    req.params.productId,
    req.params.optionId
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getSingleOptionValue(req: Request, res: Response, next: NextFunction) {
  ProductOptionValuesService.getSingleOptionValue(
    req.params.productId,
    req.params.optionId,
    req.params.valueId
  )
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).end()
      }
    })
    .catch(next)
}

function addOptionValue(req: Request, res: Response, next: NextFunction) {
  ProductOptionValuesService.addOptionValue(
    req.params.productId,
    req.params.optionId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateOptionValue(req: Request, res: Response, next: NextFunction) {
  ProductOptionValuesService.updateOptionValue(
    req.params.productId,
    req.params.optionId,
    req.params.valueId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function deleteOptionValue(req: Request, res: Response, next: NextFunction) {
  ProductOptionValuesService.deleteOptionValue(
    req.params.productId,
    req.params.optionId,
    req.params.valueId
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function getVariants(req: Request, res: Response, next: NextFunction) {
  ProductVariantsService.getVariants(req.params.productId)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function addVariant(req: Request, res: Response, next: NextFunction) {
  ProductVariantsService.addVariant(req.params.productId, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function updateVariant(req: Request, res: Response, next: NextFunction) {
  ProductVariantsService.updateVariant(
    req.params.productId,
    req.params.variantId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function deleteVariant(req: Request, res: Response, next: NextFunction) {
  ProductVariantsService.deleteVariant(
    req.params.productId,
    req.params.variantId
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function setVariantOption(req: Request, res: Response, next: NextFunction) {
  ProductVariantsService.setVariantOption(
    req.params.productId,
    req.params.variantId,
    req.body
  )
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

export default router
