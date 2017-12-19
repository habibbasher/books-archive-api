import express from 'express';
const router = express.Router();


router.post("/", (req, res) => {
  // const { credentials } = req.body;
  console.log(`This message is printing from auth route`);
  res.status(200).json({Message: "This route is working."});
});


export default router;
