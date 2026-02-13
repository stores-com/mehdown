const emojiToolkit = require('emoji-toolkit');

const mehdown = require('../index');

const emojiToolkitRegExp = /(<img class="joypixels".*?>)/g;

module.exports = function(md, opts) {
    opts = opts || {};

    md.core.ruler.push('emoji', function(state) {
        state.tokens.filter(t => t.type === 'inline').forEach(token => {
            for (let i = token.children.length - 1; i >= 0; i--) {
                const childToken = token.children[i];
                const previousToken = token.children[i - 1];

                // Ensure parent token isn't a link with the same href as the text
                if (previousToken?.tag === 'a') {
                    const hrefIndex = previousToken.attrIndex('href');

                    if (hrefIndex !== -1 && previousToken.attrs[hrefIndex][1] === childToken.content) {
                        continue;
                    }
                }

                if (childToken.type === 'text') {
                    emojiToolkit.ascii = true;
                    emojiToolkit.imagePathPNG = opts.imagePathPNG || 'https://cdn.jsdelivr.net/joypixels/assets/6.6/png/unicode/64/';
                    emojiToolkit.unicodeAlt = false;

                    const emojiHtml = emojiToolkit.toImage(childToken.content);

                    if (childToken.content === emojiHtml) {
                        continue;
                    }

                    const _tokens = emojiHtml.split(emojiToolkitRegExp);

                    const mappedTokens = _tokens.map(t => {
                        if (t.match(emojiToolkitRegExp)) {
                            const _token = new state.Token('image', 'img', 0);
                            _token.children = [];

                            _token.attrs = [
                                ['alt', mehdown.html.getAttributeValue(t, 'alt')],
                                ['class', 'joypixels'],
                                ['src', mehdown.html.getAttributeValue(t, 'src')],
                                ['title', mehdown.html.getAttributeValue(t, 'title')]
                            ];

                            return _token;
                        }

                        const _token = new state.Token('text', '', 0);
                        _token.content = t;
                        return _token;
                    });

                    token.children = md.utils.arrayReplaceAt(token.children, i, mappedTokens);
                }
            }
        });

        // Jumbomoji
        if (state.tokens.length === 3) {
            // Ensure first and last tokens are paragraph tokens
            if (state.tokens[0].type === 'paragraph_open' && state.tokens[2].type === 'paragraph_close') {
                // Remove whitespace tokens
                const tokens = state.tokens[1].children.filter(t => !(t.type === 'text' && t.content.trim() === '') && !(t.type === 'softbreak'));

                const isClassJoypixels = attribute => attribute[0] === 'class' && attribute[1] === 'joypixels';

                // Ensure
                if (tokens.every(t => t.type === 'image' && t.attrs.some(isClassJoypixels))) {
                    tokens.forEach(t => {
                        const attribute = t.attrs.find(isClassJoypixels);
                        attribute[1] += ' jumbo';
                    });
                }
            }
        }
    });
};