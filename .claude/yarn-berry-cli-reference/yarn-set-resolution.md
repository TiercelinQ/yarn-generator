# yarn set resolution

Force la résolution d'un paquet.

Source : aide `yarn set resolution --help` (Yarn 4.18.1), https://yarnpkg.com/cli/set/resolution

## Usage

```
yarn set resolution <descriptor> <resolution>
```

## Options

Aucune.

## Détails

La commande met à jour la table de résolutions pour que `descriptor` soit résolu par `resolution`.

Par défaut, la commande n'affecte que la table de résolutions courante : ce forçage manuel disparaît si le lockfile est supprimé ou si le paquet disparaît de la table. Pour rendre la résolution forcée permanente, modifier le champ `resolutions` du manifeste racine.

Aucune validation n'est faite pour vérifier que `resolution` est une entrée de résolution valide pour `descriptor`.

## Exemples

Forcer toutes les instances de `lodash@npm:^1.2.3` à se résoudre en 1.5.0 :

```
yarn set resolution lodash@npm:^1.2.3 npm:1.5.0
```
