const assert = require('node:assert');
const test = require('node:test');

// Stand in for the image prober before mehdown loads, so mehdown captures this
// instead of the real one. Rendering then tells us exactly which hosts it would
// have made a request to, for hostnames we could not otherwise stand a server up on.
const probeImageSizePath = require.resolve('probe-image-size');

require(probeImageSizePath);

const requested = [];

require.cache[probeImageSizePath].exports = function(url) {
    requested.push(url);

    return Promise.resolve({ height: 2, width: 3 });
};

const mehdown = require('../lib');

async function hostsRequestedFor(hostnames) {
    requested.length = 0;

    const markdown = hostnames.map(hostname => `![](https://${hostname}/image.png)`).join('\n\n');

    await mehdown.render(markdown, { detectImageSizes: true });

    return requested.map(url => new URL(url).hostname).sort();
}

test('image probe hosts', async (t) => {
    t.test('requests images on hosts that are on the list', async () => {
        const hostnames = ['d2b8wt72ktn9a2.cloudfront.net', 'media.stores.com', 'res.cloudinary.com', 'substackcdn.com', 'upload.wikimedia.org'];

        assert.deepStrictEqual(await hostsRequestedFor(hostnames), hostnames.slice().sort());
    });

    t.test('requests images on a listed domain and any of its subdomains', async () => {
        const hostnames = ['giphy.com', 'x.giphy.com', 'media0.giphy.com', 'a.b.giphy.com', 'tenor.com', 'c.tenor.com'];

        assert.deepStrictEqual(await hostsRequestedFor(hostnames), hostnames.slice().sort());
    });

    t.test('does not request images on a host that only ends with a listed host', async () => {
        assert.deepStrictEqual(await hostsRequestedFor(['notsubstackcdn.com', 'xsubstackcdn.com', 'xgiphy.com', 'notgiphy.com', 'x-media.stores.com', 'notd2b8wt72ktn9a2.cloudfront.net']), []);
    });

    t.test('does not request images on a listed host used as the prefix of another domain', async () => {
        assert.deepStrictEqual(await hostsRequestedFor(['substackcdn.com.example.net', 'giphy.com.example.net', 'res.cloudinary.com.example.net']), []);
    });

    t.test('does not request images on a subdomain of a listed exact host', async () => {
        assert.deepStrictEqual(await hostsRequestedFor(['sub.substackcdn.com']), []);
    });
});
