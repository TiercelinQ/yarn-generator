# yarn node

Lance node avec le hook Yarn déjà configuré.

Source : https://yarnpkg.com/cli/node

## Usage

```
yarn node ...
```

## Options

Aucune option propre à Yarn n'est listée. Les arguments sont transmis à Node.js (`yarn node --help` affiche l'aide de Node).

## Détails

La commande lance Node de façon adaptée au projet courant. Sur les projets Plug'n'Play (PnP), l'environnement est configuré pour que PnP soit correctement injecté.

Node s'exécute avec la même version que celle qui fait tourner Yarn.

## Exemples

Exécuter un script Node :

```
yarn node ./my-script.js
```
