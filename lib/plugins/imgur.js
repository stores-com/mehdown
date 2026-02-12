const url = require('url');

const regExp = /(?:i\.imgur\.com\/)([a-zA-Z0-9]+)/i;

function imgurEmbed(id) {
    return `<div class="imgur-embed"><blockquote class="imgur-embed-pub" lang="en" data-id="${id}"><a href="//imgur.com/${id}">imgur.com/${id}</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script></div>`;
}

module.exports = function(md) {
    const defaultImageRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    const defaultLinkOpenRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.image = function(tokens, idx, options, env, self) {
        const openToken = tokens[idx];
        const srcIndex = openToken.attrIndex('src');

        // Ensure we have a "src" attribute
        if (srcIndex !== -1) {
            const src = openToken.attrs[srcIndex][1];

            // Ensure we have a "src" attribute value
            if (src) {
                const uri = url.parse(src);

                if (uri && uri.pathname) {
                    const matches = src.match(regExp);

                    if (matches && matches[1]) {
                        const id = matches[1];

                        return imgurEmbed(id);
                    }
                }
            }
        }

        return defaultImageRender(tokens, idx, options, env, self);
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
                    const uri = url.parse(href);

                    if (uri && uri.pathname) {
                        const matches = href.match(regExp);

                        if (matches && matches[1]) {
                            const id = matches[1];

                            textToken.content = '';
                            tokens[idx + 2].hidden = true;

                            return imgurEmbed(id);
                        }
                    }
                }
            }
        }

        return defaultLinkOpenRender(tokens, idx, options, env, self);
    };
};