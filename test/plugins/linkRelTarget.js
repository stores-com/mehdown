const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('linksRelTarget', { concurrency: true }, async (t) => {
    t.test('should not set rel attribute or target attribute if there is no baseUrl specified', async () => {
        const html = await render('[Google](https://www.google.com)');
        assert.strictEqual(html, '<p><a href="https://www.google.com">Google</a></p>');
    });

    t.test('should set rel attribute to "nofollow" and target attribute to "_blank" for a URL that is not at the same domain as the base URL', async () => {
        const html = await render('[Google](https://www.google.com)', { baseUrl: 'https://mediocre.com' });
        assert.strictEqual(html, '<p><a href="https://www.google.com" rel="nofollow" target="_blank">Google</a></p>');
    });

    t.test('should set rel attribute to "nofollow" and target attribute to "_blank" for a scheme relative URL that is not at the same domain as the base URL', async () => {
        const html = await render('[Google](//www.google.com)', { baseUrl: 'https://mediocre.com' });
        assert.strictEqual(html, '<p><a href="//www.google.com" rel="nofollow" target="_blank">Google</a></p>');
    });

    t.test('should not set rel attribute or target attribute for a local URL', async () => {
        const html = await render('[path](/path)', { baseUrl: 'https://mediocre.com' });
        assert.strictEqual(html, '<p><a href="/path">path</a></p>');
    });

    t.test('should not set rel attribute to "nofollow" and target attribute to "_blank" for a baseUrl with an IP address and port', async () => {
        const html = await render('[path](https://localhost:8000/path)', { baseUrl: 'https://localhost:8000' });
        assert.strictEqual(html, '<p><a href="https://localhost:8000/path">path</a></p>');
    });

    t.test('should not set rel attribute to "nofollow" and target attribute to "_blank" for a URL that is at the same domain as the base URL', async () => {
        const html = await render('[path](https://mediocre.com/path)', { baseUrl: 'https://mediocre.com' });
        assert.strictEqual(html, '<p><a href="https://mediocre.com/path">path</a></p>');
    });
});
