function printReport(pages){
    console.log("======")
    console.log("REPORT")
    sortPages(pages);
    for( constpage of Object.entries(pages)){
        const url=sortPages[0]
        const hit=sortPages[1]
        console.log(`found ${hit} links to page ${url}`);
    }
}
function sortPages(pages){
const pageArr=Object.entries(pages)
pageArr.sort((a,b)=>{
    ahits=a[1]
    bhit=b[1]
    return b[1]-a[1]
})

return pageArr
}
module.exports={sortPages,printReport}