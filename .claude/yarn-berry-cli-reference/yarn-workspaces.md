# yarn workspaces

Commandes multi-workspaces. Trois commandes : `yarn workspaces focus`, `yarn workspaces foreach`, `yarn workspaces list`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/workspaces/focus, https://yarnpkg.com/cli/workspaces/foreach, https://yarnpkg.com/cli/workspaces/list

Pour un seul workspace : [yarn workspace](yarn-workspace.md).

---

## yarn workspaces focus

Installe un seul workspace et ses dépendances.

### Usage

```
yarn workspaces focus ...
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |
| `--production` | N'installe que les dépendances régulières, sans les dépendances de développement |
| `-A,--all` | Installe le projet entier |

### Détails

La commande lance une installation comme si les workspaces indiqués (et tous les workspaces dont ils dépendent) étaient les seuls du projet. Si aucun workspace n'est listé, le workspace actif est utilisé.

Cette commande est peu utile avec les zero-installs : le cache contient de toute façon tous les paquets, et la seule différence entre une installation complète et une installation ciblée serait quelques lignes en moins dans le fichier `.pnp.cjs`, au prix d'une complexité supplémentaire.

Avec `-A,--all`, le projet entier est installé. Combiné avec `--production`, il reproduit l'ancien `yarn install --production`.

---

## yarn workspaces foreach

Exécute une commande sur tous les workspaces.

### Usage

```
yarn workspaces foreach <commandName> ...
```

### Options

| Option | Description |
| --- | --- |
| `--from <valeur>` | Tableau d'idents glob ou de chemins servant de base à toute récursion |
| `-A,--all` | Exécute la commande sur tous les workspaces du projet |
| `-R,--recursive` | Exécute la commande sur le workspace courant et toutes ses dépendances récursives |
| `-W,--worktree` | Exécute la commande sur tous les workspaces du worktree courant |
| `-v,--verbose` | Augmente la verbosité des logs (jusqu'à 2 fois) |
| `-p,--parallel` | Exécute les commandes en parallèle |
| `-i,--interlaced` | Affiche la sortie des commandes en temps réel au lieu de la mettre en tampon |
| `-j,--jobs <valeur>` | Nombre maximal de tâches parallèles, ou `unlimited` |
| `-t,--topological` | Exécute la commande après la fin de tous les workspaces dont elle dépend (dépendances régulières) |
| `--topological-dev` | Exécute la commande après la fin de tous les workspaces dont elle dépend (régulières + dev) |
| `--include <valeur>` | Tableau d'idents glob ou de chemins ; seuls les workspaces correspondants sont parcourus |
| `--exclude <valeur>` | Tableau d'idents glob ou de chemins ; les workspaces correspondants ne sont pas parcourus |
| `--no-private` | N'exécute pas la commande sur les workspaces privés |
| `--since` | Inclut uniquement les workspaces modifiés depuis la référence indiquée |
| `-n,--dry-run` | Affiche les commandes qui seraient lancées, sans les exécuter |

### Détails

La commande exécute une sous-commande sur le workspace courant et tous ses workspaces descendants. Divers flags modifient son comportement :

- Avec `-p,--parallel`, les commandes s'exécutent en parallèle. Le nombre de tâches parallèles est limité par défaut à environ la moitié du nombre de coeurs. `-j,--jobs` le change, et `-j unlimited` supprime la limite.
- Avec `-p,--parallel` et `-i,--interlaced`, Yarn affiche les lignes de sortie au fur et à mesure. Sans `-i,--interlaced`, la sortie de chaque processus est mise en tampon et affichée à la fin du processus.
- Avec `-t,--topological`, Yarn n'exécute la commande qu'après la fin réussie de tous les workspaces dont elle dépend via le champ `dependencies`. Avec `--topological-dev`, les champs `dependencies` et `devDependencies` sont tous deux pris en compte pour déterminer les points d'attente.
- Avec `-A,--all`, Yarn exécute la commande sur tous les workspaces du projet.
- Avec `-R,--recursive`, Yarn trouve les workspaces cibles en évaluant récursivement les champs `dependencies` et `devDependencies`, au lieu de lire les champs `workspaces`.
- Avec `-W,--worktree`, Yarn trouve les workspaces cibles en regardant le worktree courant.
- Avec `--from`, Yarn utilise les paquets correspondant au glob comme point de départ de toute recherche récursive.
- Avec `--since`, Yarn n'exécute la commande que sur les workspaces modifiés depuis la référence indiquée. Par défaut, Yarn utilise les références définies par l'option de configuration `changesetBaseRefs`.
- Avec `--dry-run`, Yarn explique ce qu'il ferait sans rien faire.
- `--include` fonctionne comme liste blanche. `--exclude` fait l'inverse : liste de paquets qui ne doivent pas exécuter le script. Les deux acceptent des motifs glob (si ce sont des Idents valides supportés par [micromatch](https://github.com/micromatch/micromatch)). Échapper les motifs pour empêcher le shell de les expanser. `--no-private` évite d'exécuter la commande dans les workspaces privés.

`-v,--verbose` peut être passé jusqu'à deux fois : une fois pour préfixer les lignes de sortie du nom du workspace d'origine, une seconde fois pour inclure les lignes de début/fin/durée. La verbosité maximale est activée par défaut dans les environnements terminal.

Si la commande est `run` et que le script n'existe pas, le workspace enfant est ignoré sans erreur.

### Exemples

Publier tous les paquets :

```
yarn workspaces foreach -A --no-private npm publish --tolerate-republish
```

Lancer le script build sur tous les paquets descendants :

```
yarn workspaces foreach -A run build
```

Lancer le script build sur le paquet courant et tous ses descendants en parallèle, en construisant d'abord les dépendances :

```
yarn workspaces foreach -Apt run build
```

Lancer le script build sur plusieurs paquets et toutes leurs dépendances, en construisant d'abord les dépendances :

```
yarn workspaces foreach -Rpt --from '{workspace-a,workspace-b}' run build
```

---

## yarn workspaces list

Liste tous les workspaces disponibles.

### Usage

```
yarn workspaces list
```

### Options

| Option | Description |
| --- | --- |
| `--since` | Inclut uniquement les workspaces modifiés depuis la référence indiquée |
| `-R,--recursive` | Trouve les paquets via dependencies/devDependencies au lieu du champ workspaces |
| `--no-private` | Exclut les workspaces dont le champ `private` vaut `true` |
| `-v,--verbose` | Retourne aussi les dépendances croisées entre workspaces |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande affiche la liste de tous les workspaces du projet.

- Avec `--since`, Yarn ne liste que les workspaces modifiés depuis la référence indiquée. Par défaut, Yarn utilise les références de l'option `changesetBaseRefs`.
- Avec `-R,--recursive`, Yarn trouve les workspaces en évaluant récursivement `dependencies` et `devDependencies`, au lieu de lire les champs `workspaces`.
- Avec `--no-private`, Yarn ne liste aucun workspace dont le champ `private` vaut `true`.
- Avec `-v,--verbose` et `--json` ensemble, Yarn retourne aussi les dépendances croisées entre workspaces (utile pour générer automatiquement des règles Buck / Bazel).

### Exemples

Aucun exemple dans la documentation officielle.
