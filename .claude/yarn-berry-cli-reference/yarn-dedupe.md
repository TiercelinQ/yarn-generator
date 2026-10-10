# yarn dedupe

Déduplique les dépendances aux plages qui se chevauchent.

Source : aide `yarn dedupe --help` (Yarn 4.18.1), https://yarnpkg.com/cli/dedupe

## Usage

```
yarn dedupe ...
```

## Options

| Option | Description |
| --- | --- |
| `-s,--strategy <valeur>` | Stratégie de déduplication |
| `-c,--check` | Quitte avec le code 1 si des doublons sont trouvés, sans écrire l'arbre de dépendances |
| `--json` | Sortie au format flux NDJSON |
| `--mode <mode>` | Change les artefacts générés par l'installation |

## Détails

Un doublon est un descripteur à plage chevauchante résolu et verrouillé sur des locators différents. C'est une conséquence normale des installs déterministes de Yarn, mais les doublons peuvent s'accumuler et alourdir le projet.

La commande déduplique les dépendances du projet courant selon une stratégie (une seule est implémentée) :

- `highest` : réutilise, quand c'est possible, les locators aux versions les plus hautes. Les dépendances peuvent seulement monter de version, jamais descendre. Une seule passe suffit toujours pour dédupliquer tout l'arbre.

**Note :** même si elle ne produit jamais d'arbre invalide, la commande modifie l'arbre de dépendances et peut poser problème quand des paquets ne respectent pas strictement semver. Relire les changements à la main est recommandé.

Avec `-c,--check`, la commande signale uniquement les doublons, sans écrire l'arbre modifié. Si des changements sont trouvés, le code de sortie est non nul : utilisable en CI.

Avec `--mode=<mode>`, Yarn change les artefacts générés. Modes supportés :

- `skip-build` : n'exécute aucun script de build. Différent de `enableScripts: false`, qui désactive les scripts et modifie donc le contenu des artefacts sur disque.
- `update-lockfile` : saute l'étape de link et ne récupère que les paquets absents du lockfile (ou sans checksum). Typiquement utilisé par Renovate ou Dependabot.

La commande accepte des motifs glob en arguments (si ce sont des Idents valides supportés par [micromatch](https://github.com/micromatch/micromatch)). Échapper les motifs pour empêcher le shell de les expanser.

### Explication détaillée

Yarn ne déduplique pas par défaut, sinon les installs ne seraient plus déterministes et le lockfile serait inutile. Il essaie en revanche de ne pas dupliquer au départ.

Exemple : si `foo@^2.3.4` (dépendance d'une dépendance) est déjà résolu en `foo@2.3.4`, `yarn add foo@*` réutilise `foo@2.3.4`, même si la dernière version de `foo` est `foo@2.10.14`. Cela évite une duplication inutile.

La duplication survient quand Yarn ne peut pas déverrouiller des dépendances déjà verrouillées dans le lockfile.

Exemple : si `foo@^2.3.4` est déjà résolu en `foo@2.3.4`, `yarn add foo@2.10.14` installe `foo@2.10.14` car la résolution existante ne satisfait pas la plage `2.10.14`. Le lockfile contient alors deux résolutions pour deux descripteurs aux plages chevauchantes, alors qu'il pourrait être simplifié pour que les deux descripteurs résolvent en `foo@2.10.14`.

## Exemples

Dédupliquer tous les paquets :

```
yarn dedupe
```

Dédupliquer avec une stratégie précise :

```
yarn dedupe --strategy highest
```

Dédupliquer un paquet précis :

```
yarn dedupe lodash
```

Dédupliquer tous les paquets du scope `@babel/*` :

```
yarn dedupe '@babel/*'
```

Chercher des doublons (utilisable comme étape de CI) :

```
yarn dedupe --check
```
