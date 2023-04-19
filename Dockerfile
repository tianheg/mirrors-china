FROM node:lts-alpine as build0

WORKDIR /mirrors
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

COPY . /mirrors/
RUN pnpm build

FROM nginx:alpine

COPY --from=build0 /mirrors/dist /usr/share/nginx/html
EXPOSE 80
