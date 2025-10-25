/** @type {import('next').NextConfig} */
const nextConfig = {
    // Prismaのバイナリファイル(.so.node)をVercelデプロイ時に確実に含めるための設定
    // schema.prismaの binaryTargets で生成されたファイルがデプロイパッケージに含まれるようにする
    outputFileTracingIncludes: {
        '/api/**/*': ['./node_modules/.prisma/client/**/*'],
        '/*': ['./node_modules/.prisma/client/**/*'],
    },
};

export default nextConfig;
