const multer =require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'img/')
    },
    filename:function(req,file,callback){
            req.imageName=`${Date.now()}-${file.originalname}`;
        callback(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:storage})

module.exports=upload