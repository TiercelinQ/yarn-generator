# yarn init

Crée un nouveau paquet.

Source : aide `yarn init -h` (Yarn 4.18.1), https://yarnpkg.com/cli/init

## Usage

Deux formes existent, avec les mêmes options :

```
yarn init
yarn init <initializer> ...
```

## Options

| Option | Description |
| --- | --- |
| `-p,--private` | Initialise un paquet privé |
| `-w,--workspace` | Initialise une racine de workspaces avec un dossier `packages/` |
| `-i,--install` | Initialise un paquet avec un bundle précis, verrouillé dans le projet |
| `-n,--name <valeur>` | Initialise un paquet avec le nom indiqué |

## Détails

La commande configure un nouveau paquet dans le répertoire local.

Avec `-p,--private` ou `-w,--workspace`, le paquet est privé par défaut.

Avec `-w,--workspace`, le paquet est configuré pour accepter un ensemble de workspaces dans le dossier `packages/`.

Si `-i,--install` reçoit une valeur, Yarn la télécharge d'abord avec `yarn set version`, puis transmet l'appel `init` au bundle téléchargé. Sans argument, le bundle téléchargé est `latest`.

Les réglages initiaux du manifeste se modifient avec les paramètres de configuration `initScope` et `initFields`. Yarn génère aussi un fichier EditorConfig dont les règles se changent via `initEditorConfig`, et initialise un dépôt Git dans le répertoire courant.

## Exemples

Créer un nouveau paquet dans le répertoire local :

```
yarn init
```

Créer un nouveau paquet privé :

```
yarn init -p
```

Créer un nouveau paquet et stocker la release de Yarn à l'intérieur :

```
yarn init -i=latest
```

Créer un nouveau paquet privé défini comme racine de workspaces :

```
yarn init -w
```
