# Blackjack Card Counter

A lightweight browser-based card counting app for the Hi-Lo system.

## Features

- Track the running count in real time
- Convert to true count based on remaining decks
- Display a simple betting level suggestion
- Add cards with one click
- Undo the last card or reset the shoe
- View the history of all cards counted

## Run locally

1. Open `index.html` in a browser, or
2. Serve the project with a simple local web server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Hi-Lo values

- 2 to 6 = +1
- 7 to 9 = 0
- 10, J, Q, K, A = -1

## Notes

This is a training tool meant for blackjack card-counting education and practice. It does not track actual casino tables or enforce betting rules.
