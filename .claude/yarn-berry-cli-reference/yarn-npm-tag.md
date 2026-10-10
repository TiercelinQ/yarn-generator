# yarn npm tag

Gestion des dist-tags d'un paquet. Trois commandes : `yarn npm tag add`, `yarn npm tag list`, `yarn npm tag remove`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/npm/tag/add, https://yarnpkg.com/cli/npm/tag/list, https://yarnpkg.com/cli/npm/tag/remove

---

## yarn npm tag add

Ajoute un tag pour une version précise d'un paquet.

### Usage

```
yarn npm tag add <package> <tag>
```

### Options

Aucune.

### Détails

La commande ajoute un tag sur le registre npm pour une version précise d'un paquet. Si le tag existe déjà, il est écrasé.

### Exemples

Ajouter un tag `beta` pour la version `2.3.4-beta.4` du paquet `my-pkg` :

```
yarn npm tag add my-pkg@2.3.4-beta.4 beta
```

---

## yarn npm tag list

Liste tous les dist-tags d'un paquet.

### Usage

```
yarn npm tag list [package]
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande liste tous les tags d'un paquet depuis le registre npm.

Si le paquet n'est pas indiqué, Yarn utilise le workspace courant.

### Exemples

Lister tous les tags du paquet `my-pkg` :

```
yarn npm tag list my-pkg
```

---

## yarn npm tag remove

Retire un tag d'un paquet.

### Usage

```
yarn npm tag remove <package> <tag>
```

### Options

Aucune.

### Détails

La commande retire un tag d'un paquet sur le registre npm.

### Exemples

Retirer le tag `beta` du paquet `my-pkg` :

```
yarn npm tag remove my-pkg beta
```
