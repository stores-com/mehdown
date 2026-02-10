const assert = require('node:assert');
const test = require('node:test');
const { promisify } = require('node:util');

const mehdown = require('../../lib');

const render = promisify(mehdown.render.bind(mehdown));

test('youtube', { concurrency: true }, async (t) => {
    await t.test('http://www.youtube.com/watch?v=kU9MuM4lP18', async () => {
        const html = await render('http://www.youtube.com/watch?v=kU9MuM4lP18');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('http://www.youtube.com/watch?v=kU9MuM4lP18 http://www.youtube.com/watch?v=eGDBR2L5kzI', async () => {
        const html = await render('http://www.youtube.com/watch?v=kU9MuM4lP18 http://www.youtube.com/watch?v=eGDBR2L5kzI');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe> <iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/eGDBR2L5kzI?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('http://www.youtube.com/watch?feature=player_embedded&v=zIEIvi2MuEk', async () => {
        const html = await render('http://www.youtube.com/watch?feature=player_embedded&v=zIEIvi2MuEk');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/zIEIvi2MuEk?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('`&amp;` instead of `&` in URL', async () => {
        const html = await render('http://www.youtube.com/watch?feature=player_embedded&amp;v=zIEIvi2MuEk');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/zIEIvi2MuEk?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10', async () => {
        const html = await render('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light&start=10"></iframe></p>');
    });

    await t.test('http://www.youtube.com/watch?v=kU9MuM4lP18&amp;start=10', async () => {
        const html = await render('http://www.youtube.com/watch?v=kU9MuM4lP18&amp;start=10');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20', async () => {
        const html = await render('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light&end=20&start=10"></iframe></p>');
    });

    await t.test('[text](http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20)', async () => {
        const html = await render('[text](http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20)');
        assert.strictEqual(html, '<p><a href="http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20">text</a></p>');
    });

    await t.test('youtube.com/watch?v=kU9MuM4lP18', async () => {
        const html = await render('youtube.com/watch?v=kU9MuM4lP18');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('www.youtube.com/watch?v=kU9MuM4lP18', async () => {
        const html = await render('www.youtube.com/watch?v=kU9MuM4lP18');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });

    await t.test('https://www.youtube.com/watch?v=ex--O-cJcZA', async () => {
        const html = await render('https://www.youtube.com/watch?v=ex--O-cJcZA');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/ex--O-cJcZA?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });
});
