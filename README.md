# AISim Lab

Interactive machine learning simulations for vocational education – **https://sim.aiforvet.eu**
(Erasmus+ project [AI for VET](https://aiforvet.eu/)).

A static site: plain HTML, CSS and JavaScript modules. No build step, no server code, no database, no cookies.

## Structure

| Path | What |
|---|---|
| `index.html` | Home page with the five simulations |
| `lab.html?sim=<id>` | One simulation with challenges, explanation, share link and Moodle embed code |
| `assets/js/catalog.js` | Simulations, URL options, explanations and challenges |
| `assets/js/i18n.js` | Interface strings (Serbian, English, Slovak, Portuguese) |
| `vendor/aisim/` | Simulation engines, copied from [filter_aisim](https://github.com/blagojevicboban/moodle-filter_aisim) – do not edit here |

The simulations have one source: `filter_aisim/amd/src/sims`. After changing them there, run:

```bash
bash scripts/sync-aisim.sh            # expects ../moodle-filter_aisim
```

## Links

- `lab.html?sim=gradient-descent&profile=convex&lr=0.15&w0=-0.5` – open a simulation with given settings
- `?lang=sr`, `en`, `sk`, `pt` – choose the language (remembered in the browser). The controls inside the simulations are in Serbian or English; Slovak and Portuguese pages show the English simulation.

Simulation ids: `gradient-descent`, `confusion-matrix`, `regression`, `knn-tree`, `kmeans`.

## Run locally

Any static server, for example `python -m http.server 8000` in this folder, then open http://localhost:8000/.
(Opening `index.html` as a file does not work: browsers block JavaScript modules from `file://`.)

## Deploy (Virtualmin)

The site is a git checkout in the `public_html` of `sim.aiforvet.eu`. `.htaccess` hides `.git` and `scripts/` and
redirects to HTTPS.

First time (`public_html` still has the Virtualmin welcome page):

```bash
cd ~/public_html
git init -b main
git remote add origin https://github.com/AIForVet/aisimlab.git
git fetch origin
git reset --hard origin/main
git branch --set-upstream-to=origin/main main
```

Update: `cd ~/public_html && git pull`

## License

GNU GPL v3 or later (the simulation engines come from filter_aisim, GPL v3). Copyright © 2026 Boban Blagojević.
