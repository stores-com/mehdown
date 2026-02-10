const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('images', { concurrency: true }, async (t) => {
    t.test('.jpeg', async () => {
        const html = await render('http://example.com/image.jpeg');
        assert.strictEqual(html, '<p><img src="http://example.com/image.jpeg" /></p>');
    });

    t.test('.jpg', async () => {
        const html = await render('http://example.com/image.jpg');
        assert.strictEqual(html, '<p><img src="http://example.com/image.jpg" /></p>');
    });

    t.test('.gif', async () => {
        const html = await render('http://www.bubblews.com/assets/images/news/225123606_1387763263.gif');
        assert.strictEqual(html, '<p><img src="http://www.bubblews.com/assets/images/news/225123606_1387763263.gif" /></p>');
    });

    t.test('.png', async () => {
        const html = await render('http://fc09.deviantart.net/fs44/f/2009/067/a/a/Green_Humming_Bird_PNG_by_pixievamp_stock.png');
        assert.strictEqual(html, '<p><img src="http://fc09.deviantart.net/fs44/f/2009/067/a/a/Green_Humming_Bird_PNG_by_pixievamp_stock.png" /></p>');
    });

    t.test('.jpg with long url and query string', async () => {
        const html = await render('http://images.nationalgeographic.com/wpf/media-live/photos/000/770/cache/payunia-volcano-argentina_77070_990x742.jpg?01AD=3jGr9FxQ0BANJabwfZqq7ejovySQ1dQw8kO0oygkZlKrsJUzb-jUb7Q&01RI=1E4070A575D8186&01NA=na');
        assert.strictEqual(html, '<p><img src="http://images.nationalgeographic.com/wpf/media-live/photos/000/770/cache/payunia-volcano-argentina_77070_990x742.jpg?01AD=3jGr9FxQ0BANJabwfZqq7ejovySQ1dQw8kO0oygkZlKrsJUzb-jUb7Q&01RI=1E4070A575D8186&01NA=na" /></p>');
    });

    t.test('.png with %20 (space) in url', async () => {
        const html = await render('http://izaak.jellinek.com/tuxes/images/big%20tux.png');
        assert.strictEqual(html, '<p><img src="http://izaak.jellinek.com/tuxes/images/big%20tux.png" /></p>');
    });

    t.test('http://cl.ly/image/0w251W2U1f1Q/Screen%20Shot%202014-06-16%20at%201.26.25%20PM.png', async () => {
        const html = await render('http://cl.ly/image/0w251W2U1f1Q/Screen%20Shot%202014-06-16%20at%201.26.25%20PM.png');
        assert.strictEqual(html, '<p><img src="http://cl.ly/image/0w251W2U1f1Q/Screen%20Shot%202014-06-16%20at%201.26.25%20PM.png" /></p>');
    });

    t.test('should not render image tags for image URLs in Markdown URL syntax', async () => {
        const html = await render('[Fold out back](https://res.cloudinary.com/mediocre/image/upload/v1463770987/poaddeitz7s97sz47s7z.jpg)');
        assert.strictEqual(html, '<p><a href="https://res.cloudinary.com/mediocre/image/upload/v1463770987/poaddeitz7s97sz47s7z.jpg">Fold out back</a></p>');
    });

    t.test('.webp', async () => {
        const html = await render('https://d2b8wt72ktn9a2.cloudfront.net/mediocre/image/upload/v1741576249/pav6x1rkkve9imwcvybe.png');
        assert.strictEqual(html, '<p><img src="https://d2b8wt72ktn9a2.cloudfront.net/mediocre/image/upload/v1741576249/pav6x1rkkve9imwcvybe.png" /></p>');
    });
});
