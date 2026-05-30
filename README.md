# Drug Board

Drug Board is a lightweight prototype for a ranked drug discovery news board plus an annotation and publishing tool. The workflow is simple: ingest updates from a curated set of sources, rank them transparently, highlight important words inside each story, and turn the annotated news list into publish-ready Facebook, X, and WeChat output.

## What is included

- A curated source catalog in [data/sources.json](C:\Users\shida\OneDrive\Documents\New project 2\data\sources.json)
- Sample ranked stories in [data/news.json](C:\Users\shida\OneDrive\Documents\New project 2\data\news.json)
- A polished static board UI in [index.html](C:\Users\shida\OneDrive\Documents\New project 2\index.html), [styles.css](C:\Users\shida\OneDrive\Documents\New project 2\styles.css), and [app.js](C:\Users\shida\OneDrive\Documents\New project 2\app.js)
- An annotation workflow that lets you select terms from a story and highlight them
- A simple glossary under each story with highlighted terms, IPA, and short explanations
- Publishing output for Facebook, X, and bilingual WeChat

## Curated source strategy

Start with a mix of primary and secondary sources:

- `Regulators`: FDA newsroom for approvals, safety changes, and official announcements.
- `Research institutions`: NIH news for funded breakthroughs and translational science.
- `Clinical data`: ClinicalTrials.gov for trial status and endpoint changes.
- `Primary literature`: PubMed and top journals like Nature Biotechnology for papers and methods.
- `Industry reporting`: STAT for strategy, financing, and competitive context.
- `Aggregation`: Drugs.com RSS as a lower-trust but useful monitoring layer.

## Ranking logic

Each story gets a score from five ingredients:

1. `Source trust` weighted at 28%
2. `Drug discovery relevance` weighted at 24%
3. `Clinical or platform impact` weighted at 20%
4. `Novelty` weighted at 16%
5. `Freshness` weighted at 12%

This is intentionally transparent so users can understand why one story appears above another.

## News card format

Each card should follow this structure:

- One sentence headline that highlights the news
- One sentence summary that explains why it matters
- Tags for modality, disease, or milestone
- Direct link to the original source

## Annotation workflow

The current app includes an annotation and publishing section below the board.

How to use it:

1. Scan the ranked stories in the board.
2. Select a word or short phrase inside a news headline or summary.
3. Click `Add highlight`.
4. The selected term will appear below that story with:
   - a highlight marker in the text
   - a simple explanation
   - an IPA pronunciation
5. Use the output tabs to copy:
   - Facebook-ready text
   - X-ready thread text
   - WeChat-ready bilingual text

The WeChat output includes:

- English news
- Chinese version immediately after each English item
- highlighted terms and glossary notes
- source links

## Publishing note

This version creates publish-ready text locally, but it does **not** directly post to Facebook, X, or WeChat yet.

That last step usually requires:

- authenticated account access
- a connected publishing API or automation tool
- platform-specific approval and rate-limit handling

## How to run locally

The quickest path is to open [index.html](C:\Users\shida\OneDrive\Documents\New project 2\index.html) directly in a browser. The board includes embedded fallback data, so the prototype still renders even if the browser blocks local JSON fetches.

If you want the page to read the editable JSON files directly, serve it from a tiny local server.

Example:

```powershell
py -m http.server 8000
```

Then open:

- [http://localhost:8000](http://localhost:8000)

If `py` is not available on your machine, any simple static server will work.

## Suggested next build step

The next practical step is a small backend job that:

1. Pulls items from your defined sources on a schedule
2. Deduplicates similar stories
3. Uses an LLM to compress each story into one sentence
4. Saves the scored results back into `data/news.json` or a database
5. Optionally pushes the generated content into Facebook, X, and WeChat publishing workflows if you connect platform credentials

## Free internet deployment

This project is now prepared for a free GitHub-based deployment path:

- `GitHub Pages` for the public website
- `GitHub Actions` for the daily news refresh

Files added for this:

- `.github/workflows/deploy-pages.yml`
- `.github/workflows/update-news.yml`

How it works:

1. Push this project to a **public GitHub repository**
2. In GitHub, enable **Pages** and choose **GitHub Actions** as the build and deploy source
3. The `Deploy Drug Board` workflow publishes the site
4. The `Update Drug Board News` workflow refreshes `data/news.json` and `data/update-meta.json` every day
5. That daily commit triggers a fresh Pages deployment automatically

Important notes:

- This free path works best with a **public repository**
- GitHub scheduled workflows use **UTC** time
- Scheduled workflows can be delayed during busy periods
- In public repositories, scheduled workflows are automatically disabled after **60 days of no repository activity**. In this project, the daily update workflow creates a commit whenever the data changes, which helps keep the repository active

What to use publicly:

- `board.html` is the public-facing daily-updated page
- `index.html` remains the internal/editorial workspace page

## Source notes

The current source list uses these links as starting points:

- FDA Newsroom: [https://www.fda.gov/news-events/fda-newsroom](https://www.fda.gov/news-events/fda-newsroom)
- NIH News Releases: [https://www.nih.gov/news-events/news-releases](https://www.nih.gov/news-events/news-releases)
- ClinicalTrials.gov: [https://clinicaltrials.gov/](https://clinicaltrials.gov/)
- PubMed: [https://pubmed.ncbi.nlm.nih.gov/](https://pubmed.ncbi.nlm.nih.gov/)
- Nature Biotechnology: [https://www.nature.com/nbt/](https://www.nature.com/nbt/)
- STAT Biotech: [https://www.statnews.com/topic/biotech/](https://www.statnews.com/topic/biotech/)
- Drugs.com RSS: [https://www.drugs.com/rss.html](https://www.drugs.com/rss.html)
