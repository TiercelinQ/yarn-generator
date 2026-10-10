# yarn config

Lecture et modification de la configuration. Quatre commandes : `yarn config`, `yarn config get`, `yarn config set`, `yarn config unset`.

Sources : https://yarnpkg.com/cli/config, https://yarnpkg.com/cli/config/get, https://yarnpkg.com/cli/config/set, https://yarnpkg.com/cli/config/unset

---

## yarn config

Affiche la configuration courante.

### Usage

```
yarn config ...
```

### Options

| Option | Description |
| --- | --- |
| `--no-defaults` | Omet les valeurs par défaut de l'affichage |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande affiche les paramètres de configuration actifs.

### Exemples

Afficher les paramètres de configuration actifs :

```
yarn config
```

---

## yarn config get

Lit un paramètre de configuration.

### Usage

```
yarn config get <name>
```

### Options

| Option | Description |
| --- | --- |
| `--why` | Affiche l'explication de la valeur d'un paramètre |
| `--json` | Sortie au format flux NDJSON |
| `--no-redacted` | Ne masque pas les secrets (tokens, par exemple) dans la sortie |

### Détails

La commande affiche un paramètre de configuration.

Les secrets (tokens, par exemple) sont masqués par défaut. Pour obtenir la valeur brute, utiliser `--no-redacted`.

### Exemples

Afficher un paramètre simple :

```
yarn config get yarnPath
```

Afficher un paramètre complexe :

```
yarn config get packageExtensions
```

Afficher un champ imbriqué :

```
yarn config get 'npmScopes["my-company"].npmRegistryServer'
```

Afficher un token :

```
yarn config get npmAuthToken --no-redacted
```

Afficher un paramètre en JSON :

```
yarn config get packageExtensions --json
```

---

## yarn config set

Modifie un paramètre de configuration.

### Usage

```
yarn config set <name> <value>
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Définit des paramètres complexes à partir de valeurs JSON |
| `-H,--home` | Met à jour la configuration utilisateur (home) au lieu de celle du projet |

### Détails

La commande définit un paramètre de configuration.

Sans `--json`, seuls les paramètres simples (chaîne, nombre, booléen) peuvent être définis.

Avec `--json`, les paramètres simples et complexes (tableaux, objets) peuvent être définis.

### Exemples

Définir un paramètre simple (chaîne, nombre ou booléen) :

```
yarn config set initScope myScope
```

Définir un paramètre simple avec `--json` :

```
yarn config set initScope --json '"myScope"'
```

Définir un paramètre complexe (tableau) avec `--json` :

```
yarn config set unsafeHttpWhitelist --json '["*.example.com", "example.com"]'
```

Définir un paramètre complexe (objet) avec `--json` :

```
yarn config set packageExtensions --json '{ "@babel/parser@*": { "dependencies": { "@babel/types": "*" } } }'
```

Définir un paramètre imbriqué :

```
yarn config set npmScopes.company.npmRegistryServer https://npm.example.com
```

Définir un paramètre imbriqué avec un accès indexé pour les clés non simples :

```
yarn config set 'npmRegistries["//npm.example.com"].npmAuthToken' ffffffff-ffff-ffff-ffff-ffffffffffff
```

---

## yarn config unset

Supprime un paramètre de configuration.

### Usage

```
yarn config unset <name>
```

### Options

| Option | Description |
| --- | --- |
| `-H,--home` | Met à jour la configuration utilisateur (home) au lieu de celle du projet |

### Détails

La commande supprime un paramètre de configuration.

### Exemples

Supprimer un paramètre simple :

```
yarn config unset initScope
```

Supprimer un paramètre complexe :

```
yarn config unset packageExtensions
```

Supprimer un paramètre imbriqué :

```
yarn config unset npmScopes.company.npmRegistryServer
```
