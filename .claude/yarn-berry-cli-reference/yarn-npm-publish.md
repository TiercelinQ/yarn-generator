# yarn npm publish

Publie le workspace actif sur le registre npm.

Source : aide `yarn npm publish --help` (Yarn 4.18.1), https://yarnpkg.com/cli/npm/publish

## Usage

```
yarn npm publish
```

## Options

| Option | Description |
| --- | --- |
| `--access <valeur>` | Accès du paquet publié (`public` ou `restricted`) |
| `--tag <valeur>` | Tag du registre auquel rattacher le paquet |
| `--tolerate-republish` | Avertit et quitte en cas de republication d'une version déjà existante |
| `--otp <valeur>` | Token OTP à utiliser avec la commande |
| `--provenance` | Génère la provenance du paquet. Disponible uniquement dans GitHub Actions et GitLab CI. Réglable globalement via le paramètre `npmPublishProvenance` ou la variable d'environnement `YARN_NPM_CONFIG_PROVENANCE`, ou par paquet via le champ `publishConfig.provenance` du `package.json` |
| `-n,--dry-run` | Affiche ce qui serait publié sans publier |
| `--json` | Sortie au format JSON |
| `--staged` | Met le paquet en attente d'approbation au lieu de le publier immédiatement |

## Détails

La commande empaquette le workspace actif dans une archive neuve et l'envoie au registre npm.

Le paquet est rattaché par défaut au tag `latest`. L'option `--tag` change ce comportement.

Pour des raisons historiques, les paquets scopés sont publiés par défaut avec l'accès `restricted` (paquets privés), ce qui demande un plan npm payant. Pour publier gratuitement un paquet scopé public, ajouter `--access public`. Ce comportement peut être activé par défaut via le paramètre `npmPublishAccess`.

Avec `--staged`, le paquet est mis en attente d'approbation au lieu d'être publié immédiatement. Le staging ne demande pas de 2FA : des workflows automatisés peuvent mettre des paquets en attente et repousser la preuve de présence à l'étape d'approbation. Gestion des paquets en attente : `yarn npm stage list`, `yarn npm stage approve`, `yarn npm stage reject` (voir [yarn-npm-stage.md](yarn-npm-stage.md)).

## Exemples

Publier le workspace actif :

```
yarn npm publish
```

Mettre le workspace actif en attente d'approbation :

```
yarn npm publish --staged
```
