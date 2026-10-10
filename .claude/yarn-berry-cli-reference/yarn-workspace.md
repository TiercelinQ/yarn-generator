# yarn workspace

Exécute une commande dans le workspace indiqué.

Source : aide `yarn workspace --help` (Yarn 4.18.1), https://yarnpkg.com/cli/workspace

## Usage

```
yarn workspace <workspaceName> <commandName> ...
```

## Options

Aucune.

## Détails

La commande exécute une sous-commande donnée sur un seul workspace.

Pour exécuter sur plusieurs workspaces, voir [yarn workspaces](yarn-workspaces.md).

## Exemples

Ajouter un paquet à un seul workspace :

```
yarn workspace components add -D react
```

Lancer le script build sur un seul workspace :

```
yarn workspace components run build
```
