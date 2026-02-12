const querystring = require('querystring');
const url = require('url');

const regExp = /(?:https?:\/\/(?:www\.)?)?(?:facebook\.com\/)([A-z0-9.]+)\/videos(?:\/[0-9A-z].+)?\/(\d+)(?:.+)?$/i;

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

                    if (matches && matches[1] && matches[2]) {
                        textToken.content = '';
                        tokens[idx + 2].hidden = true;

                        const query = {
                            href: `https://www.facebook.com/${matches[1]}/videos/${matches[2]}`
                        };

                        const uri = url.parse(href, true);

                        ['autoplay', 'show-captions', 'show-text'].forEach(param => {
                            if (uri.query[param]) {
                                query[param] = uri.query[param];
                            }
                        });

                        return `<iframe allowfullscreen class="facebook video" frameborder="0" src="https://www.facebook.com/plugins/video.php?${querystring.stringify(query)}"></iframe>`;
                    }
                }
            }
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};
