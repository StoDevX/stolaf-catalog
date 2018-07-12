FROM alpine:3.8

RUN apk add --no-cache wget bash

RUN mkdir -p /app
WORKDIR /app
