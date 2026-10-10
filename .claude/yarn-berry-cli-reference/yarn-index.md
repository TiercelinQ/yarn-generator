# Index des commandes Yarn Berry

Référence complète des commandes Yarn Berry (branche master, Yarn 4.18.1).

Sources : https://yarnpkg.com/cli et aides `--help` du binaire Yarn 4.18.1.

Conventions des fichiers :

- Chaque fichier contient usage, options, détails et exemples.
- Dans les tableaux d'options, `<valeur>` remplace le marqueur `#0` de l'aide officielle (l'option attend une valeur).
- Les commandes d'un même groupe (`config`, `npm stage`, `plugin`...) sont réunies dans un seul fichier.

## Commandes générales

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn add` | Ajoute des dépendances au projet | [yarn-add.md](yarn-add.md) |
| `yarn bin` | Affiche le chemin d'un binaire | [yarn-bin.md](yarn-bin.md) |
| `yarn cache clean` | Supprime les fichiers du cache partagé | [yarn-cache-clean.md](yarn-cache-clean.md) |
| `yarn dedupe` | Déduplique les dépendances aux plages qui se chevauchent | [yarn-dedupe.md](yarn-dedupe.md) |
| `yarn dlx` | Exécute un paquet dans un environnement temporaire | [yarn-dlx.md](yarn-dlx.md) |
| `yarn exec` | Exécute un script shell | [yarn-exec.md](yarn-exec.md) |
| `yarn info` | Affiche des informations sur les paquets | [yarn-info.md](yarn-info.md) |
| `yarn init` | Crée un nouveau paquet | [yarn-init.md](yarn-init.md) |
| `yarn install` | Installe les dépendances du projet | [yarn-install.md](yarn-install.md) |
| `yarn link` | Connecte le projet local à un autre | [yarn-link.md](yarn-link.md) |
| `yarn node` | Lance node avec le hook Yarn déjà configuré | [yarn-node.md](yarn-node.md) |
| `yarn pack` | Génère une archive tarball du workspace actif | [yarn-pack.md](yarn-pack.md) |
| `yarn rebuild` | Reconstruit les paquets natifs du projet | [yarn-rebuild.md](yarn-rebuild.md) |
| `yarn remove` | Retire des dépendances du projet | [yarn-remove.md](yarn-remove.md) |
| `yarn run` | Exécute un script défini dans package.json | [yarn-run.md](yarn-run.md) |
| `yarn stage` | Ajoute tous les fichiers Yarn au VCS | [yarn-stage.md](yarn-stage.md) |
| `yarn unlink` | Déconnecte le projet local d'un autre | [yarn-unlink.md](yarn-unlink.md) |
| `yarn unplug` | Force le dépaquetage d'une liste de paquets | [yarn-unplug.md](yarn-unplug.md) |
| `yarn up` | Met à jour les dépendances du projet | [yarn-up.md](yarn-up.md) |
| `yarn why` | Explique pourquoi un paquet est nécessaire | [yarn-why.md](yarn-why.md) |

## Configuration

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn config` | Affiche la configuration courante | [yarn-config.md](yarn-config.md) |
| `yarn config get` | Lit un paramètre de configuration | [yarn-config.md](yarn-config.md) |
| `yarn config set` | Modifie un paramètre de configuration | [yarn-config.md](yarn-config.md) |
| `yarn config unset` | Supprime un paramètre de configuration | [yarn-config.md](yarn-config.md) |

## Diagnostic

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn explain` | Explique un code d'erreur | [yarn-explain.md](yarn-explain.md) |
| `yarn explain peer-requirements` | Explique un ensemble d'exigences peer | [yarn-explain.md](yarn-explain.md) |

## Résolution et patch

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn patch` | Prépare un paquet pour un patch | [yarn-patch.md](yarn-patch.md) |
| `yarn patch-commit` | Génère un patch à partir d'un répertoire | [yarn-patch.md](yarn-patch.md) |
| `yarn set resolution` | Force la résolution d'un paquet | [yarn-set-resolution.md](yarn-set-resolution.md) |

## Version de Yarn

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn set version` | Verrouille la version de Yarn utilisée par le projet | [yarn-set-version.md](yarn-set-version.md) |
| `yarn set version from sources` | Compile Yarn depuis master | [yarn-set-version.md](yarn-set-version.md) |

## Contraintes

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn constraints` | Vérifie que les contraintes du projet sont respectées | [yarn-constraints.md](yarn-constraints.md) |
| `yarn constraints query` | Interroge la base de faits des contraintes | [yarn-constraints.md](yarn-constraints.md) |
| `yarn constraints source` | Affiche le code source des contraintes | [yarn-constraints.md](yarn-constraints.md) |

## Npm

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn npm audit` | Audit de vulnérabilités sur les paquets installés | [yarn-npm-audit.md](yarn-npm-audit.md) |
| `yarn npm info` | Affiche des informations sur un paquet | [yarn-npm-info.md](yarn-npm-info.md) |
| `yarn npm login` | Enregistre les identifiants du registre npm | [yarn-npm-auth.md](yarn-npm-auth.md) |
| `yarn npm logout` | Se déconnecte du registre npm | [yarn-npm-auth.md](yarn-npm-auth.md) |
| `yarn npm whoami` | Affiche le nom de l'utilisateur authentifié | [yarn-npm-auth.md](yarn-npm-auth.md) |
| `yarn npm publish` | Publie le workspace actif sur le registre npm | [yarn-npm-publish.md](yarn-npm-publish.md) |
| `yarn npm stage approve` | Approuve une version de paquet en attente de publication | [yarn-npm-stage.md](yarn-npm-stage.md) |
| `yarn npm stage list` | Liste les versions de paquet en attente | [yarn-npm-stage.md](yarn-npm-stage.md) |
| `yarn npm stage reject` | Rejette une version de paquet en attente | [yarn-npm-stage.md](yarn-npm-stage.md) |
| `yarn npm tag add` | Ajoute un tag à une version d'un paquet | [yarn-npm-tag.md](yarn-npm-tag.md) |
| `yarn npm tag list` | Liste les dist-tags d'un paquet | [yarn-npm-tag.md](yarn-npm-tag.md) |
| `yarn npm tag remove` | Retire un tag d'un paquet | [yarn-npm-tag.md](yarn-npm-tag.md) |

## Plugins

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn plugin check` | Trouve les plugins tiers qui diffèrent de leur spec | [yarn-plugin.md](yarn-plugin.md) |
| `yarn plugin import` | Télécharge un plugin | [yarn-plugin.md](yarn-plugin.md) |
| `yarn plugin import from sources` | Compile un plugin depuis les sources | [yarn-plugin.md](yarn-plugin.md) |
| `yarn plugin list` | Liste les plugins officiels disponibles | [yarn-plugin.md](yarn-plugin.md) |
| `yarn plugin remove` | Supprime un plugin | [yarn-plugin.md](yarn-plugin.md) |
| `yarn plugin runtime` | Liste les plugins actifs | [yarn-plugin.md](yarn-plugin.md) |

## Interactives

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn search` | Ouvre l'interface de recherche | [yarn-search.md](yarn-search.md) |
| `yarn upgrade-interactive` | Ouvre l'interface de mise à jour | [yarn-upgrade-interactive.md](yarn-upgrade-interactive.md) |

## Release

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn version` | Change les versions des workspaces | [yarn-version.md](yarn-version.md) |
| `yarn version apply` | Applique les enregistrements différés aux workspaces | [yarn-version.md](yarn-version.md) |
| `yarn version check` | Vérifie que chaque workspace modifié a un enregistrement de bump différé | [yarn-version.md](yarn-version.md) |

## Workspaces

| Commande | Description | Fichier |
| --- | --- | --- |
| `yarn workspace` | Exécute une commande dans le workspace indiqué | [yarn-workspace.md](yarn-workspace.md) |
| `yarn workspaces focus` | Installe un seul workspace et ses dépendances | [yarn-workspaces.md](yarn-workspaces.md) |
| `yarn workspaces foreach` | Exécute une commande sur tous les workspaces | [yarn-workspaces.md](yarn-workspaces.md) |
| `yarn workspaces list` | Liste les workspaces disponibles | [yarn-workspaces.md](yarn-workspaces.md) |

## Paquets additionnels

Commandes de paquets séparés, hors cœur de Yarn.

| Commande | Paquet | Fichier |
| --- | --- | --- |
| `yarn builder build bundle` | `@yarnpkg/builder` | [yarn-builder.md](yarn-builder.md) |
| `yarn builder build plugin` | `@yarnpkg/builder` | [yarn-builder.md](yarn-builder.md) |
| `yarn builder new plugin` | `@yarnpkg/builder` | [yarn-builder.md](yarn-builder.md) |
| `yarn pnpify run` | `@yarnpkg/pnpify` | [yarn-pnpify.md](yarn-pnpify.md) |
| `yarn sdks` | `@yarnpkg/sdks` | [yarn-sdks.md](yarn-sdks.md) |
