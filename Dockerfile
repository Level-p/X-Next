FROM node:20-alpine 

WORKDIR /app
RUN npm install
# Build the app
RUN npm run build

EXPOSE 3000

# Lightweight healthcheck (no curl needed)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', res => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["npm", "start"]