const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('kaltura', { concurrency: true }, async (t) => {
    await t.test('https://cdnapisec.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/33370462/entry_id/0_h4hdsqdk/embed/dynamic', async () => {
        const html = await render('https://cdnapisec.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/33370462/entry_id/0_h4hdsqdk/embed/dynamic');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="kaltura" frameborder="0" src="https://cdnapisec.kaltura.com/p/2056591/embedIframeJs/uiconf_id/33370462?iframeembed=true&entry_id=0_h4hdsqdk"></iframe></p>');
    });

    await t.test('https://cdnapisec.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/33370462/entry_id/0_h4hdsqdk/embed/dynamic#t=00:10', async () => {
        const html = await render('https://cdnapisec.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/33370462/entry_id/0_h4hdsqdk/embed/dynamic#t=01:23');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="kaltura" frameborder="0" src="https://cdnapisec.kaltura.com/p/2056591/embedIframeJs/uiconf_id/33370462?iframeembed=true&entry_id=0_h4hdsqdk"></iframe></p>');
    });

    await t.test('https://www.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/39156232/entry_id/0_meiqzwlr/embed/iframe', async () => {
        const html = await render('https://www.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/39156232/entry_id/0_meiqzwlr/embed/iframe');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="kaltura" frameborder="0" src="https://cdnapisec.kaltura.com/p/2056591/embedIframeJs/uiconf_id/39156232?iframeembed=true&entry_id=0_meiqzwlr"></iframe></p>');
    });
});
