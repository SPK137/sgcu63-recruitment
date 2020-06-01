const siteUrl = "https://rubnongkaomai.com"
const xpath = require('xpath')
const dom = require('xmldom').DOMParser
const puppeteer = require('puppeteer')
const fs = require('fs')

const tabListSelector="#___gatsby > div > div > div.navigationBar-module--wrapper--3ZXv4 > div.navigationBar-module--whole-content--3CsON > div.baanGallery-module--gallery-app--2l-Y5 > div > div.ant-tabs-bar.ant-tabs-left-bar.ant-tabs-large-bar > div > div > div > div > div:nth-child(1)"

const getResult = async () => {
  
  var baanUrlList = []

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({
    width: 1080,
    height: 920
  })
  await page.goto(siteUrl+'/baan/')

  for(var tabIndex=1 ; tabIndex<=4 ; tabIndex++){
    await page.click(tabListSelector+`> div:nth-child(${tabIndex})`)
    var pageContent = await page.content()
    var tree = new dom({errorHandler: { warning: function (w) { }}}).parseFromString(pageContent)
    const urlPath = `//*[@class="baanGallery-module--gallery-app--2l-Y5"]/div[1]/div[3]/div[${tabIndex}]/div[2]/div[@class="ant-col ant-col-8"]/a/@href`
    var node = xpath.select(urlPath, tree)
    
    for(var j=0 ; j<node.length ; j++){
      baanUrlList.push(node[j].value)
    }   
  }
  baanUrlList.sort()
  resultString =  `<!DOCTYPE html>
                   <html>
                    <head>
                      <meta charset="utf-8">
                      <style>
                        table, th, td{
                          border-collapse: collapse;
                          border : 1px solid #000000;
                        }
                      </style>
                    </head>
                    <body>
                      <table>
                        <tr>
                          <th>ชื่อบ้าน</th>
                          <th>สโลแกน</th>
                        </tr>
  `
  const baanNameXPath = '//*[@class="baan-info-module--text-wrapper--uuYTz"]/div/h1[1]/text()'
  const baanSloganXPath = '//*[@class="baan-info-module--text-wrapper--uuYTz"]/div/h3[1]/text()'

  for(var i=0 ; i<baanUrlList.length ; i++){
  
    await page.goto(siteUrl+baanUrlList[i])
    pageContent = await page.content()
    tree = new dom({errorHandler: { warning: function (w) { }}}).parseFromString(pageContent, "text/xml")
    
    var baanNameNode = xpath.select(baanNameXPath, tree)
    var baanName = ""
    
    for(var idx in baanNameNode){
      baanName = baanName.concat(baanNameNode[idx].nodeValue)
    }

    var baanSloganNode = xpath.select(baanSloganXPath, tree)
    var baanSlogan = ""
    
    for(var idx in baanSloganNode)
      baanSlogan = baanSlogan.concat(baanSloganNode[idx].nodeValue+"<br/>")
    
      resultString = resultString.concat(`<tr><td>${baanName}</td><td>${baanSlogan}</td></tr>`)
  }

  browser.close()
  resultString = resultString.concat('</table></body></html>')

  fs.writeFile('table.html', resultString,(err)=>{
    if(err)
      console.log(err)
  })
  
}

getResult().then(()=>console.log("Scraping Successful!"))