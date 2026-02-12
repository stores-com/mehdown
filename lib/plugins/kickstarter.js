const regExp = /(?:https?:\/\/(?:www\.)?)(?:kickstarter\.com\/projects\/)?([\w-]+)\/([\w-]+).*/i;

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
                        const id = matches[1];
                        const slug = matches[2];

                        tokens[idx + 1].content = '';
                        tokens[idx + 2].hidden = true;

                        return `<iframe class="kickstarter" frameborder="0" scrolling="no" src="https://www.kickstarter.com/projects/${id}/${slug}/widget/card.html"></iframe>`;
                    }
                }
            }
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};
