# syntax=docker/dockerfile:1

# --- Build: genera el bundle estático con Vite ---
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# En contenedor servimos en la raíz. GitHub Pages sigue usando el base por defecto
# de vite.config.js (/calculadora-finiquito-LFT-MX/).
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE

RUN npm run build

# --- Runtime: nginx sirve dist/ ---
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
