const router = require("express").Router();
const Landing = require("../models/Landing");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newLandingText = new Landing(req.body);
    try {
      const savedLandingText = await newLandingText.save();
      res.status(200).json(savedLandingText);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to make landing text!");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const landingText = await Landing.findById(req.params.id);
    res.status(200).json(landingText);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const landingText = await Landing.find();
    res.status(200).json(landingText);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedLandingText = await Landing.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedLandingText);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update landing text!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Landing.findByIdAndDelete(req.params.id);
      res.status(200).json("Landing text has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;