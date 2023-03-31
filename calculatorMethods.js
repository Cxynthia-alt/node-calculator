class calculatorMethods {
  constructor(nums) {
    this.nums = nums
  }

  mean() {
    return this.nums.reduce((a, b) => a + b) / this.nums.length
  }

  median() {
    this.nums = this.nums.sort((a, b) => a - b)
    const mid = Math.floor(this.nums.length / 2)
    return this.nums.length % 2 !== 0 ? this.nums[mid] : (this.nums[mid - 1] + this.nums[mid]) / 2
  }

  mode() {
    let modeMap = {}
    let maxItem = this.nums[0], count = 1;
    for (let i = 0; i < this.nums.length; i++) {
      let item = this.nums[i]
      if (!modeMap[item]) {
        modeMap[item] = 1
      } else {
        modeMap[item]++
      }
      if (modeMap[item] > count) {
        maxItem = item
        count = modeMap[item]
      }
    }
    return maxItem
  }

}


module.exports = calculatorMethods
