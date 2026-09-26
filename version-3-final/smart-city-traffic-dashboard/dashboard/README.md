# Smart City Traffic Analytics — Dashboard

A local, interactive dashboard built from the results of your `final-bda-project2.ipynb`
notebook (PySpark MapReduce, KMeans congestion clustering, GPT-2 traffic-scenario
simulation, STRIDE security analysis, and future hotspot prediction on the 204,000-row
CityFlow smart-urban-mobility dataset).

**Note on data:** the raw CSV lives only inside Kaggle's `/kaggle/input/...` path used
in the notebook, so this app runs on the *results* the notebook already computed
(the numbers, tables and charts your cells produced), not a live re-run of Spark. The
6 chart images are pulled directly from your notebook's saved output. Every table
(MapReduce totals, cluster breakdown, GPT scenarios, STRIDE risks, future hotspots) is
fully interactive — searchable and sortable — using the exact figures from your run.

## What's inside

```
dashboard/
├── app.py                  Flask server (2 routes: page + JSON API)
├── data.json                All extracted results from the notebook
├── requirements.txt
├── templates/index.html     Single-page dashboard
├── static/css/style.css     Styling (dark "traffic control room" theme)
├── static/js/dashboard.js   Renders tables/cards, search, sort, scroll-spy nav
└── static/images/           6 charts extracted from the notebook's saved outputs
```

## Run it

1. Make sure you have Python 3.9+ installed.
2. Open a terminal in this folder and install the one dependency:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   python app.py
   ```
4. Open your browser to:
   ```
   http://127.0.0.1:5000
   ```

That's it — no database, no build step. Stop the server with `Ctrl+C`.

## What you'll see

- **Overview** — headline stats (records, intersections, zones, peak hour)
- **MapReduce** — per-intersection totals, searchable + sortable table
- **Clustering** — KMeans Low/Medium/High congestion cards + sample predictions
- **Trends** — hourly/weekly volume charts, hotspot map, speed-vs-volume scatter
- **Forecast** — the 3 GPT-2 generated traffic scenarios as cards + chart
- **Security** — STRIDE threat table + recommended security architecture layers
- **Hotspots** — top 10 predicted future congestion hotspots, sortable table

## Making it live (optional next step)

If you'd rather have this recompute from the *actual* CSV instead of the notebook's
saved results, download the CityFlow dataset locally, point `dataset_path` in Cell 1
at the local file instead of the Kaggle path, and I can wire `app.py` up to run the
PySpark/KMeans pipeline on request (or cache it to a fresh `data.json`) instead of
reading the static file. Just ask.
