const { url } = require("inspector")
const{JSDOM}= require('jsdom')
async function crawlPage(baseURL,currentURL,pages){
    
    const baseURlObj=new URL(baseURL);
    const currentURLObj= new URL(currentURL);
    if(baseURL.hostname!=currentURL.hostname){
        return pages
    }
    const normalizedCurrentURL=normalizeURL(currentURL);
    if(pages[normalizedCurrentURL]>0){
        pages[normalizedCurrentURL]++;
        return pages;
    }
    pages[normalizedCurrentURL]=1;
    console.log(`active crawling: ${currentURL}`)
    try{
        const resp= await fetch(currentURL)
        if(resp.status>399){
            console.log(`error with status code: ${resp.status} on page: ${currentURL}`)
            return
        }
        const header=resp.headers.get("Content-type")
        if(!header.includes("text/html")){
            console.log(`non html response, content type ${header} on page: ${currentURL}`)
            return pages
        }
        const htmlBody=await resp.text();
        nextURLs=getURLfromHTML(htmlBody, baseURL);
        for(nexturl of nextURLs){
       pages= await crawlPage(baseURL, nexturl,pages)
        }   
     
    }catch(err){
        console.log(`error in fetch: ${err}`);
        
    }
    return pages
   
}
function getURLfromHTML(htmlBody,baseURL){
    const urls=[]
    const dom= new JSDOM(htmlBody)
    const linkElements=dom.window.document.querySelectorAll("a");
    for(const linkElement of linkElements){
       if(linkElement.href.slice(0,1)==='/'){
        try{
        const urlObj=new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href);
        }catch(err){
            console.log(`error with relative url: ${err.message}`)
        }
       }else{
        try{
        const urlObj=new URL(`${linkElement.href}`)
        urls.push(urlObj.href);
        }catch(err){
            console.log(`error with absolute url: ${err.message}`)
        }
       }
        
      
    }
    return urls
}
function normalizeURL(URLstring){
    const urlObject=new URL(URLstring);
const hostpath= `${urlObject.hostname}${urlObject.pathname}`
if(hostpath.length>0&&hostpath.slice(-1)==='/'){
    return hostpath.slice(0,-1);
}
return hostpath;
}

module.exports = { normalizeURL,getURLfromHTML,crawlPage};
