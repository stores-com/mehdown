const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('kickstarter', { concurrency: true }, async (t) => {
    t.test('https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary?ref=discover_rec', async () => {
        const html = await render('https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary?ref=discover_rec');
        assert.strictEqual(html, '<p><iframe class="kickstarter" frameborder="0" scrolling="no" src="https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary/widget/card.html"></iframe></p>');
    });

    t.test('https://www.kickstarter.com/projects/schlock/crossing-paths-film-photography-documentary?ref=discover_rec', async () => {
        const html = await render('https://www.kickstarter.com/projects/schlock/crossing-paths-film-photography-documentary?ref=discover_rec');
        assert.strictEqual(html, '<p><iframe class="kickstarter" frameborder="0" scrolling="no" src="https://www.kickstarter.com/projects/schlock/crossing-paths-film-photography-documentary/widget/card.html"></iframe></p>');
    });

    t.test('[text](https://www.kickstarter.com/projects/schlock/crossing-paths-film-photography-documentary?ref=discover_rec)', async () => {
        const html = await render('[text](https://www.kickstarter.com/projects/schlock/crossing-paths-film-photography-documentary?ref=discover_rec)');
        assert.strictEqual(html, '<p><a href="https://www.kickstarter.com/projects/schlock/crossing-paths-film-photography-documentary?ref=discover_rec">text</a></p>');
    });

    t.test('kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary?ref=discover_rec', async () => {
        const html = await render('https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary?ref=discover_rec');
        assert.strictEqual(html, '<p><iframe class="kickstarter" frameborder="0" scrolling="no" src="https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary/widget/card.html"></iframe></p>');
    });

    t.test('www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary?ref=discover_rec', async () => {
        const html = await render('https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary?ref=discover_rec');
        assert.strictEqual(html, '<p><iframe class="kickstarter" frameborder="0" scrolling="no" src="https://www.kickstarter.com/projects/1270124222/crossing-paths-film-photography-documentary/widget/card.html"></iframe></p>');
    });
});
