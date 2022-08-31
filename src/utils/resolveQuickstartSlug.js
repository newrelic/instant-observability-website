const slugify = require('./slugify.js');

const resolveQuickstartSlug = (name, id) => {
  return `/${slugify(name)}`;
};

module.exports = resolveQuickstartSlug;
