/** @type {import('next').NextConfig} */
// export const output = 'export';
module.exports = {
    // output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**',
            },
        ],
    },
};
