const express = require('express');
const fs = require('fs');


const app = express();
app.use(express.json());

app.post('/',(req,res) => {
  console.log(req.body.data)
  fs.writeFileSync('abc.txt', JSON.stringify(req.body.data));
});

app.listen(8080,()=>{
    console.log("server running at 8080");
});