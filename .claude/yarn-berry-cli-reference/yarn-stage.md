# yarn stage

Ajoute tous les fichiers Yarn au VCS.

Source : aide `yarn stage --help` (Yarn 4.18.1), https://yarnpkg.com/cli/stage

## Usage

```
yarn stage
```

## Options

| Option | Description |
| --- | --- |
| `-c,--commit` | Commite les fichiers ajoutés à l'index |
| `-r,--reset` | Retire tous les fichiers de l'index |
| `-n,--dry-run` | Affiche le message de commit et la liste des fichiers modifiés sans ajouter à l'index ni commiter |

## Détails

La commande ajoute à l'index les fichiers appartenant à Yarn (typiquement tout `package.json` et `.yarnrc.yml` modifié, mais aussi les fichiers générés par le linker, les données de cache, etc.). Elle tient compte de la liste d'ignore : les fichiers de cache ne sont pas ajoutés si le cache est ignoré dans un `.gitignore` (avec Git).

`--reset` retire ces fichiers de l'index (les changements restent, mais ne seront pas commités tant qu'ils ne sont pas remis à l'index).

L'index n'existe pas dans Mercurial : Yarn crée toujours un nouveau commit avec cette commande sur un dépôt Mercurial. Le même comportement s'obtient avec Git via le flag `--commit`, qui crée directement un commit.

## Exemples

Ajouter à l'index tous les fichiers de projet modifiés :

```
yarn stage
```

Créer un commit contenant tous les fichiers de projet modifiés :

```
yarn stage --commit
```
