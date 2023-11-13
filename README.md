# E-Commerce

> TechStack: Nodejs, Express, MongoDB, JWT, Docker

## Usage
- Create private key with pass phrase file private-key/private_key.pem:
```bash
cd keys
openssl genpkey -algorithm RSA -out private_key.pem -aes256
```
or
```bash
openssl genrsa -out private_key.pem
```
- Create public key file keys/public_key.pem:
```bash
openssl rsa -pubout -in private_key.pem -out public_key.pem -RSAPublicKey_out
```
- Create keys use javascript:
```bash
yarn run create-keys
```

> flag -aes256: required pass phrase

## Install dependencies
```bash
yarn
```

## Run App
```bash
yarn start
```

## Docker
- Build docker images and run docker containers
```bash
docker-compose up
```

- Build docker images
```bash
docker-compose build
```

- Stop docker containers
```bash
docker-compose stop
```

- Delete docker containers
```bash
docker-compose down
```

- Show docker containers
```bash
docker-compose ps
```