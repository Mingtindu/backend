import { Router } from "express";
const router = Router();
router.route('/').get((req,res)=>{
    res.send("THis is user route")
})


export default router;
