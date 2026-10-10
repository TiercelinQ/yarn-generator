# yarn npm login, logout, whoami

Authentification auprès du registre npm. Trois commandes : `yarn npm login`, `yarn npm logout`, `yarn npm whoami`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/npm/login, https://yarnpkg.com/cli/npm/logout, https://yarnpkg.com/cli/npm/whoami

---

## yarn npm login

Enregistre de nouvelles informations de connexion au registre npm.

### Usage

```
yarn npm login
```

### Options

| Option | Description |
| --- | --- |
| `-s,--scope <valeur>` | Se connecte au registre configuré pour un scope donné |
| `--publish` | Se connecte au registre de publication |
| `--always-auth` | Définit la configuration `npmAlwaysAuth` |
| `--web-login` | Active la connexion web |

### Détails

La commande demande le nom d'utilisateur, le mot de passe et le mot de passe à usage unique 2FA (quand il s'applique). Elle modifie ensuite la configuration locale (dans le dossier home, jamais dans le projet) pour référencer les nouveaux tokens générés.

`-s,--scope` : l'authentification se fait auprès du registre configuré pour le scope (voir `npmScopes`).

`--publish` : l'authentification se fait auprès du registre utilisé à la publication du paquet (voir `publishConfig.registry` et `npmPublishRegistry`).

### Exemples

Se connecter au registre par défaut :

```
yarn npm login
```

Se connecter au registre lié au scope @my-scope :

```
yarn npm login --scope my-scope
```

Se connecter au registre de publication du paquet courant :

```
yarn npm login --publish
```

---

## yarn npm logout

Se déconnecte du registre npm.

### Usage

```
yarn npm logout
```

### Options

| Option | Description |
| --- | --- |
| `-s,--scope <valeur>` | Se déconnecte du registre configuré pour un scope donné |
| `--publish` | Se déconnecte du registre de publication |
| `-A,--all` | Se déconnecte de tous les registres |

### Détails

La commande déconnecte en modifiant la configuration locale (dans le dossier home, jamais dans le projet) pour supprimer tous les identifiants liés à un registre.

`-s,--scope` : la suppression se fait pour le registre configuré pour le scope (voir `npmScopes`).

`--publish` : la suppression se fait pour le registre utilisé à la publication (voir `publishConfig.registry` et `npmPublishRegistry`).

`-A,--all` : la suppression se fait pour tous les registres et scopes.

### Exemples

Se déconnecter du registre par défaut :

```
yarn npm logout
```

Se déconnecter du scope @my-scope :

```
yarn npm logout --scope my-scope
```

Se déconnecter du registre de publication du paquet courant :

```
yarn npm logout --publish
```

Se déconnecter de tous les registres :

```
yarn npm logout --all
```

---

## yarn npm whoami

Affiche le nom de l'utilisateur authentifié.

### Usage

```
yarn npm whoami
```

### Options

| Option | Description |
| --- | --- |
| `-s,--scope <valeur>` | Affiche le nom d'utilisateur pour le registre configuré pour un scope donné |
| `--publish` | Affiche le nom d'utilisateur pour le registre de publication |

### Détails

La commande affiche sur la sortie standard le nom d'utilisateur associé aux réglages d'authentification courants.

Avec `-s,--scope`, le nom affiché correspond aux réglages d'authentification du registre associé au scope (ces réglages peuvent être surchargés via la map `npmRegistries`, et le registre du scope se configure via la map `npmScopes`).

Avec `--publish`, le registre sélectionné est par défaut celui utilisé pour publier (`publishConfig.registry` ou `npmPublishRegistry` si disponibles, sinon `npmRegistryServer`).

### Exemples

Afficher le nom d'utilisateur pour le registre par défaut :

```
yarn npm whoami
```

Afficher le nom d'utilisateur pour le registre d'un scope :

```
yarn npm whoami --scope company
```
