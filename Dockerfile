# Use Node.js base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# ✅ Copy local node_modules — assume you ran `npm install` locally
COPY node_modules/ ./node_modules/

# Copy source files
COPY src/ ./src/

# Copy data folder (input/output)
COPY data/ ./data/

# Set the default command
CMD ["node", "src/main.js"]
