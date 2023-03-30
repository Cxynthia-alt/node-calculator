const express = require('express');
const ExpressError = require('./expressError')
const calculatorMethods = require('./calculatorMethods')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.get('/', (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      throw new ExpressError("Nums are required", 404)
    }
    let { nums, operation } = req.query
    nums = nums.split(',').map(a => +a)
    const isNumValid = nums.every(a => Number.isNaN(a) === false)
    if (!isNumValid) {
      throw new ExpressError("invalid number", 404)
    }

    // instantiate calculatorMethodss
    let newInstance = new calculatorMethods(nums)
    let mean = newInstance.mean()
    let median = newInstance.median()
    let mode = newInstance.mode()

    const response = {
      "operation": operation
    }
    if (operation === "all") {
      response["mean"] = mean
      response["median"] = median
      response["mode"] = mode
    }
    if (operation === "mean") {
      response["value"] = mean
    }
    if (operation === "median") {
      response["value"] = median
    }
    else {
      response["value"] = maxItem
    }

    return res.json(response)
  } catch (e) {
    next(e)
  }


})


app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
})

app.use((error, req, res, next) => {
  let status = error.status || 500
  let msg = error.msg
  return res.status(error.status).json({
    error: { msg, status }
  })
})

app.listen(3000, function () {
  console.log('App on port 3000');
})
