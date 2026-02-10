const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('vine', { concurrency: true }, async (t) => {
    t.test('https://vine.co/v/hWZ9mbJZaKE', async () => {
        const html = await render('https://vine.co/v/hWZ9mbJZaKE');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vine" frameborder="0" src="https://vine.co/v/hWZ9mbJZaKE/embed/simple"></iframe></p>');
    });

    t.test('https://vine.co/v/eLnKWtjTJup', async () => {
        const html = await render('https://vine.co/v/eLnKWtjTJup');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vine" frameborder="0" src="https://vine.co/v/eLnKWtjTJup/embed/simple"></iframe></p>');
    });

    t.test('https://vine.co/v/eLnKWtjTJup/embed', async () => {
        const html = await render('https://vine.co/v/eLnKWtjTJup/embed');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vine" frameborder="0" src="https://vine.co/v/eLnKWtjTJup/embed/simple"></iframe></p>');
    });

    t.test('https://vine.co/v/eLnKWtjTJup/similar', async () => {
        const html = await render('https://vine.co/v/eLnKWtjTJup/similar');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vine" frameborder="0" src="https://vine.co/v/eLnKWtjTJup/embed/simple"></iframe></p>');
    });

    t.test('[text](https://vine.co/v/hWZ9mbJZaKE)', async () => {
        const html = await render('[text](https://vine.co/v/hWZ9mbJZaKE)');
        assert.strictEqual(html, '<p><a href="https://vine.co/v/hWZ9mbJZaKE">text</a></p>');
    });

    t.test('vine.co/v/hWZ9mbJZaKE', async () => {
        const html = await render('vine.co/v/hWZ9mbJZaKE');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vine" frameborder="0" src="https://vine.co/v/hWZ9mbJZaKE/embed/simple"></iframe></p>');
    });

    t.test('www.vine.co/v/hWZ9mbJZaKE', async () => {
        const html = await render('www.vine.co/v/hWZ9mbJZaKE');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="vine" frameborder="0" src="https://vine.co/v/hWZ9mbJZaKE/embed/simple"></iframe></p>');
    });
});
