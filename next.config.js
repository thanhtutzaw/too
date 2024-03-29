/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },

}

module.exports = nextConfig

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://toodemo.vercel.app',
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['images.unsplash.com'],
    // domains: ['lh3.googleusercontent.com'],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "*.googleusercontent.com",
    //     port: "",
    //     pathname: "**",
    //   },
    // ],
  }
}
module.exports = {
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  }, i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  }

};
