FROM node:20 AS build-stage 
ENV REACT_APP_BACKEND_URL=http://localhost:3000
WORKDIR /usr/src/app

COPY . . 

RUN npm ci

FROM build-stage AS test-stage 
RUN CI=true npm test 

RUN npm run build 


FROM nginx:1.20-alpine 
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html 