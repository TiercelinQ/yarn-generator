# yarn bin

Affiche le chemin d'un binaire.

Source : https://yarnpkg.com/cli/bin (Yarn 4.18.1)

## Usage

```
yarn bin [name]
```

## Options

| Option | Description |
| --- | --- |
| `-v,--verbose` | Affiche le nom du binaire et le locator du paquet qui le fournit |
| `--json` | Sortie au format flux NDJSON |

## Détails

Sans argument, la commande affiche la liste des binaires disponibles dans le workspace courant. Avec `-v,--verbose`, la sortie contient le nom du binaire et le locator du paquet qui le fournit.

Avec un argument, la commande affiche uniquement le chemin du binaire sur la sortie standard, puis quitte. Le chemin affiché peut se trouver dans une archive zip.

## Exemples

Lister tous les binaires disponibles :

```
yarn bin
```

Afficher le chemin d'un binaire précis :

```
yarn bin eslint
```
