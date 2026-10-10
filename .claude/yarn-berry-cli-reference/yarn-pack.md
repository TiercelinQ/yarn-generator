# yarn pack

Génère une archive tarball du workspace actif.

Source : aide `yarn pack --help` (Yarn 4.18.1), https://yarnpkg.com/cli/pack

## Usage

```
yarn pack
```

## Options

| Option | Description |
| --- | --- |
| `--install-if-needed` | Lance un `yarn install` préalable si le paquet contient des scripts de build |
| `-n,--dry-run` | Affiche les chemins de fichiers sans générer l'archive |
| `--json` | Sortie au format flux NDJSON |
| `-o,--out <valeur>` | Crée l'archive au chemin indiqué |

## Détails

La commande transforme le workspace actif en archive compressée adaptée à la publication. L'archive est stockée par défaut à la racine du workspace (`package.tgz`).

Avec `-o,--out`, l'archive est créée au chemin indiqué. Les variables `%s` et `%v` peuvent être utilisées dans le chemin : elles sont remplacées respectivement par le nom et la version du paquet.

## Exemples

Créer une archive depuis le workspace actif :

```
yarn pack
```

Lister les fichiers qui feraient partie de l'archive du workspace :

```
yarn pack --dry-run
```

Nommer l'archive et l'écrire dans un dossier dédié :

```
yarn pack --out /artifacts/%s-%v.tgz
```
