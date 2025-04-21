/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // This suppresses the warnings about extra attributes
  compiler: {
    // Suppress the "Extra attributes from the server" warning
    reactRemoveProperties: { properties: ['^data-new-gr-c-s-check-loaded$', '^data-gr-ext-installed$'] }
  }
};

module.exports = nextConfig; 