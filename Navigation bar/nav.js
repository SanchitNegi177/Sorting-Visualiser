// Add active-state highlighting for nav buttons (Home / About / Contact)
// This script finds the last path segment of the current URL and the
// nav anchor hrefs, then applies the `.tab-locator-clr` class to the
// matching button so the active page appears highlighted.

function _setActiveNavButton() {
	try {
		const anchors = document.querySelectorAll('.navbar2 a');
		const locPath = window.location.pathname || '';
		const locSeg = locPath.split('/').filter(Boolean).pop() || 'index.html';

		anchors.forEach(a => {
			try {
				const aPath = new URL(a.href, window.location).pathname;
				const aSeg = aPath.split('/').filter(Boolean).pop() || 'index.html';
				const btn = a.querySelector('button');
				if (!btn) return;
				if (aSeg === locSeg) {
					btn.classList.add('tab-locator-clr');
				} else {
					btn.classList.remove('tab-locator-clr');
				}
			} catch (e) {
				// ignore malformed hrefs
			}
		});
	} catch (e) {
		// fail silently if nav not present
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', _setActiveNavButton);
} else {
	_setActiveNavButton();
}

// Export for manual invocation in pages if needed
window.setActiveNavButton = _setActiveNavButton;
