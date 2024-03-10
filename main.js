 const {crawlPage} = require("../learnHTTPs/craw")
 const { printReport}=require("../learnHTTPs/report")
  function main(){
  if(process.argv.length<3){
    console.log("no website provided")
    process.exit(1);
    }
    if(process.argv.length>3){
      console.log(" too many command line args")
      process.exit(1);
      }
      const baseURL=process.argv[2];
    for( const arg of process.argv){
      console.log(arg);
    }
    console.log(`start crawl of ${baseURL}`)
    
     const pages= crawlPage(baseURL,baseURL,{});
     printReport(pages);
    
  }

 main() 
