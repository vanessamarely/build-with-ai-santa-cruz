# Deck HTML Project

Small static web project for presenting image decks and slides.

## Overview

This repository contains a lightweight HTML/CSS/JS project that renders a deck of images and supports simple image-slot components. It is intended as a small demo or starting point for building interactive image decks.

## Demo / Run

Open `index.html` in your browser, or serve the folder with a simple HTTP server:

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Features

- Image deck rendering
- Reusable `image-slot` component
- Lightweight, dependency-free JavaScript

## Project files

- `index.html` — main HTML page and demo
- `styles.css` — project styles
- `main.js` — initialization and app logic
- `deck-stage.js` — deck stage component
- `image-slot.js` — image slot component
- `assets/` — static assets used by the demo
- `uploads/` — (optional) place images here for testing

## Usage

- Add images to the `uploads/` folder or `assets/` and refresh the page.
- Edit `deck-stage.js` and `image-slot.js` to modify component behavior.
- Use Live Server (VS Code) or the Python HTTP server above for development.

## Development

- Recommended: open the project in VS Code and use Live Server extension for instant reloads.
- Keep JS modular and avoid global state when extending components.

## Contributing

Feel free to open issues or submit pull requests with improvements or fixes.

## License & Credits

This project is provided as-is. Feel free to reuse code; include attribution where appropriate.

---

Built for quick demos and learning.
