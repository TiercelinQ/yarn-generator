# yarn npm stage

Gestion des versions de paquets en attente d'approbation (staged publishing). Trois commandes : `yarn npm stage list`, `yarn npm stage approve`, `yarn npm stage reject`.

Mise en attente : `yarn npm publish --staged` (voir [yarn-npm-publish.md](yarn-npm-publish.md)).

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/npm/stage/list, https://yarnpkg.com/cli/npm/stage/approve, https://yarnpkg.com/cli/npm/stage/reject

---

## yarn npm stage list

Liste toutes les versions de paquets en attente.

### Usage

```
yarn npm stage list [package]
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande liste toutes les versions de paquets en attente d'approbation sur le registre npm.

Si un nom de paquet est fourni, seules les versions en attente de ce paquet sont listées.

### Exemples

Lister tous les paquets en attente :

```
yarn npm stage list
```

Lister les versions en attente d'un paquet précis :

```
yarn npm stage list my-pkg
```

---

## yarn npm stage approve

Approuve une version de paquet en attente de publication.

### Usage

```
yarn npm stage approve <stageId>
```

### Options

| Option | Description |
| --- | --- |
| `--otp <valeur>` | Token OTP à utiliser avec la commande |

### Détails

La commande approuve une version de paquet en attente et la publie sur le registre npm. L'opération demande la 2FA et sollicite un token OTP s'il n'est pas fourni via `--otp`.

### Exemples

Approuver un paquet en attente :

```
yarn npm stage approve 1de6f3db-2ed9-4d72-b3dd-8f0e2b474a2f
```

---

## yarn npm stage reject

Rejette une version de paquet en attente.

### Usage

```
yarn npm stage reject <stageId>
```

### Options

| Option | Description |
| --- | --- |
| `--otp <valeur>` | Token OTP à utiliser avec la commande |

### Détails

La commande rejette une version de paquet en attente et la retire définitivement de la zone de staging du registre. L'opération demande la 2FA et sollicite un token OTP s'il n'est pas fourni via `--otp`.

### Exemples

Rejeter un paquet en attente :

```
yarn npm stage reject 1de6f3db-2ed9-4d72-b3dd-8f0e2b474a2f
```
