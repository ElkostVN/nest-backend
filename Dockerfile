FROM node:slim AS builder
RUN npm install -g pnpm
WORKDIR /srv/@elkost-nest-backend
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json ./
COPY .env ./
COPY src ./src
COPY prisma ./prisma
RUN pnpm prisma:generate
RUN pnpm build

FROM node:slim
RUN npm install -g pnpm
WORKDIR /srv/@elkost-nest-backend
RUN chown node:node .
USER node
COPY package.json pnpm-lock.yaml ./
COPY .env ./
COPY prisma ./prisma
RUN pnpm install --prod
COPY --from=builder /srv/@elkost-nest-backend/dist dist/
RUN pnpm prisma:generate
CMD ["pn", "run dev"]