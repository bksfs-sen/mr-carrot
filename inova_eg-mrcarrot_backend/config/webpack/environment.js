const { environment } = require('@rails/webpacker')

environment.plugins.prepend('jquery', jquery)
module.exports = environment
const { environment } = require('@rails/webpacker')
const jquery = require('./plugins/jquery')
