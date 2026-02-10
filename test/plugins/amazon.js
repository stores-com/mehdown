const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('amazon', { concurrency: true }, async (t) => {
    t.test('https://www.amazon.com/dp/B0D3VQ6MH5', async () => {
        const html = await render('https://www.amazon.com/dp/B0D3VQ6MH5');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?tag=mehdown-20">https://www.amazon.com/dp/B0D3VQ6MH5</a></p>');
    });

    t.test('https://www.amazon.com/dp/B0D3VQ6MH5?th=1', async () => {
        const html = await render('https://www.amazon.com/dp/B0D3VQ6MH5?th=1');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?th=1&tag=mehdown-20">https://www.amazon.com/dp/B0D3VQ6MH5?th=1</a></p>');
    });

    t.test('https://www.amazon.com/dp/B0D3VQ6MH5?th=1&foo=bar', async () => {
        const html = await render('https://www.amazon.com/dp/B0D3VQ6MH5?th=1&foo=bar');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?th=1&foo=bar&tag=mehdown-20">https://www.amazon.com/dp/B0D3VQ6MH5?th=1&amp;foo=bar</a></p>');
    });

    t.test('https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace', async () => {
        const html = await render('https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace">https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace</a></p>');
    });

    t.test('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5)', async () => {
        const html = await render('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5)');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?tag=mehdown-20">amazon link</a></p>');
    });

    t.test('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5?th=1)', async () => {
        const html = await render('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5?th=1)');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?th=1&tag=mehdown-20">amazon link</a></p>');
    });

    t.test('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5?th=1&foo=bar)', async () => {
        const html = await render('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5?th=1&foo=bar)');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?th=1&foo=bar&tag=mehdown-20">amazon link</a></p>');
    });

    t.test('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace)', async () => {
        const html = await render('[amazon link](https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace)');
        assert.strictEqual(html, '<p><a href="https://www.amazon.com/dp/B0D3VQ6MH5?tag=donotreplace">amazon link</a></p>');
    });
});
