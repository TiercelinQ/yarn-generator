# yarn pnpify run

Exécute une commande avec un dossier `node_modules` virtuel.

Commande du paquet `@yarnpkg/pnpify` (hors cœur de Yarn). Prérequis : installer `@yarnpkg/pnpify` en local (`yarn add`, puis lancer avec `yarn run`) ou l'exécuter temporairement avec `yarn dlx`.

Source : https://yarnpkg.com/cli/pnpify/run

## Usage

```
yarn pnpify run <commandName> ...
```

## Options

| Option | Description |
| --- | --- |
| `--cwd <valeur>` | Répertoire dans lequel la commande s'exécute |

## Détails

Quand un projet qui ne supporte pas Plug'n'Play lit `node_modules` (par exemple avec `readdir` ou `readFile`), PnPify intercepte ces appels et les redirige vers l'API PnP. Il présente alors un dossier `node_modules` virtuel à l'outil, qui ne sait pas que les fichiers viennent d'un système de fichiers virtuel.

Le mot-clé `run` est optionnel quand le nom de la commande n'entre pas en conflit avec une commande Yarn intégrée.

Plus d'informations : page PnPify de la section Advanced du site Yarn.

## Exemples

Lancer Angular via PnPify :

```
yarn pnpify ng build
```
