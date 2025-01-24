
export const Isadmin = async (req, res, next) => {
    try{
        const User=req.user
        if(User.role==="Admin"){
            next()
        }else{
            res.status(404).json({ status: false, message: "You don't have permission of admin route" });
        }
       
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({ status: false, message: "Admin failed" });
    }
    };
    