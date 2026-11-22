# 🐝 BeeBloom

A light-blue and lavender, voice-first spelling-bee practice app focused on transferable spelling patterns.

## Run

Serve the repository as static files (`python -m http.server 5173`) and open `http://localhost:5173`, or enable GitHub Pages from the repository root.

## Features

- Hear words and spell aloud using browser speech APIs, or type letters as fallback.
- Ask for a definition, sentence, or repetition before spelling.
- Learn spelling patterns and practice on unseen words.
- Track attempts and active learning time locally on the device.
- Import the copyrighted 450-word study PDF locally in the browser, or use CSV/TXT word lists. PDF extraction uses PDF.js from a CDN. No word lists are committed to the repository.

## Important limitations

Speech recognition can confuse letter names. Always review transcription before scoring. Pronunciation from browser voices needs adult verification on unusual words. Device data is stored in localStorage, with no cloud sync. Browser recognition services may process audio remotely. No microphone recording is intentionally retained by this app.

## Copyright and privacy

The supplied 2026–2027 Scripps list explicitly says it must not be posted to the web. **Do not commit the PDF, extracted list, or its definitions to this public repository.** Use a private local copy. This app is not affiliated with Scripps.

## Development

This is an early prototype, not a validated automatic judge. Practice scores require confirmation, and unseen-word performance should be tracked separately from rehearsed words.
