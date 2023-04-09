const router = require("express").Router();
const About = require("../models/About");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newAboutItem = new About(req.body);
    try {
      const savedAboutItem = await newAboutItem.save();
      res.status(200).json(savedAboutItem);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to make about content!");
  }
});

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const aboutItem = await About.findById(req.params.id);
    res.status(200).json(aboutItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const aboutItem = await About.find();
    res.status(200).json(aboutItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedAboutItem = await About.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedAboutItem);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update about content!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await About.findByIdAndDelete(req.params.id);
      res.status(200).json("About content has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;