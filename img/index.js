const express = require('express')
const app = express()
const port = 3002
const ejs = require('ejs')
const multer = require('multer')
const path = require('path')
var cors = require('cors')

app.use(cors())

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      //cb(null,file.originalname);
      cb(null,file.fieldname+path.extname(file.originalname));
    }
  })

  // Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single(file.fieldname);


// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: .jpg Only!');
    }
  }

app.post('/upload', (req, res) => {
  const returnObj = {
    status:1,
    msg:"Error uploading image"
  }
    upload(req, res, (err) => {
      //console.log(req.file)
      if(err){
        // res.render('index', {
        //   msg: err
        // });
        res.status(500).json(returnObj)
      } else {
        if(req.file == undefined){
          // res.render('index', {
          //   msg: 'Error: No File Selected!'
          // });
          res.status(500).json(returnObj)
        } else {
          // res.render('index', {
          //   msg: 'File Uploaded!',
          //   file: `uploads/${req.file.filename}`
          // });
          returnObj.status = 0
          returnObj.msg = "Successfully uploaded image"
          res.status(200).json(returnObj)
        }
      }
    })
  })

app.get('/show/:name',(req,res)=>{
    var img_name = req.params.name
    var path = "./public/uploads/"+img_name+".jpg";

    console.log("fetching image: ", path);
    res.sendFile(path, { root: __dirname});
})
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})