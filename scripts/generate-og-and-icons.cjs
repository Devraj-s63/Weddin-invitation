const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true
    });

    const page = await browser.newPage();
    const dmMonogramB64 = fs.readFileSync('public/images/royal-dm-monogram.webp').toString('base64');

    if (!fs.existsSync('public/icons')) {
      fs.mkdirSync('public/icons', { recursive: true });
    }

    const iconHtml = (size, paddingPercent = 0) => `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, #4A0A14 0%, #1A0408 100%); overflow: hidden; border-radius: ${paddingPercent > 0 ? '0' : '22%'};">
        <div style="width: ${size * (1 - paddingPercent)}px; height: ${size * (1 - paddingPercent)}px; border-radius: 50%; padding: ${Math.max(2, size * 0.02)}px; background: linear-gradient(135deg, #FFE9B8, #D4AF37, #855E24); box-shadow: 0 4px 20px rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;">
          <img src="data:image/webp;base64,${dmMonogramB64}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
        </div>
      </body>
      </html>
    `;

    // 1. icon-192.png
    await page.setViewport({ width: 192, height: 192 });
    await page.setContent(iconHtml(192, 0.08), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: 'public/icons/icon-192.png', type: 'png' });
    console.log('Saved public/icons/icon-192.png');

    // 2. icon-512.png
    await page.setViewport({ width: 512, height: 512 });
    await page.setContent(iconHtml(512, 0.06), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: 'public/icons/icon-512.png', type: 'png' });
    console.log('Saved public/icons/icon-512.png');

    // 3. icon-maskable.png
    await page.setContent(iconHtml(512, 0.22), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: 'public/icons/icon-maskable.png', type: 'png' });
    console.log('Saved public/icons/icon-maskable.png');

    // 4. apple-touch-icon.png
    await page.setViewport({ width: 180, height: 180 });
    await page.setContent(iconHtml(180, 0.05), { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: 'public/apple-touch-icon.png', type: 'png' });
    console.log('Saved public/apple-touch-icon.png');

    await browser.close();
    console.log('All icons generated successfully!');
  } catch (e) {
    console.error(e);
  }
})();
