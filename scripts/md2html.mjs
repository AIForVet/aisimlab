// Convert the teacher guides (docs/*.md in filter_aisim) into HTML fragments for guide.html.
//   node scripts/md2html.mjs <moodle-filter_aisim> <outdir>
// Handles the Markdown the guides use: headings, paragraphs, nested lists, block quotes, tables, code blocks,
// rules, **bold**, *italic*, `code`, [links](url) and hard line breaks. Heading ids follow GitHub, so the guides'
// own tables of contents work; a heading naming a simulation, e.g. (`kmeans`), also gets that name as an anchor.
import fs from 'fs';
import path from 'path';

const [src, out] = process.argv.slice(2);
// Lab language => guide file.
const GUIDES = {
    en: 'TEACHER_GUIDE.md',
    sr: 'PRIRUCNIK_ZA_NASTAVNIKE.md',
    sk: 'PRIRUCKA_PRE_UCITELOV.md',
    pt: 'GUIA_DO_PROFESSOR.md',
};

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

const inline = (text) => {
    const codes = [];
    let s = esc(text).replace(/`([^`]+)`/g, (m, code) => `\u0000${codes.push(code) - 1}\u0000`);
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) => `<a href="${url}">${label}</a>`)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\\\|/g, '|')
        .replace(/ {2,}\n/g, '<br>\n');
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${codes[i]}</code>`);
};

/** GitHub's heading anchor: lower case, punctuation dropped, spaces to hyphens. */
const slug = (text) => text.replace(/[`*]/g, '').toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');

const indentOf = (line) => line.match(/^ */)[0].length;
const LIST = /^( *)([-*]|\d+\.) +(.*)$/;

const render = (lines, ids) => {
    const html = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        let m;
        if (!line.trim()) {
            i++;
        } else if (line.startsWith('```')) {
            const code = [];
            for (i++; i < lines.length && !lines[i].startsWith('```'); i++) {
                code.push(lines[i]);
            }
            i++;
            html.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`);
        } else if ((m = line.match(/^(#{1,6}) +(.*)$/))) {
            const level = m[1].length;
            let id = slug(m[2]);
            ids[id] = (ids[id] ?? -1) + 1;
            id += ids[id] ? `-${ids[id]}` : '';
            const sim = m[2].match(/\(`([a-z_]+)`\)\s*$/);
            const anchor = sim ? `<span id="${sim[1]}"></span>` : '';
            html.push(`<h${level} id="${id}">${anchor}${inline(m[2].replace(/:$/, ''))}</h${level}>`);
            i++;
        } else if (/^-{3,}\s*$/.test(line)) {
            html.push('<hr>');
            i++;
        } else if (line.startsWith('>')) {
            const quote = [];
            for (; i < lines.length && lines[i].startsWith('>'); i++) {
                quote.push(lines[i].replace(/^> ?/, ''));
            }
            html.push(`<blockquote>${render(quote, ids)}</blockquote>`);
        } else if (line.startsWith('|')) {
            const rows = [];
            for (; i < lines.length && lines[i].startsWith('|'); i++) {
                rows.push(lines[i].trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => inline(c.trim())));
            }
            const [head, , ...body] = rows;
            html.push('<div class="table"><table><thead><tr>' + head.map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>'
                + body.map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
        } else if ((m = line.match(LIST))) {
            const base = m[1].length;
            const ordered = /\d/.test(m[2]);
            const items = [];
            while (i < lines.length && (m = lines[i].match(LIST)) && m[1].length === base && /\d/.test(m[2]) === ordered) {
                const body = [m[3]];
                for (i++; i < lines.length; i++) {
                    const next = lines[i];
                    if (next.trim() && indentOf(next) <= base) {
                        break;
                    }
                    if (!next.trim() && !(lines[i + 1] && indentOf(lines[i + 1]) > base && lines[i + 1].trim())) {
                        break;
                    }
                    body.push(next.slice(Math.min(indentOf(next), base + 2)));
                }
                // The item's first line is inline text; anything indented under it is rendered as blocks.
                const [first, ...rest] = body;
                items.push(`<li>${inline(first)}${rest.length ? render(rest, ids) : ''}</li>`);
            }
            const tag = ordered ? 'ol' : 'ul';
            html.push(`<${tag}>${items.join('')}</${tag}>`);
        } else {
            const para = [];
            for (; i < lines.length && lines[i].trim() && !/^(#|>|\||```|-{3,}\s*$)/.test(lines[i]) && !LIST.test(lines[i]); i++) {
                para.push(lines[i]);
            }
            html.push(`<p>${inline(para.join('\n'))}</p>`);
        }
    }
    return html.join('\n');
};

fs.mkdirSync(out, {recursive: true});
for (const [lang, file] of Object.entries(GUIDES)) {
    const md = fs.readFileSync(path.join(src, 'docs', file), 'utf8').replace(/\r\n/g, '\n');
    fs.writeFileSync(path.join(out, `${lang}.html`), render(md.split('\n'), {}) + '\n');
    console.log(`${lang}: ${file}`);
}
