const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const dataModel = require("../models/dataModel");

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    return res.status(200).json(forms);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting the form...",
      error,
    });
  }
});

// Create a new form
router.post("/", async (req, res) => {
  try {
    const form = await Form.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Form created Succefully...",
      form,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while Creating the form...",
      error,
    });
  }
});

// Get a specific form
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    return res.status(200).json(form)
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting the form by id...",
      error,
    });
  }
});

// Update a form
router.put("/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send({
      success: true,
      message: "form updated successfully...",
      form,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updatting the form by id...",
      error,
    });
  }
});

// Update a form
router.delete("/:id", async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "form or form by id deleted Successfully...",
      form,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting the form by id...",
      error,
    });
  }
});

// submit form data

router.post("/submit", async (req, resp) => {
  try {
    const formData = await dataModel.create(req.body);
    return resp.status(201).send({
      success: true,
      message: "Form Data submitted",
      formData,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).send({
      error,
    });
  }
});
module.exports = router;
