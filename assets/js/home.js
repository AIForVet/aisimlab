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
        <p class="teacher-links">
            <a class="btn" href="${LINKS.filter}">${t('plugins')}: filter_aisim</a>
            <a class="btn" href="${LINKS.qtype}">qtype_aisim</a>
            <a class="btn" href="${LINKS.tiny}">tiny_aisim</a>
            <a class="btn" href="guide.html">📘 ${t('guide')}</a>
        </p>
    </section>`;

document.getElementById('reset')?.addEventListener('click', () => {
    progress.reset();
    location.reload();
});
