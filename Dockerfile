FROM node:18-slim

WORKDIR /app
COPY . .

RUN apt update && apt install -y libglib2.0-0 libsm6 libxext6 libxrender1 \
    && npm install

CMD ["npm", "start"]
