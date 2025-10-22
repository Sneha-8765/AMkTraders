

const adminMiddleware= async(req ,res,next)=>{
    try{
        console.log(req.customer);
        const adminRole=req.customer.isAdmin;
        if(!adminRole){

        return res.status(403).json({message:"Access denied .customer is not admin"})};
        next();
    }catch(error){
        next(error);
    }
}
module.exports= adminMiddleware;