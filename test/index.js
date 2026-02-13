const assert = require('node:assert');
const test = require('node:test');

const mehdown = require('../lib');

const render = mehdown.render.bind(mehdown);

test('bbcode', { concurrency: true }, async (t) => {
    t.test('[b]', async () => {
        const html = await render('I would like to [b]emphasize[/b] this');
        assert.strictEqual(html, '<p>I would like to <strong>emphasize</strong> this</p>');
    });

    t.test('[code]', async () => {
        const html = await render('[code]\n\t01  01  andndnd.\n\t\t05  andnd pic x.\n\t\t05  andne pic x.\n[/code]');
        assert.strictEqual(html, '<pre><code>\n\t01  01  andndnd.\n\t\t05  andnd pic x.\n\t\t05  andne pic x.\n\n</code></pre>');
    });

    t.test('[i]', async () => {
        const html = await render('Making text [i]italic[/i] italic is kind of easy');
        assert.strictEqual(html, '<p>Making text <em>italic</em> italic is kind of easy</p>');
    });

    t.test('[img]', async () => {
        const html = await render('[img]http://www.bbcode.org/images/lubeck_small.jpg[/img]');
        assert.strictEqual(html, '<p><img src="http://www.bbcode.org/images/lubeck_small.jpg" alt="" /></p>');
    });

    t.test('[quote]', async () => {
        const html = await render('[quote]\'Tis be a bad day[/quote]');
        assert.strictEqual(html, '<blockquote>\n<p>\'Tis be a bad day</p>\n</blockquote>');
    });

    t.test('[quote=Bjarne]', async () => {
        const html = await render('[quote=Bjarne]This be the day of days![/quote]');
        assert.strictEqual(html, '<blockquote>\n<p><a href="/@Bjarne">@Bjarne</a> wrote: This be the day of days!</p>\n</blockquote>');
    });

    t.test('[quote=@Bjarne]', async () => {
        const html = await render('[quote=@Bjarne]This be the day of days![/quote]');
        assert.strictEqual(html, '<blockquote>\n<p><a href="/@Bjarne">@Bjarne</a> wrote: This be the day of days!</p>\n</blockquote>');
    });

    t.test('[s]', async () => {
        const html = await render('I [s]had been[/s] was born in Denmark');
        assert.strictEqual(html, '<p>I <s>had been</s> was born in Denmark</p>');
    });

    t.test('[url]', async () => {
        const html = await render('[url]http://www.bbcode.org/[/url]');
        assert.strictEqual(html, '<p><a href="http://www.bbcode.org/">http://www.bbcode.org/</a></p>');
    });

    t.test('[url] with text', async () => {
        const html = await render('[url=http://www.bbcode.org/]This be bbcode.org![/url]');
        assert.strictEqual(html, '<p><a href="http://www.bbcode.org/">This be bbcode.org!</a></p>');
    });

    t.test('[youtube]', async () => {
        const html = await render('[youtube]kU9MuM4lP18[/youtube]');
        assert.strictEqual(html, '<p><iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe></p>');
    });
});

test('commands', { concurrency: true }, async (t) => {
    t.test('/coinflip', { concurrency: true }, async (t) => {
        t.test('/coinflip', async () => {
            const html = await render('/coinflip');
            assert.notStrictEqual(html, '<p>/coinflip</p>');
            assert(!html.includes('<code>heads</code> or <code>tails</code> are your only options here.'));
        });

        t.test('/coinflip heads', async () => {
            const html = await render('/coinflip heads');
            assert.notStrictEqual(html, '<p>/coinflip heads</p>');
            assert(!html.includes('<code>heads</code> or <code>tails</code> are your only options here.'));
        });

        t.test('/coinflip tails', async () => {
            const html = await render('/coinflip tails');
            assert.notStrictEqual(html, '<p>/coinflip tails</p>');
            assert(!html.includes('<code>heads</code> or <code>tails</code> are your only options here.'));
        });

        t.test('/coinflip heads YOU WON', async () => {
            let html;
            do {
                html = await render('/coinflip heads');
            } while (!html.includes('YOU WON'));
            assert(html.includes('YOU WON'));
        });

        t.test('/coinflip heads YOU LOST', async () => {
            let html;
            do {
                html = await render('/coinflip heads');
            } while (!html.includes('YOU LOST'));
            assert(html.includes('YOU LOST'));
        });

        t.test('/coinflip heads Better luck next time', async () => {
            let html;
            do {
                html = await render('/coinflip heads');
            } while (!html.includes('Better luck next time'));
            assert(html.includes('Better luck next time'));
        });

        t.test('/coinflip foo', async () => {
            const html = await render('/coinflip foo');
            assert.notStrictEqual(html, '<p>/coinflip foo</p>');
            assert(html.includes('<code>heads</code> or <code>tails</code> are your only options here.'));
        });
    });

    t.test('/concerned', async () => {
        const html = await render('/concerned');
        assert.strictEqual(html, '<p>ಠ_ಠ</p>');
    });

    t.test('/8ball', async () => {
        const html = await render('/8ball Do I need a new lease on life?');
        assert.notStrictEqual(html, '<p>/8ball Do I need a new lease on life?</p>');
    });

    t.test('/eightball', async () => {
        const html = await render('/eightball Do I need a new lease on life?');
        assert.notStrictEqual(html, '<p>/eightball Do I need a new lease on life?</p>');
    });

    t.test('/emojify', { concurrency: true }, async (t) => {
        t.test('/emojify', async () => {
            const html = await render('/emojify');
            assert.strictEqual(html, '<p>/emojify</p>');
        });

        t.test('/emojify Basketball finishes at 5. Then it\'s pizza or tacos. Maybe go to the movies. You in?', async () => {
            const html = await render('/emojify Basketball finishes at 5. Then it\'s pizza or tacos. Maybe go to the movies. You in?');
            assert.strictEqual(html, '<p><img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f3c0.png" title=":basketball:" /> finishes at 5. Then it\u2019s <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f355.png" title=":pizza:" /> or <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f32e.png" title=":taco:" />. Maybe go to the <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f3a5.png" title=":movie_camera:" />. You in?</p>');
        });

        t.test('/emojify package package :package: package', async () => {
            const html = await render('/emojify package package :package: package');
            assert.strictEqual(html, '<p><img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f4e6.png" title=":package:" /> <img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f4e6.png" title=":package:" /> <img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f4e6.png" title=":package:" /> <img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f4e6.png" title=":package:" /></p>');
        });

        t.test('/emojify no woman, no cry on mail so', async () => {
            const html = await render('/emojify no woman, no cry on mail so');
            assert.strictEqual(html, '<p><img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f6ab.png" title=":no_entry_sign:" /> <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f469.png" title=":woman:" />, <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f6ab.png" title=":no_entry_sign:" /> <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f622.png" title=":cry:" /> on <img alt="" class="joypixels" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f4eb.png" title=":mailbox:" /> so</p>');
        });

        t.test('/emojify shit', async () => {
            const html = await render('/emojify shit');
            assert.strictEqual(html, '<p><img alt="" class="joypixels jumbo" src="https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/1f4a9.png" title=":poop:" /></p>');
        });
    });

    t.test('/flip', { concurrency: true }, async (t) => {
        t.test('/flip', async () => {
            const html = await render('/flip');
            assert.strictEqual(html, '<p>/flip</p>');
        });

        t.test('/flip Hello World!', async () => {
            const html = await render('/flip Hello World!');
            assert.strictEqual(html, '<p>¡pʃɹoM oʃʃǝH</p>');
        });
    });

    t.test('/giphy', { concurrency: true }, async (t) => {
        t.test('/giphy', async () => {
            const html = await render('/giphy');
            assert.strictEqual(html, '<p>/giphy</p>');
        });

        t.test('/giphy meh', async () => {
            const html = await render('/giphy meh');

            if (process.env.GIPHY_API_KEY) {
                assert.notStrictEqual(html, '<p>/giphy meh</p>');
                assert.notStrictEqual(html.indexOf('http'), -1);
            } else {
                assert.strictEqual(html, '<p>/giphy meh</p>');
            }
        });

        t.test('multiple /giphy commands', async () => {
            const html = await render('lorem ipsum\n/giphy first\nfoo bar\n/giphy second third\n@username /giphy fourth\nhey @username /giphy fifth\nthis is not a command `/giphy sixth`');
            assert.notStrictEqual(html.indexOf('lorem ipsum'), -1);
            assert.notStrictEqual(html.indexOf('foo bar'), -1);

            if (process.env.GIPHY_API_KEY) {
                assert.strictEqual(html.match(/<img/g).length, 2);
            }
        });
    });

    t.test('/jumble', { concurrency: true }, async (t) => {
        t.test('/jumble', async () => {
            const html = await render('/jumble');
            assert.strictEqual(html, '<p>/jumble</p>');
        });

        t.test('/jumble text', async () => {
            const html = await render('/jumble Humans can easily read text where the middle letters are shuffled.');
            assert.notStrictEqual(html, '<p>/jumble Humans can easily read text where the middle letters are shuffled.</p>');
        });
    });

    t.test('/labrat', async () => {
        const html = await render('/labrat');
        assert.strictEqual(html, '<p><img src="https://res.cloudinary.com/mediocre/image/upload/v1537473791/mijjibf0vxdx79wtqrjh.png" /></p>');
    });

    t.test('/leet', { concurrency: true }, async (t) => {
        t.test('/1337', async () => {
            const html = await render('/1337 elite hacker');
            assert.strictEqual(html, '<p>3L173 H4CK3R</p>');
        });

        t.test('/l33t', async () => {
            const html = await render('/l33t elite hacker');
            assert.strictEqual(html, '<p>3L173 H4CK3R</p>');
        });

        t.test('/leet', async () => {
            const html = await render('/leet elite hacker');
            assert.strictEqual(html, '<p>3L173 H4CK3R</p>');
        });

        t.test('/leet no args', async () => {
            const html = await render('/leet');
            assert.strictEqual(html, '<p>/leet</p>');
        });
    });

    t.test('/lolspeak', { concurrency: true }, async (t) => {
        t.test('/lolspeak', async () => {
            const html = await render('/lolspeak');
            assert.strictEqual(html, '<p>/lolspeak</p>');
        });

        t.test('/lolspeak text', async () => {
            const html = await render('/lolspeak A lolcat is an image macro of one or more cats. The image\'s text is often idiosyncratic and grammatically incorrect. Its use in this way is known as "lolspeak" or "kitty pidgin".');
            assert.strictEqual(html, '<p>A LOLCAT IZ AN IMAGE MACRO OV WAN OR MOAR CATS TEH IMAGE\u2019S TEXT IZ OFTEN IDIOSYNCRATIC AN GRAMMATICALLY INCORRECT ITZ USE IN DIS WAI IZ KNOWN AS \u201CLOLSPEAK\u201D OR \u201CKITTY PIDGIN\u201D</p>');
        });
    });

    t.test('/piglatin', { concurrency: true }, async (t) => {
        t.test('/piglatin', async () => {
            const html = await render('/piglatin');
            assert.strictEqual(html, '<p>/piglatin</p>');
        });

        t.test('/piglatin text', async () => {
            const html = await render('/piglatin Juvenile language created by the rearrangement of sounds in a word such that the first sound is moved to the end and "ay" is added. In the case of a vowel as the first sound, "ay" is simply added, with an hyphen if necessary.');
            assert.strictEqual(html, '<p>Uvenilejay anguagelay eatedcray ybay ethay earrangementray ofay oundssay inay ay ordway uchsay atthay ethay irstfay oundsay isay ovedmay otay ethay enday anday \u201Cay\u201D isay addeday. Inay ethay asecay ofay ay owelvay asay ethay irstfay oundsay, \u201Cay\u201D isay implysay addeday, ithway anay yphenhay ifay ecessarynay.</p>');
        });
    });

    t.test('/reverse', { concurrency: true }, async (t) => {
        t.test('/reverse', async () => {
            const html = await render('/reverse');
            assert.strictEqual(html, '<p>/reverse</p>');
        });

        t.test('/reverse Hello world.', async () => {
            const html = await render('/reverse Hello world.');
            assert.strictEqual(html, '<p>.dlrow olleH</p>');
        });
    });

    t.test('/roll', { concurrency: true }, async (t) => {
        t.test('/roll', async () => {
            const html = await render('/roll');
            assert.notStrictEqual(html, '<p>/roll</p>');
            assert(!html.includes('are invalid'));
            assert(html.includes('You rolled a'));
            assert(!html.includes('using the following'));
        });

        t.test('/roll --help', async () => {
            const html = await render('/roll --help');
            assert.notStrictEqual(html, '<p>/roll --help</p>');
            assert(!html.includes('Invalid options'));
            assert(!html.includes('You rolled a'));
            assert(html.includes('Usage: /roll'));
        });

        t.test('/roll 2d20 --show', async () => {
            const html = await render('/roll 2d20 --show');
            assert.notStrictEqual(html, '<p>/roll 2d20 --show</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
            assert(html.includes('using the following 2 dice'));
            assert(!html.includes('Usage: /roll'));
        });

        t.test('/roll 5d10+5', async () => {
            const html = await render('/roll 5d10+5');
            assert.notStrictEqual(html, '<p>/roll 5d10+5</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
            assert(!html.includes('using the following'));
            assert(!html.includes('Usage: /roll'));
        });

        t.test('/roll -h', async () => {
            const html = await render('/roll -h');
            assert.notStrictEqual(html, '<p>/roll -h</p>');
            assert(!html.includes('Invalid options'));
            assert(!html.includes('You rolled a'));
            assert(html.includes('Usage: /roll'));
        });

        t.test('/roll --chance', async () => {
            const html = await render('/roll --chance');
            assert.notStrictEqual(html, '<p>/roll --chance</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
        });

        t.test('/roll -c', async () => {
            const html = await render('/roll -c');
            assert.notStrictEqual(html, '<p>/roll -c</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
        });

        t.test('/roll --boardgame', async () => {
            const html = await render('/roll --boardgame');
            assert.notStrictEqual(html, '<p>/roll --boardgame</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
        });

        t.test('/roll -bg', async () => {
            const html = await render('/roll -bg');
            assert.notStrictEqual(html, '<p>/roll -bg</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
        });

        t.test('/roll --yahtzee', async () => {
            const html = await render('/roll --yahtzee');
            assert.notStrictEqual(html, '<p>/roll --yahtzee</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
            assert(html.includes('using the following 5 dice'));
        });

        t.test('/roll -y', async () => {
            const html = await render('/roll -y');
            assert.notStrictEqual(html, '<p>/roll -y</p>');
            assert(!html.includes('Invalid options'));
            assert(html.includes('You rolled a'));
            assert(html.includes('using the following 5 dice'));
        });

        t.test('/roll foo', async () => {
            const html = await render('/roll foo');
            assert.notStrictEqual(html, '<p>/roll foo</p>');
            assert(html.includes('Invalid options'));
            assert(!html.includes('You rolled a'));
            assert(!html.includes('using the following'));
            assert(!html.includes('Usage: /roll'));
        });
    });

    t.test('/rot13', { concurrency: true }, async (t) => {
        t.test('/rot13', async () => {
            const html = await render('/rot13');
            assert.strictEqual(html, '<p>/rot13</p>');
        });

        t.test('/rot13 text', async () => {
            const html = await render('/rot13 ROT13 ("rotate by 13 places", sometimes hyphenated ROT-13) is a simple letter substitution cipher that replaces a letter with the letter 13 letters after it in the alphabet.');
            assert.strictEqual(html, '<p>EBG13 (\u201Cebgngr ol 13 cynprf\u201D, fbzrgvzrf ulcurangrq EBG-13) vf n fvzcyr yrggre fhofgvghgvba pvcure gung ercynprf n yrggre jvgu gur yrggre 13 yrggref nsgre vg va gur nycunorg.</p>');
        });
    });

    t.test('/shrug', { concurrency: true }, async (t) => {
        t.test('/shrug', async () => {
            const html = await render('/shrug');
            assert.strictEqual(html, '<p>¯\\_(ツ)_/¯</p>');
        });

        t.test('/shrug\\n/shrug', async () => {
            const html = await render('/shrug\n/shrug');
            assert.strictEqual(html, '<p>¯\\_(ツ)_/¯<br />\n¯\\_(ツ)_/¯</p>');
        });

        t.test('/shrug\\n/shrug\\n/shrug', async () => {
            const html = await render('/shrug\n/shrug\n/shrug');
            assert.strictEqual(html, '<p>¯\\_(ツ)_/¯<br />\n¯\\_(ツ)_/¯<br />\n¯\\_(ツ)_/¯</p>');
        });

        t.test('/SHRUG', async () => {
            const html = await render('/SHRUG');
            assert.strictEqual(html, '<p>¯\\_(ツ)_/¯</p>');
        });
    });

    t.test('/tableflip', async () => {
        const html = await render('/tableflip');
        assert.strictEqual(html, '<p>(╯°□°）╯︵ ┻━┻</p>');
    });

    t.test('/vintner', async () => {
        const html = await render('/vintner');
        assert.strictEqual(html, '<p><img src="https://res.cloudinary.com/mediocre/image/upload/v1540480421/joddffo2zrhb1pzxz7le.png" /></p>');
    });
});

test('Google API', { concurrency: 1 }, async (t) => {
    t.test('/google', { concurrency: 1 }, async (t) => {
        t.test('/google', async () => {
            const html = await render('/google');
            assert.strictEqual(html, '<p>/google</p>');
        });

        t.test('/google meh without API key', async () => {
            const googleApiKey = process.env.GOOGLE_API_KEY;
            delete process.env.GOOGLE_API_KEY;

            const html = await render('/google meh');
            assert.strictEqual(html, '<p>/google meh</p>');

            if (googleApiKey) {
                process.env.GOOGLE_API_KEY = googleApiKey;
            }
        });

        t.test('/google meh with API key', async () => {
            if (!process.env.GOOGLE_API_KEY) {
                return;
            }

            const html = await render('/google meh');
            assert.notStrictEqual(html, '<p>/google meh</p>');
        });
    });

    t.test('/image', { concurrency: 1 }, async (t) => {
        t.test('/image', async () => {
            const html = await render('/image');
            assert.strictEqual(html, '<p>/image</p>');
        });

        t.test('/image meh', async () => {
            const html = await render('/image meh');

            if (process.env.GOOGLE_API_KEY) {
                assert.notStrictEqual(html, '<p>/image meh</p>');
            } else {
                assert.strictEqual(html, '<p>/image meh</p>');
            }
        });

        t.test('/image neon pink on black', async () => {
            const html = await render('/image neon pink on black');

            if (process.env.GOOGLE_API_KEY) {
                assert.notStrictEqual(html, '<p>/image neon pink on black</p>');
            } else {
                assert.strictEqual(html, '<p>/image neon pink on black</p>');
            }
        });

        t.test('/image THISISSOMETEXTTHATGOOGLEDOESNOTUNDERSTAND', async () => {
            const html = await render('/image THISISSOMETEXTTHATGOOGLEDOESNOTUNDERSTAND');
            assert.strictEqual(html, '<p>/image THISISSOMETEXTTHATGOOGLEDOESNOTUNDERSTAND</p>');
        });
    });

    t.test('/youtube', { concurrency: 1 }, async (t) => {
        t.test('/youtube', async () => {
            const html = await render('/youtube');
            assert.strictEqual(html, '<p>/youtube</p>');
        });

        t.test('/youtube meh without API key', async () => {
            const googleApiKey = process.env.GOOGLE_API_KEY;
            delete process.env.GOOGLE_API_KEY;

            const html = await render('/youtube meh');
            assert.strictEqual(html, '<p>/youtube meh</p>');

            if (googleApiKey) {
                process.env.GOOGLE_API_KEY = googleApiKey;
            }
        });

        t.test('/youtube Purple Reign', async () => {
            const html = await render('/youtube Purple Reign');

            if (process.env.GOOGLE_API_KEY) {
                assert.notStrictEqual(html, '<p>/youtube Purple Reign</p>');
            } else {
                assert.strictEqual(html, '<p>/youtube Purple Reign</p>');
            }
        });

        t.test('/youtube simon\'s cat', async () => {
            const html = await render('/youtube simon\'s cat');

            if (process.env.GOOGLE_API_KEY) {
                assert.notStrictEqual(html, '<a href="https://www.youtube.com/channel/UCH6vXjt-BA7QHl0KnfL-7RQ" rel="nofollow" target="_blank">https://www.youtube.com/channel/UCH6vXjt-BA7QHl0KnfL-7RQ</a>');
            } else {
                assert.strictEqual(html, '<p>/youtube simon\u2019s cat</p>');
            }
        });
    });
});

test('detect image sizes', { concurrency: true }, async (t) => {
    t.test('no images', async () => {
        const html = await render('just some plain text', { detectImageSizes: true });
        assert.strictEqual(html, '<p>just some plain text</p>');
    });

    t.test('images', async () => {
        const html = await render('https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /> <img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /></p>');
    });

    t.test('broken image', async () => {
        const html = await render('http://google.com/404.png', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img src="http://google.com/404.png" /></p>');
    });

    t.test('broken image html', async () => {
        const html = await render('http://google.com/404.png', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img src="http://google.com/404.png" /></p>');
    });

    t.test('scheme relative broken image html', async () => {
        const html = await render('//meh.com/404.png', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img src="//meh.com/404.png" /></p>');
    });

    t.test('image from editor', async () => {
        const html = await render('![enter image description here][1]\r\n\r\n  [1]: https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png "optional title"', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" alt="enter image description here" title="optional title" /></p>');
    });

    t.test('image html', async () => {
        const html = await render('https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /></p>');
    });

    t.test('scheme relative image html', async () => {
        const html = await render('//res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png', { detectImageSizes: true });
        assert.strictEqual(html, '<p><img height="528" src="//res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /></p>');
    });

    // https://github.com/stores-com/forum-service/issues/64
    t.test('BUG: Cannot read property "height" of undefined', async () => {
        const html = await render('jealous-dusty-magic http://cl.ly/image/0w251W2U1f1Q/Screen%20Shot%202014-06-16%20at%201.26.25%20PM.png @katylava says makes her think of fantasia', { detectImageSizes: true });
        assert.strictEqual(html, '<p>jealous-dusty-magic <img src="http://cl.ly/image/0w251W2U1f1Q/Screen%20Shot%202014-06-16%20at%201.26.25%20PM.png" /> <a href="/@katylava">@katylava</a> says makes her think of fantasia</p>');
    });
});

test('email', { concurrency: true }, async (t) => {
    t.test('email address', async () => {
        const html = await render('email me at whatever@somewhere.com if you are not a meanie.');
        assert.strictEqual(html, '<p>email me at <a href="mailto:whatever@somewhere.com">whatever@somewhere.com</a> if you are not a meanie.</p>');
    });

    // https://github.com/stores-com/mehdown/issues/35
    t.test('email addresses with periods should be linked correctly', async () => {
        const html = await render('firstname.lastname@example.com');
        assert.strictEqual(html, '<p><a href="mailto:firstname.lastname@example.com">firstname.lastname@example.com</a></p>');
    });
});

test('html', { concurrency: true }, async (t) => {
    t.test('convertRelativeUrlsToAbsoluteUrls', { concurrency: true }, async (t) => {
        t.test('should convert relative images', () => {
            const html = '<img src="foo.png">';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com');
            assert.strictEqual(converted, '<img src="http://mysite.com/foo.png">');
        });

        t.test('should convert relative images with slash at the beginning', () => {
            const html = '<img src="/foo.png">';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com');
            assert.strictEqual(converted, '<img src="http://mysite.com/foo.png">');
        });

        t.test('should convert relative scripts with slash at the beginning', () => {
            const html = '<script src="/test.js"></script>';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com');
            assert.strictEqual(converted, '<script src="http://mysite.com/test.js"></script>');
        });

        t.test('should convert relative images with slash at the beginning and trailing slash for base url', () => {
            const html = '<img src="/foo.png">';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com/');
            assert.strictEqual(converted, '<img src="http://mysite.com/foo.png">');
        });

        t.test('should convert relative links', () => {
            const html = '<a href="mypage"></a>';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com');
            assert.strictEqual(converted, '<a href="http://mysite.com/mypage"></a>');
        });

        t.test('should not convert absolute links', () => {
            const html = '<a href="http://google.com">test</a>';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com');
            assert.strictEqual(converted, '<a href="http://google.com">test</a>');
        });

        t.test('should not fail with links without href', () => {
            const html = '<a>test</a>';
            const converted = mehdown.html.convertRelativeUrlsToAbsoluteUrls(html, 'http://mysite.com');
            assert.strictEqual(converted, '<a>test</a>');
        });
    });

    t.test('convertToLazyLoadedImages', { concurrency: true }, async (t) => {
        t.test('no images', () => {
            const html = '<div><span>hello</span> <span>world</span></div>';
            const html2 = mehdown.html.convertToLazyLoadedImages(html);
            assert.strictEqual(html, html2);
        });

        t.test('images', () => {
            let html = '<p><img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /> <img height="250" src="https://i.imgur.com/8peBgQn.png" width="300" /> <img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /></p>';
            html = mehdown.html.convertToLazyLoadedImages(html);
            assert.strictEqual(html, '<p><img data-height="528" src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" data-width="528" /> <img data-height="250" src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://i.imgur.com/8peBgQn.png" data-width="300" /> <img data-height="528" src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" data-width="528" /></p>');
        });

        t.test('broken image', () => {
            let html = '<p><img src="http://example.com/404.png" /></p>';
            html = mehdown.html.convertToLazyLoadedImages(html);
            assert.strictEqual(html, '<p><img src="http://example.com/404.png" /></p>');
        });

        t.test('image from editor', () => {
            let html = '<p><img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" alt="enter image description here" title="optional title" /></p>';
            html = mehdown.html.convertToLazyLoadedImages(html);
            assert.strictEqual(html, '<p><img data-height="528" src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" data-width="528" alt="enter image description here" title="optional title" /></p>');
        });
    });

    t.test('permalinkHeaders', { concurrency: true }, async (t) => {
        t.test('no headers', () => {
            const html = '<div><span>hello</span> <span>world</span></div>';
            const html2 = mehdown.html.permalinkHeaders(html);
            assert.strictEqual(html, html2);
        });

        t.test('one header without id', () => {
            const html = '<div><h1>hello world</h1><p>header</p></div>';
            const html2 = mehdown.html.permalinkHeaders(html);
            assert.strictEqual(html, html2);
        });

        t.test('one header', () => {
            let html = '<div><h1 id="one">hello world</h1><p>header</p></div>';
            html = mehdown.html.permalinkHeaders(html);
            assert.strictEqual(html, '<div><h1 id="one">hello world<a class="permalink" href="#one" title="Link"><i class="fa fa-link"></i></a></h1><p>header</p></div>');
        });

        t.test('two headers', () => {
            let html = '<div><h1 id="one">hello</h1><h2 id="two">world</h2><p>header</p></div>';
            html = mehdown.html.permalinkHeaders(html);
            assert.strictEqual(html, '<div><h1 id="one">hello<a class="permalink" href="#one" title="Link"><i class="fa fa-link"></i></a></h1><h2 id="two">world<a class="permalink" href="#two" title="Link"><i class="fa fa-link"></i></a></h2><p>header</p></div>');
        });

        t.test('custom icon', () => {
            let html = '<div><h1 id="one">hello world</h1><p>header</p></div>';
            html = mehdown.html.permalinkHeaders(html, 'fa-link');
            assert.strictEqual(html, '<div><h1 id="one">hello world<a class="permalink" href="#one" title="Link"><i class="fa fa-link"></i></a></h1><p>header</p></div>');
        });
    });

    t.test('removeAttribute', { concurrency: true }, async (t) => {
        t.test('removeAttribute()', () => {
            assert.strictEqual(mehdown.html.removeAttribute(), undefined);
        });

        t.test('removeAttribute(html, attribute) no match', () => {
            const html = '<div class="foo"><span>hello</span> <span>world</span></div>';
            assert.strictEqual(mehdown.html.removeAttribute(html, 'src'), '<div class="foo"><span>hello</span> <span>world</span></div>');
        });

        t.test('removeAttribute(html, attribute) match', () => {
            const html = '<div class="foo"><span>hello</span> <span>world</span></div>';
            assert.strictEqual(mehdown.html.removeAttribute(html, 'class'), '<div ><span>hello</span> <span>world</span></div>');
        });
    });

    t.test('removeImageSizeAttributes', { concurrency: true }, async (t) => {
        t.test('removeImageSizeAttributes(htmlWithoutImage)', () => {
            const html = '<div><span>hello</span> <span>world</span></div>';
            const html2 = mehdown.html.removeImageSizeAttributes(html);
            assert.strictEqual(html, html2);
        });

        t.test('removeImageSizeAttributes(imagesWithoutSizes)', () => {
            const html = '<p><img src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" /></p>';
            const html2 = mehdown.html.removeImageSizeAttributes(html);
            assert.strictEqual(html2, html);
        });

        t.test('removeImageSizeAttributes(htmlWithImages)', () => {
            const html = '<p><img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /> <img height="250" src="https://i.imgur.com/8peBgQn.png" width="300" /> <img height="528" src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png" width="528" /></p>';
            const html2 = mehdown.html.removeImageSizeAttributes(html);
            assert.strictEqual(html2, '<p><img  src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png"  /> <img  src="https://i.imgur.com/8peBgQn.png"  /> <img  src="https://res.cloudinary.com/mediocre/image/upload/kekjvvhpkxh0v8x9o6u7.png"  /></p>');
        });
    });
});

test('links', { concurrency: true }, async (t) => {
    t.test('http://example.com', async () => {
        const html = await render('http://example.com');
        assert.strictEqual(html, '<p><a href="http://example.com">http://example.com</a></p>');
    });

    t.test('[example.com](http://example.com)', async () => {
        const html = await render('[example.com](http://example.com)');
        assert.strictEqual(html, '<p><a href="http://example.com">example.com</a></p>');
    });

    t.test('[see example.com here](http://example.com)', async () => {
        const html = await render('[see example.com here](http://example.com)');
        assert.strictEqual(html, '<p><a href="http://example.com">see example.com here</a></p>');
    });

    t.test('[see http://example.com here](http://example.com)', async () => {
        const html = await render('[see http://example.com here](http://example.com)');
        assert.strictEqual(html, '<p><a href="http://example.com">see http://example.com here</a></p>');
    });

    t.test('[leavemealone.com](http://leavemealone.com) but linkme.com', async () => {
        const html = await render('[leavemealone.com](http://leavemealone.com) but linkme.com');
        assert.strictEqual(html, '<p><a href="http://leavemealone.com">leavemealone.com</a> but <a href="http://linkme.com">linkme.com</a></p>');
    });

    t.test('[example.com](http://example.com "go to example.com")', async () => {
        const html = await render('[example.com](http://example.com "go to example.com")');
        assert.strictEqual(html, '<p><a href="http://example.com" title="go to example.com">example.com</a></p>');
    });

    t.test('simple domain', async () => {
        const html = await render('stuff google.com more stuff');
        assert.strictEqual(html, '<p>stuff <a href="http://google.com">google.com</a> more stuff</p>');
    });

    t.test('domain with path', async () => {
        const html = await render('mediocre.com/forum/topics/american-parties');
        assert.strictEqual(html, '<p><a href="http://mediocre.com/forum/topics/american-parties">mediocre.com/forum/topics/american-parties</a></p>');
    });

    t.test('domain with query string', async () => {
        const html = await render('google.com/search?q=domain');
        assert.strictEqual(html, '<p><a href="http://google.com/search?q=domain">google.com/search?q=domain</a></p>');
    });

    t.test('.horse is a TLD', async () => {
        const html = await render('https://drone.horse');
        assert.strictEqual(html, '<p><a href="https://drone.horse">https://drone.horse</a></p>');
    });

    t.test('.deals is a TLD', async () => {
        const html = await render('https://example.deals');
        assert.strictEqual(html, '<p><a href="https://example.deals">https://example.deals</a></p>');
    });

    // https://github.com/stores-com/mehdown/issues/6
    t.test('URLs with underscores should not lose the underscores', async () => {
        const html = await render('https://example.com/_/status/416050320272551936');
        assert.strictEqual(html, '<p><a href="https://example.com/_/status/416050320272551936">https://example.com/_/status/416050320272551936</a></p>');
    });

    // https://github.com/stores-com/mehdown/issues/29
    t.test('should not link two, four, or five consecutive periods', async () => {
        const html = await render('Awww....I always wanted my own baby elephant.');
        assert.strictEqual(html, '<p>Awww\u2026I always wanted my own baby elephant.</p>');
    });

    // https://github.com/stores-com/mehdown/issues/30
    t.test('should link URLs with @ characters', async () => {
        const html = await render('https://meh.com/@mediocrebot');
        assert.strictEqual(html, '<p><a href="https://meh.com/@mediocrebot">https://meh.com/@mediocrebot</a></p>');
    });

    // https://github.com/stores-com/mehdown/issues/39
    t.test('URLs that happen to have Emoji shortnames should be linked correctly', async () => {
        const html = await render('http://www.ebay.com/itm/GOgroove-BlueSYNC-OR3-Portable-Wireless-Bluetooth-Speaker-Splatter-Edition-/351328294837?var=&hash=item51cccc57b5:m:mLzVeDaMfRlxsCqFiutY-aw');
        assert.strictEqual(html, '<p><a href="http://www.ebay.com/itm/GOgroove-BlueSYNC-OR3-Portable-Wireless-Bluetooth-Speaker-Splatter-Edition-/351328294837?var=&hash=item51cccc57b5:m:mLzVeDaMfRlxsCqFiutY-aw">http://www.ebay.com/itm/GOgroove-BlueSYNC-OR3-Portable-Wireless-Bluetooth-Speaker-Splatter-Edition-/351328294837?var=&amp;hash=item51cccc57b5:m:mLzVeDaMfRlxsCqFiutY-aw</a></p>');
    });

    t.test('anchor with blank href', async () => {
        const html = await render('[hello world]()');
        assert.strictEqual(html, '<p><a href="">hello world</a></p>');
    });
});

test('newlines', { concurrency: true }, async (t) => {
    t.test('\\n', async () => {
        const html = await render('a\nb\nc\n');
        assert.strictEqual(html, '<p>a<br />\nb<br />\nc</p>');
    });

    t.test('\\r\\n', async () => {
        const html = await render('a\r\nb\r\nc\r\n');
        assert.strictEqual(html, '<p>a<br />\nb<br />\nc</p>');
    });

    t.test('<li>', async () => {
        const html = await render('- a\n- b\n- c');
        assert.strictEqual(html, '<ul>\n<li>a</li>\n<li>b</li>\n<li>c</li>\n</ul>');
    });

    t.test('<blockquote>', async () => {
        const html = await render('> Alone.\n>\n> Yes, that\'s the key word, the most awful word in the English tonque. Murder doesn\'t hold a candle to it, and hell is only a poor synonym.\n> - Stephen King');
        assert.strictEqual(html, '<blockquote>\n<p>Alone.</p>\n<p>Yes, that\u2019s the key word, the most awful word in the English tonque. Murder doesn\u2019t hold a candle to it, and hell is only a poor synonym.</p>\n<ul>\n<li>Stephen King</li>\n</ul>\n</blockquote>');
    });

    t.test('<blockquote> long', async () => {
        const html = await render('> \'cause i broke my flippin\' hand yesterday playing racquetball, that\'s\n> why, and if any of you capitalization thought police give me any\n> flames about it, or if i get one lousy letter telling me how YOU were\n> able to hit the shift key with your nose, i\'m gonna get you, YOU\n> TURKEYS!!!\n> I\'M GONNA WRITE YOUR MOTHERS!!!\n> I\'M GONNA PUNCH OUT YOUR SISTERS!!!!\n> I\'M GONNA GET YOU IF IT TAKES ME FOREVER!!!');
        assert.strictEqual(html, '<blockquote>\n<p>\u2018cause i broke my flippin\u2019 hand yesterday playing racquetball, that\u2019s<br />\nwhy, and if any of you capitalization thought police give me any<br />\nflames about it, or if i get one lousy letter telling me how YOU were<br />\nable to hit the shift key with your nose, i\u2019m gonna get you, YOU<br />\nTURKEYS!!!<br />\nI\u2019M GONNA WRITE YOUR MOTHERS!!!<br />\nI\u2019M GONNA PUNCH OUT YOUR SISTERS!!!<br />\nI\u2019M GONNA GET YOU IF IT TAKES ME FOREVER!!!</p>\n</blockquote>');
    });
});

test('strikethrough', async () => {
    const html = await render('~~strikethrough~~');
    assert.strictEqual(html, '<p><s>strikethrough</s></p>');
});

test('mehdown.kalturaEmbedHtml', { concurrency: true }, async (t) => {
    t.test('valid URL', () => {
        const html = mehdown.kalturaEmbedHtml('https://www.kaltura.com/index.php/extwidget/preview/partner_id/2056591/uiconf_id/39156232/entry_id/0_meiqzwlr/embed/iframe?&flashvars[streamerType]=auto');
        assert.strictEqual(html, '<iframe allowfullscreen class="kaltura" frameborder="0" src="https://cdnapisec.kaltura.com/p/2056591/embedIframeJs/uiconf_id/39156232?iframeembed=true&entry_id=0_meiqzwlr"></iframe>');
    });

    t.test('null', () => {
        assert.strictEqual(mehdown.kalturaEmbedHtml(null), '');
    });

    t.test('empty string', () => {
        assert.strictEqual(mehdown.kalturaEmbedHtml(''), '');
    });

    t.test('invalid URL', () => {
        assert.strictEqual(mehdown.kalturaEmbedHtml('https://example.com'), '');
    });
});

test('mehdown.youTubeEmbedHtml', { concurrency: true }, async (t) => {
    t.test('null', () => {
        assert.strictEqual(mehdown.youTubeEmbedHtml(null), '');
    });

    t.test('empty string', () => {
        assert.strictEqual(mehdown.youTubeEmbedHtml(''), '');
    });

    t.test('invalid URL', () => {
        assert.strictEqual(mehdown.youTubeEmbedHtml('https://example.com'), '');
    });

    t.test('http://www.youtube.com/watch?v=kU9MuM4lP18', () => {
        const html = mehdown.youTubeEmbedHtml('http://www.youtube.com/watch?v=kU9MuM4lP18');
        assert.strictEqual(html, '<iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light"></iframe>');
    });

    t.test('http://www.youtube.com/watch?feature=player_embedded&v=zIEIvi2MuEk', () => {
        const html = mehdown.youTubeEmbedHtml('http://www.youtube.com/watch?feature=player_embedded&v=zIEIvi2MuEk');
        assert.strictEqual(html, '<iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/zIEIvi2MuEk?autohide=1&color=white&showinfo=0&theme=light"></iframe>');
    });

    t.test('`&amp;` instead of `&` in URL', () => {
        const html = mehdown.youTubeEmbedHtml('http://www.youtube.com/watch?feature=player_embedded&amp;v=zIEIvi2MuEk');
        assert.strictEqual(html, '<iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/zIEIvi2MuEk?autohide=1&color=white&showinfo=0&theme=light"></iframe>');
    });

    t.test('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10', () => {
        const html = mehdown.youTubeEmbedHtml('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10');
        assert.strictEqual(html, '<iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light&start=10"></iframe>');
    });

    t.test('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20', () => {
        const html = mehdown.youTubeEmbedHtml('http://www.youtube.com/watch?v=kU9MuM4lP18&start=10&end=20');
        assert.strictEqual(html, '<iframe allowfullscreen class="youtube" frameborder="0" src="https://www.youtube.com/embed/kU9MuM4lP18?autohide=1&color=white&showinfo=0&theme=light&end=20&start=10"></iframe>');
    });
});

test('render', { concurrency: true }, async (t) => {
    t.test('empty string', async () => {
        const html = await mehdown.render('');
        assert.strictEqual(html, '');
    });

    t.test('null', async () => {
        const html = await mehdown.render(null);
        assert.strictEqual(html, '');
    });

    t.test('async/await, no options', async () => {
        const html = await mehdown.render('**bold**');
        assert.strictEqual(html, '<p><strong>bold</strong></p>');
    });

    t.test('async/await, options', async () => {
        const html = await mehdown.render('**bold**', { commands: false });
        assert.strictEqual(html, '<p><strong>bold</strong></p>');
    });

    t.test('callback, no options', (t, done) => {
        mehdown.render('**bold**', (err, html) => {
            assert.ifError(err);
            assert.strictEqual(html, '<p><strong>bold</strong></p>');
            done();
        });
    });

    t.test('callback, options', (t, done) => {
        mehdown.render('**bold**', { commands: false }, (err, html) => {
            assert.ifError(err);
            assert.strictEqual(html, '<p><strong>bold</strong></p>');
            done();
        });
    });
});

test('security', async () => {
    const html = await render('<script>alert("hello world");</script>');
    assert.strictEqual(html, '<p>&lt;script&gt;alert(\u201Chello world\u201D);&lt;/script&gt;</p>');
});
