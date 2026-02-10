const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('gist', { concurrency: true }, async (t) => {
    t.test('https://gist.github.com/javamatte/f75cc07313f45d5b78cdc967f0dabd05', async () => {
        const html = await render('https://gist.github.com/javamatte/f75cc07313f45d5b78cdc967f0dabd05');
        assert.strictEqual(html, '<p><script src="https://gist.github.com/javamatte/f75cc07313f45d5b78cdc967f0dabd05.js"></script></p>');
    });
});
