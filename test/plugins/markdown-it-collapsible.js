const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('markdown-it-collapsible', { concurrency: true }, async (t) => {
    t.test('should render <details> and <summary>', async () => {
        const markdown = '+++ Click me!\nHidden text\n+++';

        const html = await render(markdown);
        assert.strictEqual(html, '<details>\n<summary><span class="details-marker"></span>Click me!</summary><p>Hidden text</p>\n</details>');
    });

    t.test('should render expanded', async () => {
        const markdown = '++> Click me!\nHidden text\n++>';

        const html = await render(markdown);
        assert.strictEqual(html, '<details open="">\n<summary><span class="details-marker"></span>Click me!</summary><p>Hidden text</p>\n</details>');
    });

    t.test('should support nested collapsibles', async () => {
        const markdown = '++++ Click me!\nHidden text\n+++ Nested\nInner hidden text\n+++\n++++';

        const html = await render(markdown);
        assert.strictEqual(html, '<details>\n<summary><span class="details-marker"></span>Click me!</summary><p>Hidden text</p>\n<details>\n<summary><span class="details-marker"></span>Nested</summary><p>Inner hidden text</p>\n</details>\n</details>');
    });

    t.test('should support open nested collapsibles', async () => {
        const markdown = '+++> Click me!\nHidden text\n+++ Nested\nInner hidden text\n+++\n+++>';

        const html = await render(markdown);
        assert.strictEqual(html, '<details open="">\n<summary><span class="details-marker"></span>Click me!</summary><p>Hidden text</p>\n<details>\n<summary><span class="details-marker"></span>Nested</summary><p>Inner hidden text</p>\n</details>\n</details>');
    });
});
