FROM node:18-alpine

WORKDIR /app_img

COPY package.json .

RUN npm install --force

COPY . .


EXPOSE 3000/tcp

CMD ["npm", "run", "dev"]
