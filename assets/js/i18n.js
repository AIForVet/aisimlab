// Interface strings and the language choice (?lang=, then the saved choice, then the browser).

/** Code shown in the header and the language's own name. */
export const LANGS = {sr: 'Srpski', en: 'English', sk: 'Slovenčina', pt: 'Português'};

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
        goal: 'Goal',
        allSolved: 'All challenges solved!',
        load: 'Load',
        solved: 'Solved!',
        solvedToast: 'Challenge solved',
        share: 'Copy link to this setup',
        copied: 'Copied',
        embed: 'Embed in Moodle',
        embedHelp: 'Paste this into any Moodle text (in the HTML source view). Needs the filter_aisim plugin.',
        simInEnglish: 'The controls inside the simulation are in English.',
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
        goal: 'Cilj',
        allSolved: 'Svi izazovi su rešeni!',
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
    sk: {
        tagline: 'Interaktívne simulácie na pochopenie toho, ako funguje strojové učenie',
        intro: 'Meňte parametre, sledujte, ako model reaguje, a riešte výzvy. Všetko beží vo vašom prehliadači: bez účtu, bez inštalácie, bez zbierania údajov.',
        open: 'Otvoriť',
        level1: 'Začiatočník',
        level2: 'Mierne pokročilý',
        level3: 'Pokročilý',
        challengesDone: 'vyriešených výziev',
        forTeachers: 'Pre učiteľov',
        forTeachersText: 'Rovnaké simulácie fungujú aj v kurzoch Moodle s automaticky hodnotenými testovými otázkami. Každá simulácia tu má tlačidlo „Vložiť do Moodle“.',
        plugins: 'Doplnky Moodle',
        guide: 'Príručka pre učiteľov',
        home: 'Všetky simulácie',
        whatHappens: 'Čo sa tu deje?',
        challenges: 'Výzvy',
        goal: 'Cieľ',
        allSolved: 'Všetky výzvy sú vyriešené!',
        load: 'Načítať',
        solved: 'Vyriešené!',
        solvedToast: 'Výzva vyriešená',
        share: 'Kopírovať odkaz na toto nastavenie',
        copied: 'Skopírované',
        embed: 'Vložiť do Moodle',
        embedHelp: 'Vložte to do ľubovoľného textu v Moodle (v zobrazení HTML kódu). Vyžaduje doplnok filter_aisim.',
        simInEnglish: 'Ovládacie prvky v simulácii sú v angličtine.',
        resetProgress: 'Vynulovať postup',
        notFound: 'Simulácia sa nenašla.',
        euFunded: 'Spolufinancované Európskou úniou',
        disclaimer: 'Financované Európskou úniou. Vyjadrené názory a postoje sú názormi a vyjadreniami autora(-ov) a nemusia nevyhnutne odrážať názory a stanoviská Európskej únie alebo Európskej výkonnej agentúry pre vzdelávanie a kultúru (EACEA). Európska únia ani EACEA za ne nepreberajú žiadnu zodpovednosť.',
        project: 'Súčasť projektu Erasmus+ AI for VET',
        source: 'Zdrojový kód (GPL v3)',
    },
    pt: {
        tagline: 'Simulações interativas para aprender como funciona a aprendizagem automática',
        intro: 'Altere os parâmetros, veja como o modelo reage e resolva os desafios. Tudo funciona no seu navegador: sem conta, sem instalação, sem recolha de dados.',
        open: 'Abrir',
        level1: 'Iniciante',
        level2: 'Intermédio',
        level3: 'Avançado',
        challengesDone: 'desafios resolvidos',
        forTeachers: 'Para professores',
        forTeachersText: 'As mesmas simulações funcionam em cursos Moodle, com perguntas de teste avaliadas automaticamente. Cada simulação aqui tem um botão “Incorporar no Moodle”.',
        plugins: 'Plugins Moodle',
        guide: 'Guia do professor',
        home: 'Todas as simulações',
        whatHappens: 'O que está a acontecer?',
        challenges: 'Desafios',
        goal: 'Objetivo',
        allSolved: 'Todos os desafios resolvidos!',
        load: 'Carregar',
        solved: 'Resolvido!',
        solvedToast: 'Desafio resolvido',
        share: 'Copiar ligação para esta configuração',
        copied: 'Copiado',
        embed: 'Incorporar no Moodle',
        embedHelp: 'Cole isto em qualquer texto do Moodle (na vista de código HTML). Requer o plugin filter_aisim.',
        simInEnglish: 'Os controlos dentro da simulação estão em inglês.',
        resetProgress: 'Repor progresso',
        notFound: 'Simulação não encontrada.',
        euFunded: 'Cofinanciado pela União Europeia',
        disclaimer: 'Financiado pela União Europeia. Os pontos de vista e as opiniões expressas são as do(s) autor(es) e não refletem necessariamente a posição da União Europeia ou da Agência de Execução Europeia da Educação e da Cultura (EACEA). Nem a União Europeia nem a EACEA podem ser tidos como responsáveis por essas opiniões.',
        project: 'Parte do projeto Erasmus+ AI for VET',
        source: 'Código-fonte (GPL v3)',
    },
};

const fromBrowser = () => {
    const nav = (navigator.language || 'en').toLowerCase();
    if (/^(sr|hr|bs|sh|cnr)/.test(nav)) {
        return 'sr';
    }
    if (/^(sk|cs)/.test(nav)) {
        return 'sk';
    }
    return nav.startsWith('pt') ? 'pt' : 'en';
};

const pick = () => {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && STRINGS[fromUrl]) {
        localStorage.setItem('aisimlab-lang', fromUrl);
        return fromUrl;
    }
    const saved = localStorage.getItem('aisimlab-lang');
    return saved && STRINGS[saved] ? saved : fromBrowser();
};

export const lang = pick();
document.documentElement.lang = lang;

/** The simulation engines speak Serbian and English. */
export const simLang = lang === 'sr' ? 'sr' : 'en';

export const t = (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key;

/** Pick the current language from a {en, sr, sk, pt} object. */
export const tr = (obj) => obj[lang] ?? obj.en;
