// Convert the filter_aisim language files into the JSON string tables the simulations get in the lab.
//   node scripts/lang2json.mjs <moodle-filter_aisim> <outdir>
import fs from 'fs';
import path from 'path';

const [src, out] = process.argv.slice(2);
// Lab language => Moodle language pack.
const LANGS = {en: 'en', sr: 'sr_lt', sk: 'sk', pt: 'pt'};

const unescape = (s) => s.replace(/\\(['\\])/g, '$1');
fs.mkdirSync(out, {recursive: true});
for (const [lab, moodle] of Object.entries(LANGS)) {
    const php = fs.readFileSync(path.join(src, 'lang', moodle, 'filter_aisim.php'), 'utf8');
    const strings = {};
    for (const m of php.matchAll(/^\$string\['([^']+)'\] = '((?:[^'\\]|\\.)*)';$/mg)) {
        strings[m[1]] = unescape(m[2]);
    }
    fs.writeFileSync(path.join(out, `${lab}.json`), JSON.stringify(strings, null, 1) + '\n');
    console.log(`${lab}: ${Object.keys(strings).length} strings`);
}
