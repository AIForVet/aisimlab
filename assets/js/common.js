// Header, footer and progress storage shared by both pages.
import {LANGS, lang, t} from './i18n.js';

export const LINKS = {
    filter: 'https://github.com/blagojevicboban/moodle-filter_aisim',
    qtype: 'https://github.com/blagojevicboban/moodle-qtype_aisim',
    tiny: 'https://github.com/blagojevicboban/moodle-tiny_aisim',
    project: 'https://aiforvet.eu/',
    youtube: 'https://www.youtube.com/@AItools4VETschools',
    source: 'https://github.com/AIForVet/aisimlab',
};

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

/** Same page, other language. */
const langUrl = (code) => {
    const url = new URL(location.href);
    url.searchParams.set('lang', code);
    return url.pathname + url.search;
};

export const renderChrome = () => {
    const switcher = Object.entries(LANGS).map(([code, name]) =>
        `<a href="${esc(langUrl(code))}" class="${code === lang ? 'active' : ''}" hreflang="${code}" lang="${code}" title="${name}"
            ${code === lang ? 'aria-current="true"' : ''}><span aria-hidden="true">${code.toUpperCase()}</span><span class="sr-only">${name}</span></a>`).join('');
    document.getElementById('site-header').innerHTML = `
        <a class="brand" href="./"><img class="brand-logo" src="assets/img/ai4vet-logo.webp" width="40" height="40" alt="AI for VET"><span>AISim <b>Lab</b></span></a>
        <nav class="lang" aria-label="Language">${switcher}</nav>`;
    // Same footer as https://aiforvet.eu/ (without its visitor counter: this site collects no data).
    document.getElementById('site-footer').innerHTML = `
        <img class="eu-logo" src="assets/img/eu-cofunded.webp" width="240" height="54" alt="${t('euFunded')}">
        <p class="disclaimer">${t('disclaimer')}</p>
        <p class="links">&copy; 2026 AI4VET | <a href="${LINKS.project}"><img src="assets/img/ai4vet-logo.webp" width="24" height="24" alt="">${t('project')}</a>
            | <a href="${LINKS.youtube}">${t('youtube')}</a> | <a href="${LINKS.source}">${t('source')}</a></p>`;
};

const KEY = 'aisimlab-progress';
const load = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
        return {};
    }
};

export const progress = {
    has: (simId, i) => !!load()[`${simId}#${i}`],
    mark: (simId, i) => {
        const p = load();
        p[`${simId}#${i}`] = 1;
        localStorage.setItem(KEY, JSON.stringify(p));
    },
    count: (sim) => sim.challenges.filter((c, i) => progress.has(sim.id, i)).length,
    reset: () => localStorage.removeItem(KEY),
};
