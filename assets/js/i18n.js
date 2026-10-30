// Interface strings and the language choice (?lang=, then the saved choice, then the browser).

export const LANGS = {sr: 'Srpski', en: 'English'};

const STRINGS = {
    en: {
        tagline: 'Interactive simulations for learning how machine learning works',
        intro: 'Change the parameters, watch the model react, and solve the challenges. Everything runs in your browser: no account, no installation, no data collected.',
        open: 'Open',
        level1: 'Beginner',
        level2: 'Intermediate',
        level3: 'Advanced',
        challengesDone: 'challenges solved',
        forTeachers: 'For teachers',
        forTeachersText: 'The same simulations work inside Moodle courses, with automatically graded quiz questions. Every simulation here has an “Embed in Moodle” button.',
        plugins: 'Moodle plugins',
        guide: 'Teacher guide',
        home: 'All simulations',
        whatHappens: 'What is happening?',
        challenges: 'Challenges',
        load: 'Load',
        solved: 'Solved!',
        solvedToast: 'Challenge solved',
        share: 'Copy link to this setup',
        copied: 'Copied',
        embed: 'Embed in Moodle',
        embedHelp: 'Paste this into any Moodle text (in the HTML source view). Needs the filter_aisim plugin.',
        resetProgress: 'Reset progress',
        notFound: 'Simulation not found.',
        euFunded: 'Co-funded by the European Union',
        disclaimer: 'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.',
        project: 'Part of the Erasmus+ project AI for VET',
        source: 'Source code (GPL v3)',
    },
    sr: {
        tagline: 'Interaktivne simulacije za učenje kako radi mašinsko učenje',
        intro: 'Menjajte parametre, posmatrajte kako model reaguje i rešavajte izazove. Sve radi u vašem pregledaču: bez naloga, bez instalacije, bez prikupljanja podataka.',
        open: 'Otvori',
        level1: 'Početni nivo',
        level2: 'Srednji nivo',
        level3: 'Napredni nivo',
        challengesDone: 'rešenih izazova',
        forTeachers: 'Za nastavnike',
        forTeachersText: 'Iste simulacije rade i u Moodle kursevima, uz automatski ocenjena pitanja u testovima. Svaka simulacija ovde ima dugme „Ugradi u Moodle“.',
        plugins: 'Moodle dodaci',
        guide: 'Priručnik za nastavnike',
        home: 'Sve simulacije',
        whatHappens: 'Šta se ovde dešava?',
        challenges: 'Izazovi',
        load: 'Učitaj',
        solved: 'Rešeno!',
        solvedToast: 'Izazov rešen',
        share: 'Kopiraj link do ove postavke',
        copied: 'Kopirano',
        embed: 'Ugradi u Moodle',
        embedHelp: 'Nalepite ovo u bilo koji Moodle tekst (u prikazu HTML koda). Potreban je dodatak filter_aisim.',
        resetProgress: 'Poništi napredak',
        notFound: 'Simulacija nije pronađena.',
        euFunded: 'Sufinansira Evropska unija',
        disclaimer: 'Finansirano sredstvima Evropske unije. Izneti stavovi i mišljenja su isključivo stavovi autora i ne odražavaju nužno stavove Evropske unije ili Evropske izvršne agencije za obrazovanje i kulturu (EACEA). Ni Evropska unija ni EACEA ne mogu se smatrati odgovornim za njih.',
        project: 'Deo Erasmus+ projekta AI for VET',
        source: 'Izvorni kod (GPL v3)',
    },
};

const pick = () => {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && STRINGS[fromUrl]) {
        localStorage.setItem('aisimlab-lang', fromUrl);
        return fromUrl;
    }
    const saved = localStorage.getItem('aisimlab-lang');
    if (saved && STRINGS[saved]) {
        return saved;
    }
    const nav = (navigator.language || 'en').toLowerCase();
    return /^(sr|hr|bs|sh|cnr)/.test(nav) ? 'sr' : 'en';
};

export const lang = pick();
document.documentElement.lang = lang;

export const t = (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key;

/** Pick the current language from a {en, sr} object. */
export const tr = (obj) => obj[lang] ?? obj.en;
