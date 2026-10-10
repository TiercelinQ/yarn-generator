# yarn npm info

Affiche des informations sur un paquet du registre npm.

Source : aide `yarn npm info --help` (Yarn 4.18.1), https://yarnpkg.com/cli/npm/info

## Usage

```
yarn npm info ...
```

## Options

| Option | Description |
| --- | --- |
| `-f,--fields <valeur>` | Liste de champs du manifeste à afficher, séparés par des virgules |
| `--json` | Sortie au format flux NDJSON |

## Détails

La commande récupère des informations sur un paquet depuis le registre npm et les affiche sous forme d'arbre.

Le paquet n'a pas à être installé localement, mais doit avoir été publié (les changements locaux sont ignorés, même pour les workspaces).

Ajouter `@<range>` à l'argument fournit les informations de la dernière version satisfaisant la plage, ou de la version taguée correspondante. Si la plage est invalide ou si aucune version ne la satisfait, la commande affiche un avertissement et se rabat sur la dernière version.

Avec `-f,--fields`, seuls les champs listés sont affichés.

Par défaut, les champs `dist`, `readme` et `users` ne sont pas retournés (souvent très longs). Pour les obtenir, les lister explicitement avec `--fields` ou demander la sortie JSON.

## Exemples

Toutes les informations de react (sauf `dist`, `readme` et `users`) :

```
yarn npm info react
```

Toutes les informations de react en JSON valide (`dist`, `readme` et `users` inclus) :

```
yarn npm info react --json
```

Toutes les informations de react@16.12.0 :

```
yarn npm info react@16.12.0
```

Toutes les informations de react@next :

```
yarn npm info react@next
```

Description de react :

```
yarn npm info react --fields description
```

Toutes les versions disponibles de react :

```
yarn npm info react --fields versions
```

Readme de react :

```
yarn npm info react --fields readme
```

Quelques champs de react :

```
yarn npm info react --fields homepage,repository
```
