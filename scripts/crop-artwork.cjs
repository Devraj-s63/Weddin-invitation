const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200 });

    const imgData = fs.readFileSync('public/images/user-reference-design.jpg').toString('base64');
    await page.evaluate((b64) => {
      window.b64 = b64;
    }, imgData);

    const result = await page.evaluate(async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = 'data:image/jpeg;base64,' + window.b64;
        img.onload = () => {
          const cFort = document.createElement('canvas');
          const fortY = 854; // completely below the page text
          const fortH = 75;
          cFort.width = img.width;
          cFort.height = fortH;
          const ctxFort = cFort.getContext('2d');
          ctxFort.drawImage(img, 0, fortY, img.width, fortH, 0, 0, img.width, fortH);

          // Feather top 8 pixels softly
          const imgDataFort = ctxFort.getImageData(0, 0, cFort.width, cFort.height);
          for (let y = 0; y < 8; y++) {
            const factor = y / 8;
            for (let x = 0; x < cFort.width; x++) {
              const idx = (y * cFort.width + x) * 4;
              imgDataFort.data[idx + 3] = Math.round(imgDataFort.data[idx + 3] * factor);
            }
          }
          ctxFort.putImageData(imgDataFort, 0, 0);

          resolve({
            fort: cFort.toDataURL('image/png')
          });
        };
      });
    });

    fs.writeFileSync('public/images/fort-bougainvillea-footer.png', Buffer.from(result.fort.replace(/^data:image\/png;base64,/, ''), 'base64'));
    console.log('Zero-text fort-bougainvillea-footer.png created successfully!');
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
