const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('soundcloud', { concurrency: true }, async (t) => {
    t.test('https://soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town', async () => {
        const html = await render('https://soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town');
        assert.strictEqual(html, '<p><iframe class="soundcloud" frameborder="0" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fsoundcloud.com%2Fshawnmichaelmiller%2Fsanta-claus-is-coming-to-town"></iframe></p>');
    });

    t.test('[text](https://soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town)', async () => {
        const html = await render('[text](https://soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town)');
        assert.strictEqual(html, '<p><a href="https://soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town">text</a></p>');
    });

    t.test('soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town', async () => {
        const html = await render('soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town');
        assert.strictEqual(html, '<p><iframe class="soundcloud" frameborder="0" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fsoundcloud.com%2Fshawnmichaelmiller%2Fsanta-claus-is-coming-to-town"></iframe></p>');
    });

    t.test('www.soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town', async () => {
        const html = await render('www.soundcloud.com/shawnmichaelmiller/santa-claus-is-coming-to-town');
        assert.strictEqual(html, '<p><iframe class="soundcloud" frameborder="0" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fsoundcloud.com%2Fshawnmichaelmiller%2Fsanta-claus-is-coming-to-town"></iframe></p>');
    });
});
