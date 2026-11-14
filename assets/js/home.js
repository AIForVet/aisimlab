// Home page: the simulation cards.
import {t, tr} from './i18n.js';
import {LINKS, esc, progress, renderChrome} from './common.js';
import {SIMS} from './catalog.js';

renderChrome();

const cards = SIMS.map((sim) => {
    const done = progress.count(sim);
    return `<a class="card" href="lab.html?sim=${sim.id}">
        <span class="card-icon" aria-hidden="true">${sim.icon}</span>
        <span class="level level-${sim.level}">${t(`level${sim.level}`)}</span>
        <h2>${esc(tr(sim.title))}</h2>
        <p>${esc(tr(sim.summary))}</p>
        <span class="card-foot">
            <span class="progress" title="${done}/${sim.challenges.length} ${t('challengesDone')}">
                ${sim.challenges.map((c, i) => `<i class="${progress.has(sim.id, i) ? 'on' : ''}"></i>`).join('')}
            </span>
            <span class="go">${t('open')} →</span>
        </span>
    </a>`;
}).join('');

const solved = SIMS.reduce((n, s) => n + progress.count(s), 0);

/** The three Moodle plugins, by their Marketplace listing names. */
const PLUGINS = [
    {key: 'filter', name: 'AI Simulations Viewer', text: 'pluginFilter'},
    {key: 'tiny', name: 'AI Simulation button for TinyMCE', text: 'pluginTiny'},
    {key: 'qtype', name: 'AI Simulation question type', text: 'pluginQtype'},
];

document.getElementById('home').innerHTML = `
    <section class="hero">
        <h1>AISim <span>Lab</span></h1>
        <p class="tagline">${t('tagline')}</p>
        <p>${t('intro')}</p>
    </section>
    <section class="cards">${cards}</section>
    ${solved ? `<p class="reset"><button type="button" class="link" id="reset">${t('resetProgress')}</button></p>` : ''}
    <section class="teachers">
        <h2>${t('forTeachers')}</h2>
        <p>${t('forTeachersText')}</p>
        <h3>${t('plugins')}</h3>
        <div class="plugins">${PLUGINS.map((p) => `
            <a class="plugin" href="${LINKS[p.key]}" target="_blank" rel="noopener">
                <img src="assets/img/plugin-${p.key}.svg" width="56" height="56" alt="">
                <span class="plugin-text">
                    <strong>${p.name}</strong>
                    <code>${p.key}_aisim</code>
                    <span>${t(p.text)}</span>
                    <span class="go">Moodle Marketplace →</span>
                </span>
            </a>`).join('')}
        </div>
        <p class="teacher-links">
            <a class="btn" href="${LINKS.demo}" target="_blank">🎓 ${t('demoSite')}</a>
            <a class="btn" href="guide.html">📘 ${t('guide')}</a>
        </p>
    </section>`;

document.getElementById('reset')?.addEventListener('click', () => {
    progress.reset();
    location.reload();
});
