// Stand-in for Moodle's core/templates, so the filter_aisim engines run outside Moodle.
// Templates come from vendor/aisim/templates (copied by scripts/sync-aisim.sh) and are rendered with mustache.js.
import Mustache from '../lib/mustache.js';

const base = new URL('../../../vendor/aisim/templates/', import.meta.url);
const cache = new Map();

// Fetch a template ("filter_aisim/name") and, recursively, the partials it uses.
const load = (name) => {
    if (!cache.has(name)) {
        const file = name.replace(/^filter_aisim\//, '') + '.mustache';
        cache.set(name, fetch(new URL(file, base)).then((r) => {
            if (!r.ok) {
                throw new Error(`Template ${name}: HTTP ${r.status}`);
            }
            return r.text();
        }));
    }
    return cache.get(name);
};

const collect = async(name, found) => {
    if (found.has(name)) {
        return found;
    }
    const text = await load(name);
    found.set(name, text);
    const partials = [...text.matchAll(/{{>\s*([\w/]+)\s*}}/g)].map((m) => m[1]);
    await Promise.all(partials.map((p) => collect(p, found)));
    return found;
};

export default {
    renderForPromise: async(name, context) => {
        const all = await collect(name, new Map());
        return {html: Mustache.render(all.get(name), context, Object.fromEntries(all)), js: ''};
    },
    replaceNodeContents: (node, html) => {
        node.innerHTML = html;
        return node;
    },
};
