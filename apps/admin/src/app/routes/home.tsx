import React from "react"
import { defaults } from "react-chartjs-2"
import OrdersBar from "../modules/reports/ordersBar"

// Set charts default
const { global } = defaults
global.responsive = true
global.maintainAspectRatio = false
global.title.display = false
global.legend.position = "bottom"
global.legend.labels.boxWidth = 20
global.tooltips.mode = "index"
global.tooltips.intersect = false
global.tooltips.bodySpacing = 8
global.tooltips.titleMarginBottom = 16

export default () => (
  <div className="scroll col-full-height">
    <OrdersBar />
  </div>
)
