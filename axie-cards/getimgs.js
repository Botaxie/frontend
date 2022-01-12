var https = require('https'),                                                
Stream = require('stream').Transform,                                  
fs = require('fs');                                                    

let data = require("./axie-cards.json");

data.forEach(e=>{
    var url = e.imgSrc;                    
    var arr = e.imgSrc.split("/");
    var name = arr[arr.length - 1];
    https.request(url, function(response) {                                        
        var data = new Stream();                                                    
        
        response.on('data', function(chunk) {                                       
            data.push(chunk);                                                         
        });                                                                         
        
        response.on('end', function() {                                             
            fs.writeFileSync(name, data.read());                               
        });                                                                         
    }).end();
    
})
