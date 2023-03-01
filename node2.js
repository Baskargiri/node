const fs = require("fs");
const b = "baskar u can do it"
const no = process.argv[2];

for(let i = 1 ; i< no ; i++){
    fs.writeFile(`./new${i}.html`,b,(em)=>{
        console.log('boss')
    })
}


