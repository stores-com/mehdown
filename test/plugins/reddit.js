const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('reddit', { concurrency: true }, async (t) => {
    t.test('https://www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym', async () => {
        const html = await render('https://www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym');
        assert.strictEqual(html, '<p><div class="reddit-embed" data-embed-media="www.redditmedia.com" data-embed-live="true"><a href="https://reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym">https://reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym</a></div><script async src="https://www.redditstatic.com/comment-embed.js"></script></p>');
    });

    t.test('[text](https://www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym)', async () => {
        const html = await render('[text](https://www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym)');
        assert.strictEqual(html, '<p><a href="https://www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym">text</a></p>');
    });

    t.test('reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym', async () => {
        const html = await render('reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym');
        assert.strictEqual(html, '<p><div class="reddit-embed" data-embed-media="www.redditmedia.com" data-embed-live="true"><a href="https://reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym">https://reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym</a></div><script async src="https://www.redditstatic.com/comment-embed.js"></script></p>');
    });

    t.test('www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym', async () => {
        const html = await render('www.reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym');
        assert.strictEqual(html, '<p><div class="reddit-embed" data-embed-media="www.redditmedia.com" data-embed-live="true"><a href="https://reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym">https://reddit.com/r/ProgrammerHumor/comments/30lhaf/mehcom_api_url_poking_at_steve_balmer/cptizym</a></div><script async src="https://www.redditstatic.com/comment-embed.js"></script></p>');
    });
});
