# Use Node.js LTS
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for Vite build)
RUN npm install

# Copy project files
COPY . .

# Build the frontend
RUN npm run build

# Expose port (Cloud Run will use its own, but we document it)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
