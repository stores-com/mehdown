const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('emoji', { concurrency: true }, async (t) => {
    await t.test('test toImage', async () => {
        const html = await render('Hello world! 😄 :smile:');
        assert.strictEqual(html, '<p>Hello world! <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /> <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /></p>');
    });

    await t.test('options', async () => {
        const html = await render('Hello world! 😄 :smile:', { emoji: { imagePathPNG: 'https://example.com/' } });
        assert.strictEqual(html, '<p>Hello world! <img alt="" class="joypixels" src="https://example.com/1f604.png" title=":smile:" /> <img alt="" class="joypixels" src="https://example.com/1f604.png" title=":smile:" /></p>');
    });

    await t.test('mixed ascii, regular unicode and duplicate emoji', async () => {
        const html = await render(':alien: is 👽 and 저 is not :alien: or :alien: also :randomy: is not emoji');
        assert.strictEqual(html, '<p><img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f47d.png" title=":alien:" /> is <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f47d.png" title=":alien:" /> and 저 is not <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f47d.png" title=":alien:" /> or <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f47d.png" title=":alien:" /> also :randomy: is not emoji</p>');
    });

    await t.test('ASCII smileys', async () => {
        const html = await render(':)');
        assert.strictEqual(html, '<p><img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f642.png" title=":)" /></p>');
    });

    await t.test('Unicode 9.0 and 10.0 emoji', async () => {
        const html = await render(':rofl: and :face_with_monocle: are from Unicode 9.0 and 10.0, respectively.');
        assert.strictEqual(html, '<p><img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f923.png" title=":rofl:" /> and <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f9d0.png" title=":face_with_monocle:" /> are from Unicode 9.0 and 10.0, respectively.</p>');
    });

    await t.test('jumbomoji (single emoji)', async () => {
        const html = await render(':smile:');
        assert.strictEqual(html, '<p><img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /></p>');
    });

    await t.test('jumbomoji (multiple emoji)', async () => {
        const html = await render('😄 :smile:');
        assert.strictEqual(html, '<p><img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /> <img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /></p>');
    });

    await t.test('jumbomoji (multiple line emoji)', async () => {
        const html = await render('😄\n:smile:');
        assert.strictEqual(html, '<p><img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /><br />\n<img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f604.png" title=":smile:" /></p>');
    });
});
