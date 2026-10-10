# yarn set version

Verrouille la version de Yarn utilisée par le projet. Deux commandes : `yarn set version` et `yarn set version from sources`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/set/version, https://yarnpkg.com/cli/set/version/from/sources

---

## yarn set version

Verrouille la version de Yarn utilisée par le projet.

### Usage

```
yarn set version <version>
```

### Options

| Option | Description |
| --- | --- |
| `--yarn-path` | Définit le paramètre `yarnPath` même si la version est accessible via Corepack |
| `--only-if-needed` | Ne verrouille la version de Yarn que si elle ne l'est pas déjà |

### Détails

La commande définit une release précise de Yarn à utiliser via Corepack : https://nodejs.org/api/corepack.html

Par défaut, elle ne définit que le champ `packageManager` à la racine du projet. Si la release référencée ne peut pas être représentée ainsi, si `yarnPath` est déjà configuré, ou si le flag `--yarn-path` est utilisé, la release est aussi téléchargée depuis le dépôt GitHub de Yarn, stockée dans le projet et référencée via le paramètre `yarnPath` du fichier `.yarnrc.yml`.

Cas d'usage typique : imposer la même version de Yarn à tous les membres d'une équipe sur un projet. Les montées et descentes de version restent sous contrôle (serveurs de déploiement inclus), ce qui évite la plupart des problèmes liés à des versions légèrement différentes.

Le spécificateur de version peut être :

- un tag :
  - `latest` / `berry` / `stable` : la release berry stable la plus récente (`>=2.0.0`)
  - `canary` : la release berry canary (release candidate) la plus récente (`>=2.0.0`)
  - `classic` : la release classic la plus récente (`^0.x || ^1.x`)
- une plage semver (par exemple `2.x`) : la version la plus récente satisfaisant la plage (releases berry uniquement)
- une version semver (par exemple `2.4.1`, `1.22.1`)
- un fichier local référencé par un chemin relatif ou absolu
- `self` : la version utilisée pour lancer la commande

### Exemples

Télécharger la dernière release depuis le dépôt Yarn :

```
yarn set version latest
```

Télécharger la dernière release canary :

```
yarn set version canary
```

Télécharger la dernière release classic :

```
yarn set version classic
```

Télécharger le build Yarn 3 le plus récent :

```
yarn set version 3.x
```

Télécharger un build Yarn 2 précis :

```
yarn set version 2.0.0-rc.30
```

Revenir à une release Yarn 1 précise :

```
yarn set version 1.22.1
```

Utiliser une release du système de fichiers local :

```
yarn set version ./yarn.cjs
```

Utiliser une release depuis une URL :

```
yarn set version https://repo.yarnpkg.com/3.1.0/packages/yarnpkg-cli/bin/yarn.js
```

Télécharger la version utilisée pour lancer la commande :

```
yarn set version self
```

---

## yarn set version from sources

Compile Yarn depuis master.

### Usage

```
yarn set version from sources
```

### Options

| Option | Description |
| --- | --- |
| `--path <valeur>` | Chemin où cloner le dépôt |
| `--repository <valeur>` | Dépôt à cloner |
| `--branch <valeur>` | Branche du dépôt à cloner |
| `--plugin <valeur>` | Tableau de plugins supplémentaires à inclure dans le bundle |
| `-n,--dry-run` | Compile le bundle sans l'ajouter au projet |
| `--no-minify` | Compile un bundle de développement (debug), non minifié et non mangled |
| `-f,--force` | Clone toujours le dépôt au lieu d'essayer de récupérer les derniers commits |
| `--skip-plugins` | Saute la mise à jour des plugins contrib |

### Détails

La commande clone le dépôt Yarn dans un dossier temporaire, puis le compile. Le bundle obtenu est copié dans le projet local.

Par défaut, elle met aussi à jour tous les plugins contrib vers le commit à partir duquel le bundle est compilé. `--skip-plugins` désactive ce comportement.

### Exemples

Compiler Yarn depuis master :

```
yarn set version from sources
```
