# yarn cache clean

Supprime les fichiers du cache partagé.

Source : https://yarnpkg.com/cli/cache/clean (Yarn 4.18.1)

## Usage

```
yarn cache clean
```

## Options

| Option | Description |
| --- | --- |
| `--mirror` | Supprime les fichiers du cache global au lieu du cache local |
| `--all` | Supprime les fichiers du cache global et du cache local du projet courant |

## Détails

La commande supprime tous les fichiers du cache.

## Exemples

Supprimer toutes les archives locales :

```
yarn cache clean
```

Supprimer toutes les archives stockées dans le dossier `~/.yarn` :

```
yarn cache clean --mirror
```
