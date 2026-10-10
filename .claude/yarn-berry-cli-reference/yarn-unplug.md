# yarn unplug

Force le dépaquetage d'une liste de paquets.

Source : aide `yarn unplug --help` (Yarn 4.18.1), https://yarnpkg.com/cli/unplug

## Usage

```
yarn unplug ...
```

## Options

| Option | Description |
| --- | --- |
| `-A,--all` | Dépaquette les dépendances directes de tout le projet |
| `-R,--recursive` | Dépaquette les dépendances directes et transitives |
| `--json` | Sortie au format flux NDJSON |

## Détails

La commande ajoute les sélecteurs correspondant aux motifs indiqués à la liste des paquets à dépaqueter à l'installation.

Un paquet dépaqueté n'est plus référencé directement via son archive : il est extrait à l'installation dans le dossier configuré par `pnpUnpluggedFolder`. Cette pratique est généralement déconseillée car elle complique le stockage des paquets dans le dépôt. C'est cependant une bonne approche pour déboguer rapidement et sûrement certains paquets, et elle peut même être requise selon le contexte (par exemple quand le paquet contient des shellscripts).

La commande définit un flag persistant dans le `package.json` racine, champ `dependenciesMeta`. Pour annuler ses effets, il faut annuler les changements du manifeste et lancer `yarn install`.

Par défaut, seules les dépendances directes du workspace courant sont concernées. Avec `-A,--all`, les dépendances directes de tout le projet le sont. Avec `-R,--recursive`, les dépendances transitives le sont aussi.

La commande accepte des motifs glob dans le scope et le nom (pas dans la plage). Échapper les motifs pour empêcher le shell de les expanser.

## Exemples

Dépaqueter la dépendance lodash du workspace actif :

```
yarn unplug lodash
```

Dépaqueter toutes les instances de lodash référencées par un workspace :

```
yarn unplug lodash -A
```

Dépaqueter toutes les instances de lodash référencées par le workspace actif et ses dépendances :

```
yarn unplug lodash -R
```

Dépaqueter toutes les instances de lodash, partout :

```
yarn unplug lodash -AR
```

Dépaqueter une version précise de lodash :

```
yarn unplug lodash@1.2.3
```

Dépaqueter tous les paquets du scope `@babel` :

```
yarn unplug '@babel/*'
```

Dépaqueter tous les paquets (pour tests uniquement, déconseillé) :

```
yarn unplug -R '*'
```
