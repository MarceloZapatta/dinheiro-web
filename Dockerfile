FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm.json ./
RUN npm install -g pnpm@10.30.3
RUN pnpm install --frozen-lockfile --config.minimum-release-age=0

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
