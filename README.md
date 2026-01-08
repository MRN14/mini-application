# mini-application

mini-application est un projet réalisé dans le cadre d'une demande de stage auprès de la DGA TT de Bourges.
Dans ce contexte le code sera entièrement commenté en français.

## Consigne

Réaliser une mini-application de gestion d’un petit magasin.
La technologie est libre, tant que cela reste dans l’écosystème web (Python, Node.js, React, ...).

### Fonctionnalités attendues

- [x] Afficher la liste des produits (avec pour chaque produit : un nom, une qté, un fabricant, une référence)
- [x] Système CRUD complet
- [x] Sauvegarde des données (Une petite base de données relationnelles simples en SQLite)
- [x] Rechercher un produit (par nom ou réf)
- [x] Trie des produits

Tu es libre d’ajouter toute fonctionnalité ou amélioration que tu juges pertinente.

### Livrables attendus

Le projet doit être livré via un dépôt Github comprenant :

- Le code complet.
- un README contenant :
  - [x] Les instructions pour lancer le projet
  - [x] Tes choix techniques
  - [x] Le limites connues
  - [x] Les améliorations possibles.

#### Date limite et envoi

Le projet doit être remis 1 semaine avant le rendez-vous physique par mail avec le lien du dépôt.

## instuctions

Premier lancement :

1. Compléter le fichier `.env`
2. exécutez `npm run demo`
3. Ouvez `http://localhost:3000` dans votre navigateur

Pour relancer le projet déjà initialisé par `npm run demo` exécuter `npm run dev`

## choix techniques

### technologies

Pour cette application j'ai choisi un environnement **NodeJS** pour sa modernité et sa richesse.
Côté serveur j'ai choisi de créer un server **express** qui permet de mettre en place un serveur rapidement et possède un routeur intuitif.
Pour intégrer facilement les données à mes vues j'ai utilisé le view engine **pug** parmis les trois view engines compatible avec express.
Pour ce qui est de la base de donnée sql, j'ai choisi l'ORM **prisma** qui permet de schématiser et générer une base de données rapidement avec une syntaxe très clair. Je l'ai également choisi plutôt que sequelize ou drizzle pour sa grande compatibilité avec **typescript**.
Pour la création de données fictives, j'ai utilisé la dépendance **faker** afin de générer des données aléatoires.
J'ai utilisé **git** pour versionner mon projet et **github** pour partager la branche `main` du projet.
Pour le css j'ai utilisé les fichiers du **design système du gouvernement** créé pour unifier les interfaces des sites  gouvernementaux.

### base de données

La base de donnée ne contient actuellement qu'une seule table `product`.

| product |
| :--: |
| ref |
| name |
| manufacturer |
| quantity |

### structure

Acrhitecture mvc

```mini-application
|- 📂 generated 
    |- 📂 prisma    --client prisma
|- 📂 lib 
    |- 📜 prisma.ts   --instancie les client prisma
|- 📂 prisma
    |- 📂 migrations
    |- 📜 schema.prisma   --schéma de la base de données
|- 📂 public  --contient les fichiers du design système français
    |- 📂 dsfr
    |- 📂 favicon  
    |- 📂 fonts  
    |- 📂 icons  
|- 📂 src
    |- 📂 controllers  
        |-- 📜 productController.ts
    |- 📂 routes
        |-- 📜 productController.ts
    |- 📜 app.ts    --point d'entrer de l'application, contient le serveur express
    |- 📜 seed.ts   --script de fixtures
|- 📂 views
    |- 📂 includes
        |-- 📜 head.pug
        |-- 📜 foot.pug
    |- 📂 products
        |- 📜 detail.pug
        |- 📜 edit.pug
        |- 📜 list.pug
        |- 📜 new.pug
    |- 📜 index.pug
|- 📂 node_modules
|- 📜 .env    --contient le chemin faire la base de données
|- 📜 .package-lock.json
|- 📜 .package.json
|- 📜 .prisma.config.ts
|- 📜 README.md
|- 📜 sqlite.db   --stock la base de données
|- 📜 tsconfig.json   --permet la compilation du typescript
```

## limites connues

- L'application ne protège actuellement pas l'enregistrement du ref produit vide
- L'application ne gère actuellement pas les erreurs tels qu'un produit non trouvé

## améliorations possibles

- Évolutions de la base de données :
  - ajout d'une table `manufacturer` pour gérer les données de fabricants
  - ajout d'une table `warehouse` et d'une table de jointure avec `product` pour gérer les tocks en fonction des entrepôts
- Création de tests unitaires
- Gestion de différents droits d'accès pour la lecture et l'écriture
