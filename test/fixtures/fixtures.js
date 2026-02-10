const assert = require('node:assert');
const fs = require('node:fs');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('mehdown', { timeout: 10000 }, async () => {
    const options = {
        baseUrl: 'https://meh.com',
        commands: true,
        detectImageSizes: true,
        emoji: {
            imagePathPNG: 'https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/128/'
        }
    };

    const html = await render(fs.readFileSync(`${__dirname}/mehdown.md`).toString(), options);
    assert.strictEqual(html.trim(), fs.readFileSync(`${__dirname}/mehdown.html`).toString().trim());
});
