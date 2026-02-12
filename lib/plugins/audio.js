const url = require('url');

const audioFileExtensions = ['mp3', 'wav'];

module.exports = function(md) {
    const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex('href');

        if (hrefIndex !== -1) {
            const nextToken = tokens[idx + 1];
            const uri = url.parse(token.attrs[hrefIndex][1]);

            if (nextToken && nextToken.content === decodeURI(uri.href)) {
                if (uri && uri.pathname) {
                    const filename = uri.pathname.split('/').pop();
                    const extension = filename.toLowerCase().split('.').pop();

                    if (extension && audioFileExtensions.indexOf(extension) !== -1) {
                        tokens[idx + 1].content = '';
                        tokens[idx + 2].hidden = true;

                        return `<audio controls src="${uri.href}"></audio>`;
                    }
                }
            }
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};
