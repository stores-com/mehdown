const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('twitter', { concurrency: true }, async (t) => {
    t.test('https://twitter.com/mediocrelabs/status/410516133955907584', async () => {
        const html = await render('https://twitter.com/mediocrelabs/status/410516133955907584');
        assert.strictEqual(html, '<p><blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/mediocrelabs/status/410516133955907584"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>');
    });

    t.test('https://twitter.com/_/status/416050320272551936', async () => {
        const html = await render('https://twitter.com/_/status/416050320272551936');
        assert.strictEqual(html, '<p><blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/_/status/416050320272551936"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>');
    });

    t.test('[text](https://twitter.com/_/status/416050320272551936)', async () => {
        const html = await render('[text](https://twitter.com/_/status/416050320272551936)');
        assert.strictEqual(html, '<p><a href="https://twitter.com/_/status/416050320272551936">text</a></p>');
    });

    t.test('twitter.com/_/status/416050320272551936', async () => {
        const html = await render('twitter.com/_/status/416050320272551936');
        assert.strictEqual(html, '<p><blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/_/status/416050320272551936"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>');
    });

    t.test('www.twitter.com/_/status/416050320272551936', async () => {
        const html = await render('www.twitter.com/_/status/416050320272551936');
        assert.strictEqual(html, '<p><blockquote class="twitter-tweet" lang="en"><a href="https://twitter.com/_/status/416050320272551936"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script></p>');
    });
});
