# yarn add

Ajoute des dépendances au projet.

Source : https://yarnpkg.com/cli/add (Yarn 4.18.1)

## Usage

```
yarn add ...
```

## Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |
| `-F,--fixed` | Stocke les tags de dépendance tels quels au lieu de les résoudre |
| `-E,--exact` | N'applique aucun modificateur semver à la plage résolue |
| `-T,--tilde` | Applique le modificateur `~` à la plage résolue |
| `-C,--caret` | Applique le modificateur `^` à la plage résolue |
| `-D,--dev` | Ajoute le paquet comme dépendance de développement |
| `-P,--peer` | Ajoute le paquet comme peer dependency |
| `-O,--optional` | Ajoute / met à jour le paquet en dépendance optionnelle (régulière ou peer) |
| `--prefer-dev` | Ajoute / met à jour le paquet en dépendance de développement |
| `-i,--interactive` | Réutilise le paquet indiqué depuis les autres workspaces du projet |
| `--cached` | Réutilise la version la plus haute déjà utilisée dans le projet |
| `--no-time-gate` | Désactive la vérification d'âge minimal de release pour cette commande |
| `--mode <mode>` | Change les artefacts générés par l'installation |

## Détails

La commande ajoute un paquet au `package.json` du workspace le plus proche.

- Si le paquet n'existait pas, il est ajouté par défaut dans `dependencies`. Le flag `-D,--dev` l'ajoute dans `devDependencies`, et `-P,--peer` dans `peerDependencies`.
- Si le paquet figure déjà dans les dépendances, il est mis à jour, qu'il soit dans `dependencies` ou `devDependencies`. `peerDependencies` n'est jamais mis à jour.
- `--prefer-dev` est une variante plus souple de `-D,--dev` : le paquet est ajouté à `devDependencies` s'il n'est listé ni dans `dependencies` ni dans `devDependencies`, mais une entrée existante de `dependencies` est mise à jour (alors que `-D,--dev` lèverait une exception).
- `-O,--optional` ajoute le paquet à `optionalDependencies`. Combiné avec `-P,--peer`, il l'ajoute comme peer dependency optionnelle. Un paquet déjà présent dans `dependencies` est déplacé vers `optionalDependencies`. Un paquet déjà présent dans `peerDependencies`, avec `-P,--peer`, devient une peer dependency optionnelle : `"peerDependenciesMeta": { "<package>": { "optional": true } }`.
- Si le paquet ajouté n'a aucune plage, son tag `latest` est résolu et la version obtenue sert à générer une plage semver. Le modificateur par défaut est `^` (réglable via `defaultSemverRangePrefix`), `~` avec `-T,--tilde`, aucun avec `-E,--exact`. Deux exceptions : un workspace utilise sa version locale, et avec `-P,--peer` la plage par défaut est `*` sans résolution.
- Si le paquet ajouté a une plage (`^1.0.0`, `latest`, `rc`), elle est écrite telle quelle dans le `package.json` (un tag comme `rc` n'est pas converti en plage semver).

Avec `--cached`, Yarn réutilise de préférence la version la plus haute déjà utilisée dans le projet, y compris via une dépendance transitive.

Avec `-i,--interactive` (ou si le paramètre `preferInteractive` est activé), la commande vérifie d'abord si d'autres workspaces du projet utilisent le paquet et propose de les réutiliser.

Avec `--mode=<mode>`, Yarn change les artefacts générés. Modes supportés :

- `skip-build` : n'exécute aucun script de build. Différent de `enableScripts: false` : ce dernier désactive les scripts et modifie donc le contenu des artefacts écrits sur disque, alors que `skip-build` ne fait que sauter l'étape de build.
- `update-lockfile` : saute entièrement l'étape de link et ne récupère que les paquets absents du lockfile (ou sans checksum). Typiquement utilisé par Renovate ou Dependabot pour tenir un lockfile à jour sans le coût d'une installation complète.

Liste des protocoles supportés : https://yarnpkg.com/protocols

## Exemples

Ajouter un paquet classique au workspace courant :

```
yarn add lodash
```

Ajouter une version précise :

```
yarn add lodash@1.2.3
```

Ajouter un paquet depuis un dépôt GitHub (branche master) via une URL :

```
yarn add lodash@https://github.com/lodash/lodash
```

Idem avec le protocole GitHub :

```
yarn add lodash@github:lodash/lodash
```

Idem avec le protocole GitHub (forme courte) :

```
yarn add lodash@lodash/lodash
```

Ajouter un paquet depuis une branche précise d'un dépôt GitHub (forme courte) :

```
yarn add lodash-es@lodash/lodash#es
```

Ajouter un paquet local (archive tarball gzippée) :

```
yarn add local-package-name@file:../path/to/local-package-name-v0.1.2.tgz
```
