const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('Apple Music', { concurrency: true }, async (t) => {
    t.test('https://itunes.apple.com/us/album/the-rescues/id1233432159', async () => {
        const html = await render('https://itunes.apple.com/us/album/the-rescues/id1233432159');
        assert.strictEqual(html, '<p><iframe class="apple-music" frameborder="0" src="//tools.applemusic.com/embed/v1/album/1233432159"></iframe></p>');
    });

    t.test('https://itunes.apple.com/us/album/the-rescues/1233432159', async () => {
        const html = await render('https://itunes.apple.com/us/album/the-rescues/1233432159');
        assert.strictEqual(html, '<p><iframe class="apple-music" frameborder="0" src="//tools.applemusic.com/embed/v1/album/1233432159"></iframe></p>');
    });

    t.test('[The Rescues](https://itunes.apple.com/us/album/the-rescues/1233432159)', async () => {
        const html = await render('[The Rescues](https://itunes.apple.com/us/album/the-rescues/1233432159)');
        assert.strictEqual(html, '<p><a href="https://itunes.apple.com/us/album/the-rescues/1233432159">The Rescues</a></p>');
    });
});
