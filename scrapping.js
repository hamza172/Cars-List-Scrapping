const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


async function start(url,fields){
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: require('puppeteer').executablePath()
    })
    const page = await browser.newPage()
    await page.goto(url)
    let object = {}
    const data = await page.evaluate(()=> {
        const data1 = Array.from(
            document.querySelectorAll("body > main > div.Table_Data > div.Data > div > div > table > tbody > tr > td:nth-child(2)")
          ).map((image) => image.textContent);
        
        return data1
    })    
    const dat = data
    for (let i=0;i<fields.length;i++){
        object[fields[i]] = dat[i]
    }
    await page.close()
    await browser.close()
    return object
}

async function scrapping(id){
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: require('puppeteer').executablePath()
    })
    const page = await browser.newPage()
    let result = {}
    await page.goto('https://qesot.com/cars/en/product/'+id+'/')
    const data = await page.evaluate(()=> {
        const  data = document.querySelectorAll("body > main > div.Table_Data > div.Data > div > div > table > tbody > tr > td:nth-child(1)")
        let fields= []
        for (let i=0;i<data.length;i++){
            let v = data[i].textContent.replace(/ /g, '');
            v = v.replace(/\n/g, '');
            v = v.replace(".", '');
            fields.push(v)
        }
            
        const srcs = Array.from(
            document.querySelectorAll(".product_box .Screenshots .ImgBox img")
          ).map((image) => image.getAttribute("src"));
        return {"images": srcs,"fields": fields}
    })    
    result['images'] = data.images
    let fields = data.fields
    await page.close()
    await browser.close()

    let languages = ['en','fr','es','ru','de','it','gr','tr','ro','fi','se','no','pl']
    for (let i=0;i<languages.length;i++){
        result[languages[i]] = await start('https://qesot.com/cars/'+languages[i]+'/product/'+id+'/',fields)
    }
    return result
}

module.exports = scrapping

