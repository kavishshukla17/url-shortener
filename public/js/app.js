const form = document.getElementById('shorten-form');
const urlInput = document.getElementById('url-input');
const submitBtn = document.getElementById('submit-btn');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');
const shortUrlEl = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  resultEl.hidden = true;
}

function showResult(shortUrl) {
  errorEl.hidden = true;
  shortUrlEl.textContent = shortUrl;
  shortUrlEl.href = shortUrl;
  resultEl.hidden = false;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const url = urlInput.value.trim();
  if (!url) {
    showError('Please enter a URL.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Shortening...';

  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.error || 'Something went wrong.');
      return;
    }

    showResult(data.short_url);
  } catch {
    showError('Could not reach the server.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Shorten';
  }
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(shortUrlEl.href);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1500);
  } catch {
    showError('Could not copy to clipboard.');
  }
});
