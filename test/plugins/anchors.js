const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('headers', { concurrency: true }, async (t) => {
    t.test('adds ids for anchors', async () => {
        const html = await render('# What is meh');
        assert.strictEqual(html, '<h1 id="what-is-meh">What is meh</h1>');
    });

    t.test('adds the specified id as a suffix to the anchor id', async () => {
        const html = await render('## What is meh', { id: '012fed' });
        assert.strictEqual(html, '<h2 id="what-is-meh-012fed">What is meh</h2>');
    });

    t.test('handle header text with non alpha-numeric characters', async () => {
        const html = await render('### What. is!meh?', { id: '0.1!2?f..e!!d??' });
        assert.strictEqual(html, '<h3 id="what-ismeh-012fed">What. is!meh?</h3>');
    });

    t.test('handle header text with multiple spaces', async () => {
        const html = await render('#### What. is ! meh     ?', { id: '0. 1! 2?f. . e! !d? ?' });
        assert.strictEqual(html, '<h4 id="what-is-meh-0-1-2f-e-d">What. is ! meh     ?</h4>');
    });

    t.test('handle suffix with non alpha-numeric characters', async () => {
        const html = await render('##### a- -b?c', { id: '!@#$%^&*()=+`~,./;\'<>?:"[]{}|' });
        assert.strictEqual(html, '<h5 id="a-bc">a- -b?c</h5>');
    });

    t.test('collapse multiple hyphens', async () => {
        const html = await render('###### -- - What - - is --- -   - meh - - -', { id: '!@#$%^&*()=+`~,./;\'<>?:"[]{}|' });
        assert.strictEqual(html, '<h6 id="what-is-meh">– - What - - is — -   - meh - - -</h6>');
    });

    t.test('handle header with other tags inside', async () => {
        const html = await render('# **bold**');
        assert.strictEqual(html, '<h1 id="bold"><strong>bold</strong></h1>');
    });
});
