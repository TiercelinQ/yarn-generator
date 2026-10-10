# yarn info

Affiche des informations sur les paquets.

Source : aide `yarn info --help` (Yarn 4.18.1), https://yarnpkg.com/cli/info

## Usage

```
yarn info ...
```

## Options

| Option | Description |
| --- | --- |
| `-A,--all` | Affiche les versions d'un paquet sur l'ensemble du projet |
| `-R,--recursive` | Affiche les informations de tous les paquets, dépendances transitives incluses |
| `-X,--extra <valeur>` | Tableau de demandes de données supplémentaires fournies par des plugins |
| `--cache` | Affiche les informations de l'entrée de cache d'un paquet (chemin, taille, checksum) |
| `--dependents` | Affiche tous les dépendants de chaque paquet correspondant |
| `--manifest` | Affiche les données obtenues depuis l'archive du paquet (licence, homepage, ...) |
| `--name-only` | Affiche uniquement le nom des paquets correspondants |
| `--virtuals` | Affiche chaque instance des paquets virtuels |
| `--json` | Sortie au format flux NDJSON |

## Détails

La commande affiche diverses informations sur les paquets indiqués, avec support des motifs glob.

Par défaut, si la référence du locator est absente, Yarn affiche les informations de toutes les dépendances directes correspondantes du workspace actif. Pour afficher toutes les versions du paquet qui sont dépendances directes d'un workspace quelconque, utiliser `-A,--all`. Ajouter `-R,--recursive` inclut aussi les dépendances transitives.

Certains champs sont masqués par défaut pour garder une sortie lisible. Ils s'affichent via des options supplémentaires (`--dependents`, `--manifest`, `--virtuals`, ...).

La commande n'affiche que les informations directement liées aux paquets sélectionnés. Pour savoir pourquoi un paquet est présent, utiliser `yarn why` (qui propose aussi un flag `-R,--recursive`).

## Exemples

Afficher les informations sur Lodash :

```
yarn info lodash
```
