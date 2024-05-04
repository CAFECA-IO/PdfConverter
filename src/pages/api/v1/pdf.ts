import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

async function htmlToPDF(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' }
  });

  await browser.close();
  return pdf;
}

// API 处理函数，使用上面定义的函数
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query as { url: string };
  const pdfBuffer = await htmlToPDF(url);
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
}