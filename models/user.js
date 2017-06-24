var mongoose = require('mongoose')

var familySchema = new mongoose.Schema({
  name: String,
  birthdate: Date,
})

var UserSchema = new mongoose.Schema({
  fb_id: {
    type: String,
    required: true,
    index: true,
    unique: true,
    dropDups: true
  },
  family: [familySchema]
})

var User = mongoose.model('User', UserSchema)

module.exports = User
