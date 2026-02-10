const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('vimeo', { concurrency: true }, async (t) => {
    await t.test('http://vimeo.com/78950165', async () => {
        const html = await render('http://vimeo.com/78950165');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vimeo" frameborder="0" src="https://player.vimeo.com/video/78950165"></iframe></p>');
    });

    await t.test('[text](http://vimeo.com/78950165)', async () => {
        const html = await render('[text](http://vimeo.com/78950165)');
        assert.strictEqual(html, '<p><a href="http://vimeo.com/78950165">text</a></p>');
    });

    await t.test('vimeo.com/78950165', async () => {
        const html = await render('vimeo.com/78950165');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vimeo" frameborder="0" src="https://player.vimeo.com/video/78950165"></iframe></p>');
    });

    await t.test('www.vimeo.com/78950165', async () => {
        const html = await render('www.vimeo.com/78950165');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vimeo" frameborder="0" src="https://player.vimeo.com/video/78950165"></iframe></p>');
    });
});
