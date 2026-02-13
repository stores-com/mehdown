const regExp = /(?:https?:\/\/itunes\.apple\.com\/.*\/album\/.*\/(?:id)?)(\d+)/i;

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
                if (textToken?.content && regExp.test(textToken.content)) {
                    const matches = href.match(regExp);

                    if (matches?.[1]) {
                        const id = matches[1];

                        tokens[idx + 1].content = '';
                        tokens[idx + 2].hidden = true;

                        return `<iframe class="apple-music" frameborder="0" src="//tools.applemusic.com/embed/v1/album/${id}"></iframe>`;
                    }
                }
            }
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};
