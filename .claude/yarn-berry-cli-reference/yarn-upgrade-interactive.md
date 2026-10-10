# yarn upgrade-interactive

Ouvre l'interface de mise à jour.

Source : aide `yarn upgrade-interactive --help` (Yarn 4.18.1), https://yarnpkg.com/cli/upgrade-interactive

## Usage

```
yarn upgrade-interactive
```

## Options

| Option | Description |
| --- | --- |
| `--mode <mode>` | Change les artefacts générés par l'installation |

## Détails

La commande ouvre une interface terminal plein écran qui affiche les paquets obsolètes utilisés par l'application, leur état par rapport aux dernières versions du registre distant, et permet de sélectionner les paquets à mettre à jour.

Avec `--mode=<mode>`, Yarn change les artefacts générés. Modes supportés :

- `skip-build` : n'exécute aucun script de build. Différent de `enableScripts: false`, qui désactive les scripts et modifie donc le contenu des artefacts sur disque.
- `update-lockfile` : saute l'étape de link et ne récupère que les paquets absents du lockfile (ou sans checksum). Typiquement utilisé par Renovate ou Dependabot.

## Exemples

Ouvrir la fenêtre de mise à jour :

```
yarn upgrade-interactive
```
