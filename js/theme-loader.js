// IIFE to set the theme class on the HTML element as early as possible
(function() {
    try {
        // 1. Get theme from localStorage, default to 'auto'
        const theme = localStorage.getItem('theme') || 'auto';

        // 2. Check if dark mode should be applied
        if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            // 3. Apply the .dark class to the <html> element
            document.documentElement.classList.add('dark');
        }
    } catch (e) {
        // In case of any error (e.g., localStorage access denied), do nothing to avoid breaking the page.
        console.error('Error applying initial theme:', e);
    }
})();
