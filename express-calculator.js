const express = require('express');
const ExpressError = require('./expressError')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


debugger
app.get('/mean', (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      throw new ExpressError("Nums are required", 404)
    }
    let { nums } = req.query
    nums = nums.split(',').map(a => +a)
    const isNumValid = nums.every(a => Number.isNaN(a) === false)
    if (!isNumValid) {
      throw new ExpressError("invalid number", 404)
    }
    const value = nums.reduce((a, b) => a + b) / nums.length
    const response = {
      "operation": "mean"
    }
    response["value"] = value
    return res.json(response)
  } catch (e) {
    next(e)
  }


})

app.post('/register', (req, res) => {
  res.send(req.body)
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
