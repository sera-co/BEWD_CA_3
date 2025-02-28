const express=require("express")
const jwt=require("jsonwebtoken")
const app= express()
app.use(express.json())
const SECRET_KEY="jwt_jenova"
const users=[
    {username:"user",password:"user123",role:"user"},
    {username:"admin",password:"admin123",role:"admin"}
]
app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const user=users.find(u=>u.username===username && u.password===password)
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const token=jwt.sign({username:user.username,role:user.role},SECRET_KEY,{"expiresIn":"15m"})
    res.json({token})
})
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"]
    const token=authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"})
    }
    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(401).json({error:"Unauthorized"})
        }
        req.user=user;
        next()
    })

}
const authorize=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.status(403).json({error:"Forbidden"})
    }
    next();
}
app.get('/profile',authenticateToken,(req,res)=>{
    return res.status(200).json({message:"Welcome to your profile!"})
})
app.get('/admin-dashboard',authenticateToken,authorize,(req,res)=>{
    return res.status(200).json({message:"Welcome to the admin dashboard!"})
})
app.listen(5000,()=>console.log("Server running on port 5000"))