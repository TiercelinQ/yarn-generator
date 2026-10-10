# yarn up

Met à jour les dépendances du projet.

Source : aide `yarn up --help` (Yarn 4.18.1), https://yarnpkg.com/cli/up

## Usage

```
yarn up ...
```

## Options

| Option | Description |
| --- | --- |
| `-i,--interactive` | Propose divers choix selon les chemins de mise à jour détectés |
| `-F,--fixed` | Stocke les tags de dépendance tels quels au lieu de les résoudre |
| `-E,--exact` | N'applique aucun modificateur semver à la plage résolue |
| `-T,--tilde` | Applique le modificateur `~` à la plage résolue |
| `-C,--caret` | Applique le modificateur `^` à la plage résolue |
| `-R,--recursive` | Résout à nouveau TOUTES les résolutions de ces paquets |
| `--no-time-gate` | Désactive la vérification d'âge minimal de release pour cette commande |
| `--mode <mode>` | Change les artefacts générés par l'installation |

## Détails

La commande met à jour les paquets correspondant aux motifs indiqués vers leur dernière version disponible, sur tout le projet (qu'ils soient dans `dependencies` ou `devDependencies`, `peerDependencies` n'est pas affecté). C'est une commande à l'échelle du projet : tous les workspaces sont mis à jour.

Avec `-R,--recursive`, le comportement change et aucun autre flag n'est autorisé. Yarn force alors toutes les plages correspondant aux paquets sélectionnés à être résolues à nouveau (souvent vers les versions les plus hautes) avant d'être stockées dans le lockfile. Les manifestes ne sont plus touchés : selon le besoin, lancer à la fois `yarn up` et `yarn up -R`.

Avec `-i,--interactive` (ou si le paramètre `preferInteractive` est activé), la commande propose divers choix selon les chemins de mise à jour détectés. Certaines mises à jour exigent ce flag pour lever des ambiguïtés.

`-C,--caret`, `-E,--exact` et `-T,--tilde` ont le même sens que dans la commande `add` (ils changent le modificateur utilisé quand la plage est absente ou est un tag, et sont ignorés quand la plage est explicite).

Avec `--mode=<mode>`, Yarn change les artefacts générés. Modes supportés :

- `skip-build` : n'exécute aucun script de build. Différent de `enableScripts: false`, qui désactive les scripts et modifie donc le contenu des artefacts sur disque.
- `update-lockfile` : saute l'étape de link et ne récupère que les paquets absents du lockfile (ou sans checksum). Typiquement utilisé par Renovate ou Dependabot.

`yarn up` est l'équivalent de `yarn upgrade --latest` de Yarn 1 (il ignore les plages précédemment listées dans les manifestes). Contrairement à `yarn upgrade`, qui ne mettait à jour que le workspace courant, `yarn up` met à jour tous les workspaces en même temps.

La commande accepte des motifs glob en arguments (si ce sont des Descriptors valides supportés par [micromatch](https://github.com/micromatch/micromatch)). Échapper les motifs pour empêcher le shell de les expanser.

**Note :** les plages doivent être statiques, seuls les scopes et noms de paquets peuvent contenir des motifs glob.

## Exemples

Mettre à jour toutes les instances de lodash vers la dernière release :

```
yarn up lodash
```

Idem, avec confirmation pour chacune :

```
yarn up lodash -i
```

Mettre à jour toutes les instances de lodash vers 1.2.3 :

```
yarn up lodash@1.2.3
```

Mettre à jour tous les paquets du scope `@babel` vers la dernière release :

```
yarn up '@babel/*'
```

Mettre à jour tous les paquets contenant le mot `jest` vers la dernière release :

```
yarn up '*jest*'
```

Mettre à jour tous les paquets du scope `@babel` vers 7.0.0 :

```
yarn up '@babel/*@7.0.0'
```
