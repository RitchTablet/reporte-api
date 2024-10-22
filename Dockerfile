# Etapa 1: Build
FROM node:20.15.1-slim AS builder

WORKDIR /app

# Copiar solo los archivos relacionados con dependencias
COPY package*.json ./

# Instalar todas las dependencias (desarrollo y producción)
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:20.15.1-slim AS production

WORKDIR /app

# Copiar solo los archivos de producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production

EXPOSE 3000

CMD ["node", "dist/main"]
