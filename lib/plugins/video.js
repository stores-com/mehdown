const url = require('url');

const videoFileExtensions = ['mp4', 'webm'];

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

            if (nextToken?.content === decodeURI(uri.href)) {
                if (uri?.pathname) {
                    const filename = uri.pathname.split('/').pop();
                    const extension = filename.toLowerCase().split('.').pop();

                    if (extension && videoFileExtensions.indexOf(extension) !== -1) {
                        tokens[idx + 1].content = '';
                        tokens[idx + 2].hidden = true;

                        return `<video controls src="${uri.href}"></video>`;
                    }
                }
            }
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};
