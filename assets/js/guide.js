// Teacher guide page: the guide in the chosen language, converted from filter_aisim's docs by sync-aisim.sh.
import {lang, t} from './i18n.js';
import {renderChrome} from './common.js';

renderChrome();

const main = document.getElementById('guide');
main.innerHTML = `<p class="crumbs"><a href="./">← ${t('home')}</a></p><article id="guide-text"></article>`;
fetch(new URL(`../../vendor/aisim/guide/${lang}.html`, import.meta.url))
    .then((r) => r.text())
    .then((html) => {
        document.getElementById('guide-text').innerHTML = html;
        document.title = `${t('guide')} · AISim Lab`;
        // The text arrives after the browser has looked for the #anchor.
        if (location.hash) {
            document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
        }
    });
