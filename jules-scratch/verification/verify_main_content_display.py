import asyncio
from playwright.async_api import async_playwright, expect
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        file_path = os.path.abspath('index.html')
        page_url = f'file://{file_path}'

        await page.goto(page_url)

        main_content = page.locator("#main-content")
        await expect(main_content).to_be_visible(timeout=30000)

        preloader_div = page.locator("#preloader")
        await expect(preloader_div).to_be_hidden(timeout=10000)

        await page.screenshot(path="jules-scratch/verification/verification-final.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
