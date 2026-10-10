# yarn plugin

Gestion des plugins Yarn. Six commandes : `check`, `import`, `import from sources`, `list`, `remove`, `runtime`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/plugin/check, https://yarnpkg.com/cli/plugin/import, https://yarnpkg.com/cli/plugin/import/from/sources, https://yarnpkg.com/cli/plugin/list, https://yarnpkg.com/cli/plugin/remove, https://yarnpkg.com/cli/plugin/runtime

---

## yarn plugin check

Trouve les plugins tiers qui diffèrent de leur propre spec.

### Usage

```
yarn plugin check
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

Vérifie uniquement les plugins référencés par https.

Si la commande détecte des différences de plugin dans un environnement CI, elle lève une erreur.

### Exemples

Trouver tous les plugins tiers qui diffèrent de leur spec :

```
yarn plugin check
```

---

## yarn plugin import

Télécharge un plugin.

### Usage

```
yarn plugin import <name>
```

### Options

| Option | Description |
| --- | --- |
| `--checksum` | Indique s'il faut vérifier que le plugin n'est pas modifié |

### Détails

La commande télécharge le plugin depuis son emplacement distant et met à jour la configuration pour le référencer lors des appels CLI suivants.

Trois types de références sont acceptés :

- Un plugin stocké dans le dépôt Yarn peut être référencé par son nom.
- Un plugin tiers peut être référencé directement par son URL publique.
- Un plugin local peut être référencé par son chemin sur disque.

Avec `--no-checksum`, Yarn ne vérifie plus si le plugin est modifié.

Les plugins ne peuvent pas être téléchargés depuis le registre npm et ne peuvent pas avoir de dépendances (ils doivent être regroupés dans un seul fichier, par exemple avec le paquet `@yarnpkg/builder`).

### Exemples

Télécharger et activer le plugin `@yarnpkg/plugin-exec` :

```
yarn plugin import @yarnpkg/plugin-exec
```

Idem (forme courte) :

```
yarn plugin import exec
```

Télécharger et activer un plugin communautaire :

```
yarn plugin import https://example.org/path/to/plugin.js
```

Activer un plugin local :

```
yarn plugin import ./path/to/plugin.js
```

---

## yarn plugin import from sources

Compile un plugin depuis les sources.

### Usage

```
yarn plugin import from sources <name>
```

### Options

| Option | Description |
| --- | --- |
| `--path <valeur>` | Chemin où cloner le dépôt |
| `--repository <valeur>` | Dépôt à cloner |
| `--branch <valeur>` | Branche du dépôt à cloner |
| `--no-minify` | Compile un plugin de développement (debug), non minifié et non mangled |
| `-f,--force` | Clone toujours le dépôt au lieu d'essayer de récupérer les derniers commits |

### Détails

La commande clone le dépôt Yarn dans un dossier temporaire, compile le plugin contrib indiqué et met à jour la configuration pour le référencer lors des appels CLI suivants.

Les plugins peuvent être référencés par leur nom court s'ils viennent du dépôt officiel de Yarn.

### Exemples

Compiler et activer le plugin `@yarnpkg/plugin-exec` :

```
yarn plugin import from sources @yarnpkg/plugin-exec
```

Idem (forme courte) :

```
yarn plugin import from sources exec
```

---

## yarn plugin list

Liste les plugins officiels disponibles.

### Usage

```
yarn plugin list
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande affiche les plugins disponibles directement depuis le dépôt Yarn. Seuls ces plugins peuvent être référencés par leur nom dans `yarn plugin import`.

### Exemples

Lister les plugins officiels :

```
yarn plugin list
```

---

## yarn plugin remove

Supprime un plugin.

### Usage

```
yarn plugin remove <name>
```

### Options

Aucune.

### Détails

La commande supprime le plugin indiqué du dossier `.yarn/plugins` et le retire de la configuration.

**Note :** les plugins doivent être référencés par leur propriété `name`, que `yarn plugin runtime` permet d'obtenir. Les formes courtes ne sont pas autorisées.

### Exemples

Supprimer un plugin importé depuis le dépôt Yarn :

```
yarn plugin remove @yarnpkg/plugin-typescript
```

Supprimer un plugin importé depuis un fichier local :

```
yarn plugin remove my-local-plugin
```

---

## yarn plugin runtime

Liste les plugins actifs.

### Usage

```
yarn plugin runtime
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande affiche les plugins actuellement actifs, intégrés et externes.

### Exemples

Lister les plugins actuellement actifs :

```
yarn plugin runtime
```
