FROM node:alpine

EXPOSE 8080

ENV PORT 8080
ENV NODE_ENV production

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production --quiet || { exit 1; } && mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app

COPY . /opt/app

RUN npm run build

RUN rm -rf ./app/client \
	rm -rf ./app/common \
	rm -rf ./node_modules/webpack

CMD ["npm", "start"]
