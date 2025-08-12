import asyncio
from playwright.async_api import async_playwright, expect, Route
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        file_path = os.path.abspath('index.html')
        page_url = f'file://{file_path}'

        async def block_background_images(route: Route):
            if "source.unsplash.com" in route.request.url or "picsum.photos" in route.request.url:
                await route.abort()
            else:
                await route.continue_()

        await page.route("**/*", block_background_images)

        await page.goto(page_url)

        preloader_icon = page.locator("#preloader-icon")
        await expect(preloader_icon).to_be_visible()

        preloader_div = page.locator("#preloader")
        await expect(preloader_div).to_have_css("background-color", "rgb(255, 255, 255)")

        await page.screenshot(path="jules-scratch/verification/verification-preloader.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
