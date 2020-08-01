
FROM node:10-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:10-alpine
RUN npm i serve -g
WORKDIR /app
COPY --from=builder /app/build .

EXPOSE 3000
CMD ["serve", "-p", "3000", "-s", "."]
