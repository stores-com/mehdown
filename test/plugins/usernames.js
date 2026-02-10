const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('usernames', { concurrency: true }, async (t) => {
    await t.test('@username', async () => {
        const html = await render('@username');
        assert.strictEqual(html, '<p><a href="/@username">@username</a></p>');
    });

    await t.test('@username (with baseUrl)', async () => {
        const html = await render('@username', { baseUrl: 'https://mediocre.com' });
        assert.strictEqual(html, '<p><a href="https://mediocre.com/@username">@username</a></p>');
    });

    await t.test('@@username', async () => {
        const html = await render('@@username');
        assert.strictEqual(html, '<p>@@username</p>');
    });

    await t.test('@username @othername', async () => {
        const html = await render('@username @othername');
        assert.strictEqual(html, '<p><a href="/@username">@username</a> <a href="/@othername">@othername</a></p>');
    });

    await t.test('abc @username 123', async () => {
        const html = await render('abc @username 123');
        assert.strictEqual(html, '<p>abc <a href="/@username">@username</a> 123</p>');
    });

    await t.test('abc @username1 notausername@notausername @username2 123', async () => {
        const html = await render('abc @username1 notausername@notausername @username2 123');
        assert.strictEqual(html, '<p>abc <a href="/@username1">@username1</a> notausername@notausername <a href="/@username2">@username2</a> 123</p>');
    });

    await t.test('mediocre.com/@username', async () => {
        const html = await render('mediocre.com/@username');
        assert.strictEqual(html, '<p><a href="http://mediocre.com/@username">mediocre.com/@username</a></p>');
    });

    await t.test('http://mediocre.com/@username', async () => {
        const html = await render('http://mediocre.com/@username');
        assert.strictEqual(html, '<p><a href="http://mediocre.com/@username">http://mediocre.com/@username</a></p>');
    });

    await t.test('https://mediocre.com/@username', async () => {
        const html = await render('https://mediocre.com/@username');
        assert.strictEqual(html, '<p><a href="https://mediocre.com/@username">https://mediocre.com/@username</a></p>');
    });

    await t.test('[@username](https://mediocre.com/@username)', async () => {
        const html = await render('[@username](https://mediocre.com/@username)');
        assert.strictEqual(html, '<p><a href="https://mediocre.com/@username">@username</a></p>');
    });

    await t.test('…@dave', async () => {
        const html = await render('…@dave');
        assert.strictEqual(html, '<p>…<a href="/@dave">@dave</a></p>');
    });
});
