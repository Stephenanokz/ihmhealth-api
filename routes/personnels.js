const router = require("express").Router();
const Personnel = require("../models/Personnel");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newPersonnel = new Personnel(req.body);
    try {
      const savedPersonnel = await newPersonnel.save();
      res.status(200).json(savedPersonnel);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to create a personnel!");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const personnel = await Personnel.findById(req.params.id);
    res.status(200).json(personnel);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const personnels = await Personnel.find();
    res.status(200).json(personnels);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedPersonnel = await Personnel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedPersonnel);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update a personnel!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Personnel.findByIdAndDelete(req.params.id);
      res.status(200).json("Personnel has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;