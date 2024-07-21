const mongoose = require('mongoose');

const formInputSchema = new mongoose.Schema({
  type: String,
  title: String,
  placeholder: String,
});

const formSchema = new mongoose.Schema({
  title: String,
  inputs: [formInputSchema],
},
{
  timestamps:true,
  versionKey:false
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
