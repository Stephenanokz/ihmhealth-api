const router = require("express").Router();
const Post = require("../models/Post");
const verify = require("../middlewares/verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to make posts!");
  }
});

// //GET RANDOM
// router.get("/random", verify, async (req, res) => {
//   const type = req.query.type;
//   let post;
//   try {
//     if (type === "series") {
//       post = await Post.aggregate([
//         { $match: { isSeries: true } },
//         { $sample: { size: 1 } },
//       ]);
//     } else {
//       post = await Post.aggregate([
//         { $match: { isSeries: false } },
//         { $sample: { size: 1 } },
//       ]);
//     }
//     res.status(200).json(movie);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ONE
router.get("/find/:id", verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const posts = query
      ? await Post.find().sort({ _id: -1 }).limit(10)
      : await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to update posts!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Post has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;