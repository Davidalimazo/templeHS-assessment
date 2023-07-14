FROM node:alpine
WORKDIR /app

COPY package.json .
RUN yarn install 
COPY . .

ENV POSTGRES_URL="postgres://default:J2KdcSy9qtvp@ep-empty-union-065347-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb" \
    POSTGRES_PRISMA_URL="postgres://default:J2KdcSy9qtvp@ep-empty-union-065347-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15" \
    POSTGRES_URL_NON_POOLING="postgres://default:J2KdcSy9qtvp@ep-empty-union-065347.eu-central-1.postgres.vercel-storage.com:5432/verceldb" \
    POSTGRES_USER="default" \
    POSTGRES_HOST="ep-empty-union-065347-pooler.eu-central-1.postgres.vercel-storage.com" \
    POSTGRES_PASSWORD="J2KdcSy9qtvp" \
    POSTGRES_DATABASE="verceldb"

EXPOSE 3000

ENTRYPOINT [ "yarn" ]
CMD [ "dev" ]