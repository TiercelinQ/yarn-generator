# yarn sdks

Génère les SDK d'éditeur et les réglages d'éditeur.

Commande du paquet `@yarnpkg/sdks` (hors cœur de Yarn). Prérequis : installer le paquet en local et lancer avec `yarn run`, ou l'exécuter temporairement avec `yarn dlx`.

Source : https://yarnpkg.com/cli/sdks/default

Documentation des SDK d'éditeur : https://yarnpkg.com/getting-started/editor-sdks

## Usage

```
yarn sdks ...
```

## Options

| Option | Description |
| --- | --- |
| `--cwd <valeur>` | Répertoire dans lequel lancer la commande |
| `-v,--verbose` | Affiche toutes les dépendances ignorées |

## Détails

- La commande crée un dossier `.yarn/sdks` contenant les SDK de base.
- Sans argument, elle échoue sur les projets non pnpifiés. Sur les projets pnpifiés, elle met à jour tous les SDK et réglages d'éditeur existants.
- L'argument `base` génère uniquement les SDK de base. Adapté aux éditeurs sans support intégré, où les réglages sont gérés à la main.
- Nommer une intégration installe les SDK de base et les réglages de cette intégration. Par exemple, les réglages de VS Code incluent `typescript.tsdk`.
- Intégrations supportées : `vim` et `vscode`.
- Quels que soient les arguments, la commande met toujours à jour les SDK et réglages d'éditeur déjà installés.

## Exemples

Générer uniquement les SDK de base :

```
yarn sdks base
```

Générer les SDK de base plus les réglages d'éditeur pour VS Code et Vim :

```
yarn sdks vscode vim
```

Mettre à jour tous les SDK et réglages d'éditeur générés :

```
yarn sdks
```
