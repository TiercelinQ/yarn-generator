# yarn patch et yarn patch-commit

Modification locale d'un paquet via le protocole `patch:`. Deux commandes : `yarn patch` puis `yarn patch-commit`.

Sources : aides `--help` (Yarn 4.18.1), https://yarnpkg.com/cli/patch, https://yarnpkg.com/cli/patch-commit

---

## yarn patch

Prépare un paquet pour un patch.

### Usage

```
yarn patch <package>
```

### Options

| Option | Description |
| --- | --- |
| `-u,--update` | Réapplique les patches locaux qui s'appliquent déjà à ce paquet |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande extrait un paquet dans un dossier temporaire destiné à être modifié librement.

Une fois les changements terminés, lancer `yarn patch-commit -s path` (`path` étant le dossier temporaire reçu) pour générer un patchfile et l'enregistrer dans le manifeste racine via le protocole `patch:`. Détails : `yarn patch-commit -h`.

Appeler la commande alors qu'un patch existe déjà ne l'importe pas par défaut (le comportement par défaut réinitialise les patches existants). Avec `-u,--update`, tout patch courant est importé.

---

## yarn patch-commit

Génère un patch à partir d'un répertoire.

### Usage

```
yarn patch-commit <patchFolder>
```

### Options

| Option | Description |
| --- | --- |
| `-s,--save` | Ajoute le patch aux entrées de résolution |

### Détails

Par défaut, la commande affiche sur stdout un patchfile basé sur la différence entre le dossier fourni et la version d'origine du paquet. Ce fichier est utilisable avec le protocole `patch:`.

Avec `-s,--save`, le patchfile n'est plus affiché sur stdout : il est stocké dans un fichier local (par défaut dans `.yarn/patches`, réglable via le paramètre `patchFolder`). Une entrée `resolutions` est aussi ajoutée au manifeste racine, référençant le paquet patché via le protocole `patch:`.

Seuls les dossiers générés par `yarn patch` sont acceptés en entrée de `yarn patch-commit`.
