
# Stage 1: installiert Abhängigkeiten, kopiert den Code und führt den Build-Befehl aus

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json package-lock.json ./


RUN npm i


COPY . ./

RUN npx prisma generate

# Build the project
RUN npm run build

# Build Stage 2

FROM node:22-alpine
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
