const HeadComponents = [
  <script src="https://cdn.optimizely.com/public/7331003/s/web_blog_docs.js"></script>,
  <script>alert("hello!")</script>
];

exports.onRenderBody = async ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};
