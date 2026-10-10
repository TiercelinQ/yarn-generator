# yarn exec

Exécute un script shell.

Source : aide `yarn exec --help` (Yarn 4.18.1), https://yarnpkg.com/cli/exec

## Usage

```
yarn exec <commandName> ...
```

## Options

Aucune.

## Détails

La commande exécute un script shell dans le contexte du répertoire racine du workspace actif, avec le shell portable de Yarn.

Elle l'appelle de façon compatible avec le projet courant (par exemple, sur les projets PnP, l'environnement est configuré pour que PnP soit injecté correctement).

## Exemples

Exécuter une commande shell simple :

```
yarn exec echo Hello World
```

Exécuter un script shell :

```
yarn exec "tsc & babel src --out-dir lib"
```
