# 1. Utilise une image officielle de Node.js
FROM node:20

# 2. Crée un dossier de travail
WORKDIR /app

# 3. Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# 4. Installe les dépendances
RUN npm install

# 5. Copie le reste des fichiers de ton projet
COPY . .

# 6. Expose le port utilisé par ton serveur
EXPOSE 8080

# 7. Commande de démarrage
CMD ["npm", "start"]
