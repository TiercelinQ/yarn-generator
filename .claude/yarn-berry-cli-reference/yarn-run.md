# yarn run

Exécute un script défini dans le `package.json`.

Source : aide `yarn run -h` (Yarn 4.18.1), https://yarnpkg.com/cli/run

## Usage

Deux formes existent :

```
yarn run
yarn run <scriptName> ...
```

La forme sans argument accepte uniquement `--json` (sortie au format flux NDJSON). L'aide officielle ne détaille pas son comportement.

## Options (forme `yarn run <scriptName>`)

| Option | Description |
| --- | --- |
| `--inspect` | Transmis au processus Node sous-jacent lors de l'exécution d'un binaire |
| `--inspect-brk` | Transmis au processus Node sous-jacent lors de l'exécution d'un binaire |
| `-T,--top-level` | Cherche les scripts et/ou binaires dans le workspace racine au lieu du workspace courant |
| `-B,--binaries-only` | Ignore les scripts définis par l'utilisateur et ne cherche que des binaires |
| `--require <valeur>` | Transmis au processus Node sous-jacent lors de l'exécution d'un binaire |

## Détails

La commande exécute un outil. L'outil exécuté dépend de l'état du workspace :

- Si le champ `scripts` du `package.json` local contient un script de ce nom, sa définition est exécutée.
- Sinon, si une dépendance du workspace local expose un binaire de ce nom, ce binaire est exécuté.
- Sinon, si le nom contient un caractère deux-points et si un des workspaces du projet contient exactement un script de ce nom, ce script est exécuté.

Dans tous les cas, le cwd du processus lancé est le workspace qui déclare le script (ce qui permet d'appeler des commandes entre workspaces avec la troisième syntaxe).

## Exemples

Lancer les tests du workspace local :

```
yarn run test
```

Idem, sans le mot-clé `run` :

```
yarn test
```

Inspecter Webpack pendant son exécution :

```
yarn run --inspect-brk webpack
```
