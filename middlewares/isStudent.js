
export const IsStudent = async (req, res, next) => {
try{
    const User=req.user
    console.log(User)
    if(User.role==="Student"){
        next()
    }else{
        res.status(404).json({ status: false, message: "You don't have permission of student route" });
    }
   
    next();
}catch(err){
    console.log(err);
    res.status(500).json({ status: false, message: "Student failed" });
}
};
