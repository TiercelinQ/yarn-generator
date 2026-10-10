# yarn version

Gestion des versions de workspaces. Trois commandes : `yarn version`, `yarn version apply`, `yarn version check`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/version, https://yarnpkg.com/cli/version/apply, https://yarnpkg.com/cli/version/check

Workflow de release : https://yarnpkg.com/features/release-workflow#deferred-versioning

---

## yarn version

Change les versions des workspaces.

### Usage

```
yarn version <strategy>
```

### Options

| Option | Description |
| --- | --- |
| `-d,--deferred` | Enregistre uniquement la stratégie de release |
| `-i,--immediate` | Applique le changement de version immédiatement |
| `--all` | Change la version de tous les workspaces |
| `-R,--recursive` | Change aussi la version des workspaces dépendants |
| `--exact` | Lors de la mise à jour des dépendances des workspaces parents, utilise les versions exactes des workspaces modifiés, sans plage |
| `--prerelease` | Indique un motif de prerelease à utiliser avec les versions prerelease |
| `--dry-run` | Affiche version(s)/enregistrement(s) sans changer les versions ni enregistrer de release différée |
| `--force` | Contourne la vérification d'un passage à une version inférieure à la version courante/différée |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande change la version du workspace courant selon la stratégie donnée :

- Un semver valide est utilisé comme nouvelle version (les build metadata sont retirées).
- Les stratégies `major`, `minor` et `patch` passent respectivement à la prochaine version semver majeure, mineure ou patch.
- La stratégie `prepatch` n'incrémente l'identifiant de prerelease que si la version courante est déjà une prerelease d'un niveau patch ou supérieur. Sinon, la nouvelle version est calculée en ajoutant des identifiants de prerelease à la prochaine version patch.
- Les stratégies `preminor` et `premajor` fonctionnent comme `prepatch`, pour les versions mineures et majeures.
- La stratégie `prerelease` n'incrémente l'identifiant de prerelease que si la version courante est déjà une prerelease. Sinon, elle équivaut à `prepatch`.
- La stratégie `decline` ne change aucune version. Elle sert surtout au versioning différé.

Par défaut, le changement ne s'applique qu'au workspace courant. Avec `--all`, il s'applique à tous les workspaces du projet. Avec `--recursive`, il s'applique au workspace courant et à tous les workspaces qui en dépendent (directement ou transitivement).

Tout workspace qui dépend des workspaces modifiés via des dépendances `workspace:` est mis à jour pour pointer vers la nouvelle version si possible, et les opérateurs de plage sont conservés. Avec `--exact`, la version exacte de chaque workspace modifié est utilisée, sans opérateur de plage.

Avec `--dry-run`, la commande affiche les nouvelles versions sans les appliquer.

Passer à une version inférieure à la version courante lève une erreur sauf avec `--force`. Avec le versioning différé, `--force` est nécessaire deux fois : à l'enregistrement du changement différé, puis à son application.

#### Identifiants de prerelease

Par défaut, incrémenter un identifiant de prerelease existant incrémente le dernier composant numérique, et `-0` est utilisé pour ajouter un identifiant de prerelease à une version qui n'en est pas une.

`--prerelease` définit un motif de prerelease. Dans le motif, `%n` désigne un composant numérique incrémenté. Lors de l'incrément d'un identifiant existant, il est comparé au motif : si le motif correspond, tous les composants `%n` sont incrémentés. Si le motif ne correspond pas, ou si un identifiant est ajouté à une version sans prerelease, les composants `%n` sont mis à 1.

Si `--prerelease` est donné sans valeur, le motif par défaut `rc.%n` est utilisé.

#### Versioning immédiat ou différé

Par défaut, le changement de version est appliqué immédiatement. Avec le flag `--deferred` ou l'option de configuration `preferDeferredVersions`, le versioning différé est utilisé : le changement est seulement enregistré et pourra être appliqué plus tard avec `yarn version apply`. Le flag `--immediate` force le mode immédiat même si `preferDeferredVersions` est activé.

Un changement immédiat peut s'appliquer à des workspaces qui ont des enregistrements différés. Passer à une version inférieure à celle du changement différé enregistré lève une erreur sauf avec `--force`. Après le changement immédiat, les enregistrements différés des workspaces modifiés sont consommés.

### Exemples

Passer immédiatement à la prochaine version majeure :

```
yarn version major
```

Préparer le passage à la prochaine version majeure :

```
yarn version major --deferred
```

Passer à la version beta de la prochaine version majeure :

```
yarn version premajor --prerelease=beta.%n
```

---

## yarn version apply

Applique les enregistrements différés aux workspaces.

### Usage

```
yarn version apply
```

### Options

| Option | Description |
| --- | --- |
| `--all` | Change la version de tous les workspaces |
| `-R,--recursive` | Change aussi la version des workspaces dépendants |
| `--exact` | Lors de la mise à jour des dépendances des workspaces parents, utilise les versions exactes des workspaces modifiés, sans plage |
| `--prerelease` | Indique un motif de prerelease à utiliser avec les versions prerelease |
| `--dry-run` | Affiche version(s)/enregistrement(s) sans changer les versions ni enregistrer de release différée |
| `--force` | Contourne la vérification d'un passage à une version inférieure à la version courante/différée |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande applique aux workspaces les changements de version différés. Les enregistrements appliqués sont retirés du projet.

Détail des options : voir `yarn version`.

### Exemples

Appliquer les enregistrements différés du workspace courant :

```
yarn version apply
```

Appliquer les enregistrements différés de tous les workspaces du workspace local :

```
yarn version apply --all
```

---

## yarn version check

Vérifie que tous les workspaces modifiés ont des enregistrements de changement de version différés.

### Usage

```
yarn version check
```

### Options

| Option | Description |
| --- | --- |
| `-i,--interactive` | Ouvre une interface interactive pour définir les changements de version |

### Détails

**Avertissement :** cette commande requiert actuellement Git.

La commande vérifie que tous les workspaces dont des fichiers ont changé ont des enregistrements de changement de version différés. Les fichiers modifiés sont détectés en comparant le HEAD courant aux références Git indiquées par `changesetBaseRefs` (par défaut `master`, `origin/master`, `upstream/master`, `main`, `origin/main`, `upstream/main`).

Pour chaque workspace dont la version est changée (l'enregistrement n'est pas `decline`), la vérification porte aussi récursivement sur les workspaces dépendants. Exemple : si le workspace `foo` change de version et que `bar` dépend de `foo`, `bar` doit aussi recevoir une décision sur son éventuel changement de version. Cette vérification ne traverse pas les workspaces dont le changement est décliné.

### Exemples

Vérifier si les paquets modifiés nécessitent un changement de version :

```
yarn version check
```
