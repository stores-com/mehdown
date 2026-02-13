const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('stores.com', { concurrency: true }, async (t) => {
    t.test('https://casemates.com/deals/a--slug', async () => {
        const html = await render('https://casemates.com/deals/a--slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://casemates.com/deals/a--slug/embed"></iframe></p>');
    });

    t.test('https://casemates.com/polls/a-slug', async () => {
        const html = await render('https://casemates.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://casemates.com/polls/a-slug/embed"></iframe></p>');
    });

    t.test('[text](https://casemates.com/polls/a--slug)', async () => {
        const html = await render('[text](https://casemates.com/polls/a--slug)');
        assert.strictEqual(html, '<p><a href="https://casemates.com/polls/a--slug">text</a></p>');
    });

    t.test('https://casemates.com/deals/erik-banti-italian-sparkling-rosé', async () => {
        const html = await render('https://casemates.com/deals/erik-banti-italian-sparkling-rosé');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://casemates.com/deals/erik-banti-italian-sparkling-ros%C3%A9/embed"></iframe></p>');
    });

    t.test('https://hammacher.com/deals/a-slug', async () => {
        const html = await render('https://hammacher.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://hammacher.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('https://hammacher.com/polls/a-slug', async () => {
        const html = await render('https://hammacher.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://hammacher.com/polls/a-slug/embed"></iframe></p>');
    });

    t.test('https://meh.com/deals/a-slug', async () => {
        const html = await render('https://meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('http://meh.com/deals/a-slug', async () => {
        const html = await render('http://meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('https://www.meh.com/deals/a-slug', async () => {
        const html = await render('https://www.meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('www.meh.com/deals/a-slug', async () => {
        const html = await render('www.meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('meh.com/deals/a-slug', async () => {
        const html = await render('meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('https://meh.com/deals/a-slug/', async () => {
        const html = await render('https://meh.com/deals/a-slug/');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('bare relative url is just text', async () => {
        const html = await render('/deals/a-slug/');
        assert.strictEqual(html, '<p>/deals/a-slug/</p>');
    });

    t.test('relative url with link text is just a link', async () => {
        const html = await render('[text](/deals/a-slug/)');
        assert.strictEqual(html, '<p><a href="/deals/a-slug/">text</a></p>');
    });

    t.test('relative url to a deal forum post is a forum embed', async () => {
        const html = await render('[/deals/a-slug/](/deals/a-slug/)');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="/deals/a-slug/embed"></iframe></p>');
    });

    t.test('relative url to a poll forum post is a forum embed', async () => {
        const html = await render('[/polls/a-slug/](/polls/a-slug/)');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="/polls/a-slug/embed"></iframe></p>');
    });

    t.test('relative url not to a deal or poll forum post is just a link', async () => {
        const html = await render('[/links/a-slug/](/links/a-slug/)');
        assert.strictEqual(html, '<p><a href="/links/a-slug/">/links/a-slug/</a></p>');
    });

    t.test('https://meh.com/polls/a-slug', async () => {
        const html = await render('https://meh.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://meh.com/polls/a-slug/embed"></iframe></p>');
    });

    t.test('https://meh.com/deals/a--slug', async () => {
        const html = await render('https://meh.com/deals/a--slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a--slug/embed"></iframe></p>');
    });

    t.test('[text](https://meh.com/deals/a--slug)', async () => {
        const html = await render('[text](https://meh.com/deals/a--slug)');
        assert.strictEqual(html, '<p><a href="https://meh.com/deals/a--slug">text</a></p>');
    });

    t.test('[text](https://meh.com/polls/a--slug)', async () => {
        const html = await render('[text](https://meh.com/polls/a--slug)');
        assert.strictEqual(html, '<p><a href="https://meh.com/polls/a--slug">text</a></p>');
    });

    t.test('https://morningsave.com/deals/a-slug', async () => {
        const html = await render('https://morningsave.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://morningsave.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('https://morningsave.com/polls/a-slug', async () => {
        const html = await render('https://morningsave.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://morningsave.com/polls/a-slug/embed"></iframe></p>');
    });

    t.test('https://shop.univision.com/deals/a-slug', async () => {
        const html = await render('https://shop.univision.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://shop.univision.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('https://shop.univision.com/polls/a-slug', async () => {
        const html = await render('https://shop.univision.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://shop.univision.com/polls/a-slug/embed"></iframe></p>');
    });

    t.test('https://sidedeal.com/deals/a-slug', async () => {
        const html = await render('https://sidedeal.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://sidedeal.com/deals/a-slug/embed"></iframe></p>');
    });

    t.test('https://sidedeal.com/polls/a-slug', async () => {
        const html = await render('https://sidedeal.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://sidedeal.com/polls/a-slug/embed"></iframe></p>');
    });
});
