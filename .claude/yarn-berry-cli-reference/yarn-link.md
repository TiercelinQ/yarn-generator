# yarn link

Connecte le projet local à un autre.

Source : aide `yarn link --help` (Yarn 4.18.1), https://yarnpkg.com/cli/link

## Usage

```
yarn link ...
```

## Options

| Option | Description |
| --- | --- |
| `-A,--all` | Lie au projet courant tous les workspaces des projets cibles |
| `-p,--private` | Lie aussi les workspaces privés des projets cibles |
| `-r,--relative` | Lie les workspaces avec des chemins relatifs au lieu de chemins absolus |

## Détails

La commande ajoute un champ `resolutions` dans le manifeste du projet et le fait pointer vers le workspace à l'emplacement indiqué (même s'il appartient à un autre projet).

Commande inverse : [yarn unlink](yarn-unlink.md)

## Exemples

Enregistrer un ou plusieurs workspaces distants pour le projet courant :

```
yarn link ~/ts-loader ~/jest
```

Enregistrer tous les workspaces d'un projet distant pour le projet courant :

```
yarn link ~/jest --all
```
