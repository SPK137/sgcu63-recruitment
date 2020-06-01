# Problem#1 - The Scraper

## Project Dependencies
- node.js
- puppeteer
- xpath
- xmldom
- fs

## Usage
Use npm to install all dependencies
```bash
npm install
```
Execute script in command-line tool
```bash
node index.js
```

## Solution

- As scraping some links in [the target page](https://rubnongkaomai.com/baan/) require interacting with the page, I decided to use **puppeteer** to click on the page and obtain necessary information (links to all Baans)
- Afterwards, I use **xpath** and **xmldom** to find names and slogans in each page
and use **fs** to write **table.html**