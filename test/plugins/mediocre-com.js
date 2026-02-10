const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('mediocre.com', { concurrency: true }, async (t) => {
    await t.test('https://casemates.com/deals/a--slug', async () => {
        const html = await render('https://casemates.com/deals/a--slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://casemates.com/deals/a--slug/embed"></iframe></p>');
    });

    await t.test('https://casemates.com/polls/a-slug', async () => {
        const html = await render('https://casemates.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://casemates.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('[text](https://casemates.com/polls/a--slug)', async () => {
        const html = await render('[text](https://casemates.com/polls/a--slug)');
        assert.strictEqual(html, '<p><a href="https://casemates.com/polls/a--slug">text</a></p>');
    });

    await t.test('https://mediocre.com/deals/a-slug', async () => {
        const html = await render('https://mediocre.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('http://mediocre.com/deals/a-slug', async () => {
        const html = await render('http://mediocre.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://www.mediocre.com/deals/a-slug', async () => {
        const html = await render('https://www.mediocre.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('www.mediocre.com/deals/a-slug', async () => {
        const html = await render('www.mediocre.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('mediocre.com/deals/a-slug', async () => {
        const html = await render('mediocre.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://mediocre.com/deals/a-slug/', async () => {
        const html = await render('https://mediocre.com/deals/a-slug/');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('bare relative url is just text', async () => {
        const html = await render('/deals/a-slug/');
        assert.strictEqual(html, '<p>/deals/a-slug/</p>');
    });

    await t.test('relative url with link text is just a link', async () => {
        const html = await render('[text](/deals/a-slug/)');
        assert.strictEqual(html, '<p><a href="/deals/a-slug/">text</a></p>');
    });

    await t.test('relative url to a deal forum post is a forum embed', async () => {
        const html = await render('[/deals/a-slug/](/deals/a-slug/)');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('relative url to a poll forum post is a forum embed', async () => {
        const html = await render('[/polls/a-slug/](/polls/a-slug/)');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('relative url not to a deal or poll forum post is just a link', async () => {
        const html = await render('[/links/a-slug/](/links/a-slug/)');
        assert.strictEqual(html, '<p><a href="/links/a-slug/">/links/a-slug/</a></p>');
    });

    await t.test('https://mediocre.com/polls/a-slug', async () => {
        const html = await render('https://mediocre.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://mediocre.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('https://mediocre.com/deals/a--slug', async () => {
        const html = await render('https://mediocre.com/deals/a--slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://mediocre.com/deals/a--slug/embed"></iframe></p>');
    });

    await t.test('[text](https://mediocre.com/deals/a--slug)', async () => {
        const html = await render('[text](https://mediocre.com/deals/a--slug)');
        assert.strictEqual(html, '<p><a href="https://mediocre.com/deals/a--slug">text</a></p>');
    });

    await t.test('[text](https://mediocre.com/polls/a--slug)', async () => {
        const html = await render('[text](https://mediocre.com/polls/a--slug)');
        assert.strictEqual(html, '<p><a href="https://mediocre.com/polls/a--slug">text</a></p>');
    });

    await t.test('https://mediocritee.com/polls/a-slug', async () => {
        const html = await render('https://mediocritee.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://mediocritee.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('[text](https://mediocritee.com/polls/a--slug)', async () => {
        const html = await render('[text](https://mediocritee.com/polls/a--slug)');
        assert.strictEqual(html, '<p><a href="https://mediocritee.com/polls/a--slug">text</a></p>');
    });

    await t.test('https://meh.com/deals/a-slug', async () => {
        const html = await render('https://meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('http://meh.com/deals/a-slug', async () => {
        const html = await render('http://meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://www.meh.com/deals/a-slug', async () => {
        const html = await render('https://www.meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('www.meh.com/deals/a-slug', async () => {
        const html = await render('www.meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('meh.com/deals/a-slug', async () => {
        const html = await render('meh.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://meh.com/deals/a-slug/', async () => {
        const html = await render('https://meh.com/deals/a-slug/');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://meh.com/polls/a-slug', async () => {
        const html = await render('https://meh.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://meh.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('https://meh.com/deals/a--slug', async () => {
        const html = await render('https://meh.com/deals/a--slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://meh.com/deals/a--slug/embed"></iframe></p>');
    });

    await t.test('[text](https://meh.com/deals/a--slug)', async () => {
        const html = await render('[text](https://meh.com/deals/a--slug)');
        assert.strictEqual(html, '<p><a href="https://meh.com/deals/a--slug">text</a></p>');
    });

    await t.test('[text](https://meh.com/polls/a--slug)', async () => {
        const html = await render('[text](https://meh.com/polls/a--slug)');
        assert.strictEqual(html, '<p><a href="https://meh.com/polls/a--slug">text</a></p>');
    });

    await t.test('https://morningsave.com/deals/a-slug', async () => {
        const html = await render('https://morningsave.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://morningsave.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://morningsave.com/polls/a-slug', async () => {
        const html = await render('https://morningsave.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://morningsave.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('https://pastadrop.com/deals/a-slug', async () => {
        const html = await render('https://pastadrop.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://pastadrop.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://pastadrop.com/polls/a-slug', async () => {
        const html = await render('https://pastadrop.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://pastadrop.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('https://sidedeal.com/deals/a-slug', async () => {
        const html = await render('https://sidedeal.com/deals/a-slug');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://sidedeal.com/deals/a-slug/embed"></iframe></p>');
    });

    await t.test('https://sidedeal.com/polls/a-slug', async () => {
        const html = await render('https://sidedeal.com/polls/a-slug');
        assert.strictEqual(html, '<p><iframe class="polls" frameborder="0" scrolling="no" src="https://sidedeal.com/polls/a-slug/embed"></iframe></p>');
    });

    await t.test('https://casemates.com/deals/erik-banti-italian-sparkling-rosé', async () => {
        const html = await render('https://casemates.com/deals/erik-banti-italian-sparkling-rosé');
        assert.strictEqual(html, '<p><iframe class="deals" frameborder="0" scrolling="no" src="https://casemates.com/deals/erik-banti-italian-sparkling-ros%C3%A9/embed"></iframe></p>');
    });
});
