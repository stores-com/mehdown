const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('facebook videos', { concurrency: true }, async (t) => {
    t.test('https://www.facebook.com/FacebookDevelopers/videos/10152454700553553', async () => {
        const html = await render('https://www.facebook.com/FacebookDevelopers/videos/10152454700553553');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="facebook video" frameborder="0" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebookDevelopers%2Fvideos%2F10152454700553553"></iframe></p>');
    });

    t.test('https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/', async () => {
        const html = await render('https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="facebook video" frameborder="0" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebookDevelopers%2Fvideos%2F10152454700553553"></iframe></p>');
    });

    t.test('https://www.facebook.com/FacebookDevelopers/videos/10152454700553553?autoplay=true&show-captions=true&show-text=true', async () => {
        const html = await render('https://www.facebook.com/FacebookDevelopers/videos/10152454700553553?autoplay=true&show-captions=true&show-text=true');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="facebook video" frameborder="0" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebookDevelopers%2Fvideos%2F10152454700553553&autoplay=true&show-captions=true&show-text=true"></iframe></p>');
    });
});
