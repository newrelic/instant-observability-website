const slugify = require('./slugify.js');

const resolveQuickstartSlug = (name, id) => {
  return `/${slugify(name)}/${id}`;
};

module.exports = resolveQuickstartSlug;
