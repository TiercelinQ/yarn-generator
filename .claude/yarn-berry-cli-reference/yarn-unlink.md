# yarn unlink

Déconnecte le projet local d'un autre.

Source : aide `yarn unlink --help` (Yarn 4.18.1), https://yarnpkg.com/cli/unlink

## Usage

```
yarn unlink ...
```

## Options

| Option | Description |
| --- | --- |
| `-A,--all` | Délie du projet courant tous les workspaces du projet cible |

## Détails

La commande supprime les résolutions du manifeste du projet qu'un `yarn link` aux arguments similaires aurait ajoutées.

Commande inverse : [yarn link](yarn-link.md)

## Exemples

Désenregistrer un workspace distant du projet courant :

```
yarn unlink ~/ts-loader
```

Désenregistrer tous les workspaces d'un projet distant :

```
yarn unlink ~/jest --all
```

Désenregistrer tous les workspaces précédemment liés :

```
yarn unlink --all
```

Désenregistrer tous les workspaces correspondant à un glob :

```
yarn unlink '@babel/*' 'pkg-{a,b}'
```
