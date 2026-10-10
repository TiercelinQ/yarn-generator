# yarn dlx

Exécute un paquet dans un environnement temporaire.

Source : aide `yarn dlx --help` (Yarn 4.18.1), https://yarnpkg.com/cli/dlx

## Usage

```
yarn dlx <command> ...
```

## Options

| Option | Description |
| --- | --- |
| `-p,--package <valeur>` | Paquet(s) à installer avant d'exécuter la commande |
| `-q,--quiet` | N'affiche que les erreurs critiques au lieu des logs d'installation complets |

## Détails

La commande installe un paquet dans un environnement temporaire et exécute son script binaire s'il en contient un. Le binaire s'exécute dans le cwd courant.

Par défaut, Yarn télécharge le paquet nommé `command`. Le flag `-p,--package` permet d'exécuter la même commande depuis un autre paquet.

Remplacer `yarn add` par `yarn dlx` n'est pas recommandé : le projet devient non déterministe (Yarn ne garde trace ni du nom ni de la version des paquets installés via `dlx`).

## Exemples

Générer un nouveau projet Vite avec create-vite :

```
yarn dlx create-vite
```

Installer plusieurs paquets pour une seule commande :

```
yarn dlx -p typescript -p ts-node ts-node --transpile-only -e "console.log('hello!')"
```
