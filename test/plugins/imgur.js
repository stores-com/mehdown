const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('imgur', { concurrency: true }, async (t) => {
    t.test('http://i.imgur.com/zvATqgs.gifv', async () => {
        const html = await render('http://i.imgur.com/zvATqgs.gifv');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="zvATqgs"><a href="//imgur.com/zvATqgs">imgur.com/zvATqgs</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });

    t.test('[text](http://i.imgur.com/zvATqgs.gifv)', async () => {
        const html = await render('[text](http://i.imgur.com/zvATqgs.gifv)');
        assert.strictEqual(html, '<p><a href="http://i.imgur.com/zvATqgs.gifv">text</a></p>');
    });

    t.test('imgur.com/zvATqgs.gifv', async () => {
        const html = await render('imgur.com/zvATqgs.gifv');
        assert.strictEqual(html, '<p><a href="http://imgur.com/zvATqgs.gifv">imgur.com/zvATqgs.gifv</a></p>');
    });

    t.test('i.imgur.com/zvATqgs.gifv', async () => {
        const html = await render('i.imgur.com/zvATqgs.gifv');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="zvATqgs"><a href="//imgur.com/zvATqgs">imgur.com/zvATqgs</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });

    t.test('www.imgur.com/zvATqgs.gifv', async () => {
        const html = await render('www.imgur.com/zvATqgs.gifv');
        assert.strictEqual(html, '<p><a href="http://www.imgur.com/zvATqgs.gifv">www.imgur.com/zvATqgs.gifv</a></p>');
    });

    t.test('https://i.imgur.com/Al5Q80f.jpg', async () => {
        const html = await render('https://i.imgur.com/Al5Q80f.jpg');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="Al5Q80f"><a href="//imgur.com/Al5Q80f">imgur.com/Al5Q80f</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });

    t.test('https://i.imgur.com/PySOiro.gif', async () => {
        const html = await render('https://i.imgur.com/PySOiro.gif');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="PySOiro"><a href="//imgur.com/PySOiro">imgur.com/PySOiro</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });

    t.test('https://i.imgur.com/XyXKUBp_d.jpg?maxwidth=640&shape=thumb&fidelity=medium', async () => {
        const html = await render('https://i.imgur.com/XyXKUBp_d.jpg?maxwidth=640&shape=thumb&fidelity=medium');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="XyXKUBp"><a href="//imgur.com/XyXKUBp">imgur.com/XyXKUBp</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });

    t.test('[img]https://i.imgur.com/E5vZ9i1.jpg[/img]', async () => {
        const html = await render('[img]https://i.imgur.com/E5vZ9i1.jpg[/img]');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="E5vZ9i1"><a href="//imgur.com/E5vZ9i1">imgur.com/E5vZ9i1</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });

    t.test('![](https://i.imgur.com/E5vZ9i1.jpg)', async () => {
        const html = await render('![](https://i.imgur.com/E5vZ9i1.jpg)');
        assert.strictEqual(html, '<p><div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="E5vZ9i1"><a href="//imgur.com/E5vZ9i1">imgur.com/E5vZ9i1</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div></p>');
    });
});
