# yarn why

Explique pourquoi un paquet est nécessaire.

Source : aide `yarn why --help` (Yarn 4.18.1), https://yarnpkg.com/cli/why

## Usage

```
yarn why <package>
```

## Options

| Option | Description |
| --- | --- |
| `-R,--recursive` | Liste, pour chaque workspace, tous les chemins menant à la dépendance |
| `--json` | Sortie au format flux NDJSON |
| `--peers` | Affiche aussi les peer dependencies correspondant au nom indiqué |

## Détails

La commande affiche les raisons exactes pour lesquelles un paquet apparaît dans l'arbre de dépendances. Indiquer une version ou une plage permet de savoir pourquoi l'arbre contient une version précise d'un paquet. Utile pour trouver pourquoi le projet dépend de versions plus basses.

Avec `-R,--recursive`, la liste va en profondeur et indique, pour chaque workspace, tous les chemins menant à la dépendance. L'affichage est optimisé : la liste d'un paquet n'est pas affichée deux fois. Si une feuille "Foo" apparaît lors de la recherche de "Bar", cela signifie que "Foo" a déjà été affiché plus haut dans l'arbre.

## Exemples

Expliquer pourquoi lodash est utilisé dans le projet :

```
yarn why lodash
```

Expliquer pourquoi la version 3.3.1 de lodash est dans le projet :

```
yarn why lodash@3.3.1
```

Expliquer pourquoi une version 3.X de lodash est dans le projet :

```
yarn why lodash@^3
```
