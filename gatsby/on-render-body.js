import React from 'react';

const HeadComponents = [
  <script
    key="optimizely-script"
    src="https://cdn.optimizely.com/public/7331003/s/web_blog_docs.js"
  />,
];

const onRenderBody = async ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};

export default onRenderBody;
