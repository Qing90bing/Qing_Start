import asyncio
from playwright.async_api import async_playwright, expect, Route
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        file_path = os.path.abspath('index.html')
        page_url = f'file://{file_path}'

        # --- Test 1: Capture the preloader by blocking the image load ---

        # Block requests to the image services to keep the preloader visible
        async def block_background_images(route: Route):
            if "source.unsplash.com" in route.request.url or "picsum.photos" in route.request.url:
                await route.abort()
            else:
                await route.continue_()

        await page.route("**/*", block_background_images)

        await page.goto(page_url)

        # Verify the preloader is visible
        preloader_icon = page.locator("#preloader-icon")
        await expect(preloader_icon).to_be_visible()

        # The background should be white, let's check the preloader div
        preloader_div = page.locator("#preloader")
        await expect(preloader_div).to_have_css("background-color", "rgb(255, 255, 255)")

        # Take a screenshot of the preloader
        await page.screenshot(path="jules-scratch/verification/verification-step1-preloader.png")

        # --- Test 2: Capture the final state after normal loading ---

        # Unroute to allow images to load normally
        await page.unroute("**/*", block_background_images)
        await page.reload()

        # Wait for the main content to become visible
        main_content = page.locator("#main-content")
        await expect(main_content).to_be_visible(timeout=30000)

        # Verify the preloader is now hidden
        await expect(preloader_div).to_be_hidden()

        # Wait for fade-in to complete
        await page.wait_for_timeout(1000)

        # Take a screenshot of the final page
        await page.screenshot(path="jules-scratch/verification/verification-step2-final.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
