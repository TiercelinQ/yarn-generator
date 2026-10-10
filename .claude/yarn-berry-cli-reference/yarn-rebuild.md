# yarn rebuild

Reconstruit les paquets natifs du projet.

Source : aide `yarn rebuild --help` (Yarn 4.18.1), https://yarnpkg.com/cli/rebuild

## Usage

```
yarn rebuild ...
```

## Options

Aucune.

## Détails

La commande fait oublier à Yarn les compilations précédentes des paquets indiqués et les relance.

Yarn oublie la compilation, mais les artefacts précédents ne sont pas effacés du système de fichiers et peuvent influencer les builds suivants (en bien ou en mal). Pour l'éviter, supprimer le dossier `.yarn/unplugged` ou tout autre emplacement où des paquets ont pu être stockés.

Par défaut, tous les paquets sont reconstruits. La liste peut être filtrée en indiquant les noms des paquets à effacer de la mémoire.

## Exemples

Reconstruire tous les paquets :

```
yarn rebuild
```

Reconstruire uniquement fsevents :

```
yarn rebuild fsevents
```
