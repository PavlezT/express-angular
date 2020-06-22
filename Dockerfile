FROM node:10.16.0-jessie-slim

ENV NODE_ENV=development

COPY . /app/

#WORKDIR /app/Client
#RUN npm install && \
#    npm run build && \
#    cd /app/Backend && npm install

WORKDIR /app/Backend
RUN npm install 

ENTRYPOINT [ "npm", "run", "prod" ]

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
             CMD curl -f -X POST http://localhost:3000/api/health-check || exit 1