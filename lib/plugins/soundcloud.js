const url = require('url');

const regExp = /(?:https?:\/\/(?:www\.)?)?(?:soundcloud.com|snd.sc)\/.*/i;

module.exports = function(md) {
    const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        const openToken = tokens[idx];
        const hrefIndex = openToken.attrIndex('href');

        // Ensure we have an "href" attribute
        if (hrefIndex !== -1) {
            const href = openToken.attrs[hrefIndex][1];

            // Ensure we have an "href" attribute value
            if (href) {
                const textToken = tokens[idx + 1];

                // Ensure we have a text token and the text matches the URL pattern instead of [text](http://example.com/)
                if (textToken && textToken.content && regExp.test(textToken.content)) {
                    const matches = href.match(regExp);

                    if (matches) {
                        const uri = url.parse(href);

                        uri.host = 'soundcloud.com';
                        uri.protocol = 'https:';

                        textToken.content = '';
                        tokens[idx + 2].hidden = true;

                        return `<iframe class="soundcloud" frameborder="0" src="https://w.soundcloud.com/player/?visual=true&url=${encodeURIComponent(url.format(uri))}"></iframe>`;
                    }
                }
            }
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};
