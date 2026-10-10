# yarn builder

Commandes du paquet `@yarnpkg/builder` (hors cœur de Yarn). Trois commandes : `yarn builder build bundle`, `yarn builder build plugin`, `yarn builder new plugin`.

Prérequis commun : installer `@yarnpkg/builder` en local (`yarn add`, puis lancer avec `yarn run`) ou l'exécuter temporairement avec `yarn dlx`.

Sources : https://yarnpkg.com/cli/builder/build/bundle, https://yarnpkg.com/cli/builder/build/plugin, https://yarnpkg.com/cli/builder/new/plugin

Documentation du processus de build : README de `@yarnpkg/builder` dans le dépôt berry sur GitHub (https://github.com/yarnpkg/berry/blob/HEAD/packages/yarnpkg-builder/README.md).

---

## yarn builder build bundle

Compile le bundle local, c'est-à-dire le binaire Yarn installé dans les projets.

### Usage

```
yarn builder build bundle
```

### Options

| Option | Description |
| --- | --- |
| `--profile` | Inclut uniquement les plugins du profil indiqué |
| `--plugin` | Ajoute des plugins en plus de ceux du profil |
| `--no-git-hash` | Exclut le hash git du commit courant de la version du bundle |
| `--no-minify` | Compile sans optimisations (minification, mangling, tree-shaking), pour le développement |
| `--source-map` | Inclut une source map dans le bundle |
| `--metafile` | Génère un metafile à côté du bundle |

### Exemples

Compiler le bundle local :

```
yarn builder build bundle
```

Compiler le bundle local de développement :

```
yarn builder build bundle --no-minify
```

---

## yarn builder build plugin

Compile un plugin local.

### Usage

```
yarn builder build plugin
```

### Options

| Option | Description |
| --- | --- |
| `--no-minify` | Compile un plugin de développement sans optimisations (minification, mangling, tree-shaking) |
| `--source-map` | Inclut une source map dans le bundle |
| `--metafile` | Génère un metafile à côté du bundle |

### Exemples

Compiler un plugin local :

```
yarn builder build plugin
```

Compiler un plugin local de développement, sans minification :

```
yarn builder build plugin --no-minify
```

---

## yarn builder new plugin

Génère le gabarit d'un nouveau plugin.

### Usage

```
yarn builder new plugin <target>
```

### Options

Aucune.

### Exemples

Créer un nouveau plugin nommé `yarn-plugin-hello-world` :

```
yarn builder new plugin yarn-plugin-hello-world
```
