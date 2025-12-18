# 🛠️ Système de Gestion de Réparations Électroniques
**DS2 - Mini-Projet - Dev. Backend (1ère M-ISIDS)**

**Réalisé par :** [Chahbani Omar]

---

## 🚀 Présentation
Cette API REST permet de gérer un atelier de réparation. Elle gère les stocks de pièces, les appareils (devices) et les interventions techniques avec un système de rôles (Admin/Technicien).

## 🔐 Sécurité
- **Authentification :** JWT (JSON Web Token).
- **Mots de passe :** Sécurisés avec Bcrypt.
- **Autorisation :** `RolesGuard` pour restreindre l'accès aux Managers (ADMIN) et Techniciens (TECH).

## 🛠️ Installation
1. Configurer la base de données MySQL : `repair_db`.
2. `npm install`
3. `npm run start:dev`

## 📡 Endpoints testés et fonctionnels

### 1. Authentification
- `POST /auth/register` : Inscription.
- `POST /auth/login` : Connexion (Retourne le token).

### 2. Gestion du Stock (Module 2)
- `POST /parts` : Ajouter une pièce (**Admin uniquement**).
- `GET /parts` : Voir le stock.

### 3. Gestion des Appareils (Module 3)
- `POST /devices` : Enregistrer un téléphone (Status: PENDING).
- `GET /devices` : Liste des appareils.

### 4. Interventions (Module 4)
- `POST /interventions` : Créer une fiche de réparation (**Technicien uniquement**).
  - **Automatique :** L'intervention décrémente le stock et passe le statut de l'appareil à `REPAIRING`.

---

## 🧪 Scénario de test (Cahier des charges)
1. **Connexion Admin** -> Création d'une pièce "Écran" (Stock: 10).
2. **Connexion Tech** -> Tentative de création de pièce (Erreur 403 - OK).
3. **Action Tech** -> Enregistrement d'un iPhone.
4. **Action Tech** -> Création de l'intervention.
   - *Résultat :* Stock = 9, Statut iPhone = REPAIRING.