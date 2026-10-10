# yarn remove

Retire des dépendances du projet.

Source : aide `yarn remove --help` (Yarn 4.18.1), https://yarnpkg.com/cli/remove

## Usage

```
yarn remove ...
```

## Options

| Option | Description |
| --- | --- |
| `-A,--all` | Applique l'opération à tous les workspaces du projet courant |
| `--mode <mode>` | Change les artefacts générés par l'installation |

## Détails

La commande retire du workspace courant les paquets correspondant aux motifs indiqués.

Avec `--mode=<mode>`, Yarn change les artefacts générés. Modes supportés :

- `skip-build` : n'exécute aucun script de build. Différent de `enableScripts: false`, qui désactive les scripts et modifie donc le contenu des artefacts sur disque.
- `update-lockfile` : saute l'étape de link et ne récupère que les paquets absents du lockfile (ou sans checksum). Typiquement utilisé par Renovate ou Dependabot.

La commande accepte des motifs glob en arguments (si ce sont des Idents valides supportés par [micromatch](https://github.com/micromatch/micromatch)). Échapper les motifs pour empêcher le shell de les expanser.

## Exemples

Retirer une dépendance du projet courant :

```
yarn remove lodash
```

Retirer une dépendance de tous les workspaces :

```
yarn remove lodash --all
```

Retirer toutes les dépendances commençant par `eslint-` :

```
yarn remove 'eslint-*'
```

Retirer toutes les dépendances du scope `@babel` :

```
yarn remove '@babel/*'
```

Retirer toutes les dépendances correspondant à `react-dom` ou `react-helmet` :

```
yarn remove 'react-{dom,helmet}'
```
