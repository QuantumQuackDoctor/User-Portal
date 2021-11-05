FROM node:14.17.3 as build-step

WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
EXPOSE 4200
RUN npm run build --prod


FROM nginx:alpine
COPY --from=build-step /app/dist/User-Portal /usr/share/nginx/html

