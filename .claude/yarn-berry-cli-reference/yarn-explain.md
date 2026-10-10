# yarn explain

Explication des codes d'erreur et des exigences peer. Deux commandes : `yarn explain` et `yarn explain peer-requirements`.

Sources : https://yarnpkg.com/cli/explain, https://yarnpkg.com/cli/explain/peer-requirements (Yarn 4.18.1)

---

## yarn explain

Explique un code d'erreur.

### Usage

```
yarn explain [code]
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

Avec l'argument `code`, la commande affiche le nom et le détail du code.

Sans argument, elle liste tous les codes d'erreur avec leur nom.

### Exemples

Expliquer un code d'erreur :

```
yarn explain YN0006
```

Lister tous les codes d'erreur :

```
yarn explain
```

---

## yarn explain peer-requirements

Explique un ensemble d'exigences peer.

### Usage

```
yarn explain peer-requirements [hash]
```

### Options

Aucune.

### Détails

Une exigence peer regroupe toutes les demandes peer qu'un sujet doit satisfaire quand il fournit un paquet demandé à des demandeurs.

Avec l'argument `hash`, la commande affiche une explication détaillée de l'exigence peer correspondante et indique si elle est satisfaite.

Sans argument, elle liste toutes les exigences peer avec le hash utilisable pour obtenir le détail d'une exigence.

**Note :** un hash est un code de sept caractères composé de la lettre `p` suivie de six caractères. Il se trouve dans les avertissements de peer dependencies ou dans la liste de toutes les exigences peer (`yarn explain peer-requirements`).

### Exemples

Expliquer l'exigence peer correspondant à un hash :

```
yarn explain peer-requirements p1a4ed
```

Lister toutes les exigences peer :

```
yarn explain peer-requirements
```
