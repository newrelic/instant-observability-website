const slugify = require('./slugify.js');

const resolveQuickstartSlug = (name) => {
  return `/${slugify(name)}`;
};

module.exports = resolveQuickstartSlug;
