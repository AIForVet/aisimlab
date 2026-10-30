// One simulation page: lab.html?sim=<id>&<options>
import {lang, t, tr} from './i18n.js';
import {esc, progress, renderChrome} from './common.js';
import {findSim} from './catalog.js';

renderChrome();

const params = new URLSearchParams(location.search);
const sim = findSim(params.get('sim'));
const main = document.getElementById('lab');

const round = (v) => (typeof v === 'number' ? Math.round(v * 1000) / 1000 : v);

let instance = null;
let active = 0;

/** Options from the URL, limited to the ones this simulation knows. */
const urlOptions = () => Object.fromEntries(Object.keys(sim.options)
    .filter((k) => params.has(k)).map((k) => [k, params.get(k)]));

const currentState = () => Object.fromEntries(Object.entries(sim.state(instance)).map(([k, v]) => [k, round(v)]));

const shareUrl = () => {
    const url = new URL(location.href);
    url.search = '';
    url.searchParams.set('sim', sim.id);
    Object.entries(currentState()).forEach(([k, v]) => url.searchParams.set(k, v));
    url.searchParams.set('lang', lang);
    return url.toString();
};

const embedCode = () => {
    const st = currentState();
    const type = sim.embedType ? sim.embedType(st) : sim.id;
    const attrs = Object.entries(st).filter(([k]) => k !== 'model').map(([k, v]) => ` data-${k}="${esc(v)}"`).join('');
    return `<div data-aisim="${type}"${attrs}></div>`;
};

const toast = (msg) => {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el.timer);
    el.timer = setTimeout(() => el.classList.remove('show'), 2500);
};

/** Phone: the active challenge stays in view at the bottom while the student works the simulation. */
const renderGoal = () => {
    const bar = document.getElementById('goal');
    const solved = progress.count(sim);
    const done = progress.has(sim.id, active);
    const allDone = solved === sim.challenges.length;
    bar.classList.toggle('done', done);
    bar.innerHTML = `<span class="badge">${done ? '✓' : active + 1}</span>
        <span class="text"><b>${allDone ? t('allSolved') : `${t('goal')} ${active + 1}/${sim.challenges.length}`}</b>
        ${allDone ? '' : esc(tr(sim.challenges[active].text))}</span>
        <span class="count">${solved}/${sim.challenges.length}</span>`;
};

const renderChallenges = () => {
    renderGoal();
    document.getElementById('challenges').innerHTML = sim.challenges.map((c, i) => {
        const done = progress.has(sim.id, i);
        return `<li class="challenge ${i === active ? 'active' : ''} ${done ? 'done' : ''}">
            <span class="badge">${done ? '✓' : i + 1}</span>
            <span class="text">${esc(tr(c.text))}${done ? ` <em>${t('solved')}</em>` : ''}</span>
            <button type="button" class="btn small" data-load="${i}">${t('load')}</button>
        </li>`;
    }).join('');
};

const onChange = (e) => {
    const c = sim.challenges[active];
    if (c && !progress.has(sim.id, active) && c.check(e.parameters, e.metrics)) {
        progress.mark(sim.id, active);
        renderChallenges();
        toast(`🎉 ${t('solvedToast')}: ${active + 1}/${sim.challenges.length}`);
    }
};

// The simulations' texts, generated from the filter_aisim language files by scripts/sync-aisim.sh.
const simStrings = fetch(new URL(`../../vendor/aisim/strings/${lang}.json`, import.meta.url)).then((r) => r.json());

const mount = async(options) => {
    const [module, strings] = await Promise.all([import(`../../vendor/aisim/sims/${sim.file}`), simStrings]);
    const box = document.getElementById('sim');
    box.innerHTML = '<div class="aisim-host"></div>';
    instance = new module[sim.cls](box.firstChild, {...sim.options, ...options, strings, onChange});
};

if (!sim) {
    main.innerHTML = `<p class="empty">${t('notFound')} <a href="./">${t('home')}</a></p>`;
} else {
    document.title = `${tr(sim.title)} · AISim Lab`;
    const firstOpen = sim.challenges.findIndex((c, i) => !progress.has(sim.id, i));
    active = firstOpen === -1 ? 0 : firstOpen;
    main.innerHTML = `
        <p class="crumbs"><a href="./">← ${t('home')}</a></p>
        <h1>${sim.icon} ${esc(tr(sim.title))}</h1>
        <div class="lab-grid">
            <section class="sim-area">
                <div id="sim"></div>
            </section>
            <aside class="side">
                <div class="panel" id="challenges-panel">
                    <h2>${t('challenges')}</h2>
                    <ol id="challenges" class="challenges"></ol>
                </div>
                <div class="panel">
                    <h2>${t('whatHappens')}</h2>
                    ${tr(sim.about).map((p) => `<p>${esc(p)}</p>`).join('')}
                </div>
                <div class="panel tools">
                    <button type="button" class="btn" id="share">🔗 ${t('share')}</button>
                    <details id="embed">
                        <summary class="btn">🧩 ${t('embed')}</summary>
                        <p class="help">${t('embedHelp')}</p>
                        <pre><code id="embed-code"></code></pre>
                    </details>
                </div>
            </aside>
        </div>
        <button type="button" id="goal" class="goal-bar"></button>
        <div id="toast" class="toast" role="status" aria-live="polite"></div>`;

    renderChallenges();
    const fromUrl = urlOptions();
    await mount(Object.keys(fromUrl).length ? fromUrl : sim.challenges[active].setup);

    document.getElementById('challenges').addEventListener('click', async(e) => {
        const btn = e.target.closest('[data-load]');
        if (!btn) {
            return;
        }
        active = Number(btn.dataset.load);
        renderChallenges();
        await mount(sim.challenges[active].setup);
        history.replaceState(null, '', `?sim=${sim.id}`);
        document.getElementById('sim').scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    document.getElementById('goal').addEventListener('click', () => {
        document.getElementById('challenges-panel').scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    document.getElementById('share').addEventListener('click', async(e) => {
        await navigator.clipboard.writeText(shareUrl());
        toast(`✓ ${t('copied')}`);
        e.currentTarget.blur();
    });
    document.getElementById('embed').addEventListener('toggle', (e) => {
        if (e.target.open) {
            document.getElementById('embed-code').textContent = embedCode();
        }
    });
}
