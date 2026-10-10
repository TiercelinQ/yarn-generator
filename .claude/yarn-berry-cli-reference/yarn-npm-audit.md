# yarn npm audit

Audit de vulnérabilités sur les paquets installés.

Source : aide `yarn npm audit --help` (Yarn 4.18.1), https://yarnpkg.com/cli/npm/audit

## Usage

```
yarn npm audit
```

## Options

| Option | Description |
| --- | --- |
| `-A,--all` | Audite les dépendances de tous les workspaces |
| `-R,--recursive` | Audite aussi les dépendances transitives |
| `--environment <valeur>` | Environnements à couvrir |
| `--json` | Sortie au format flux NDJSON |
| `--no-deprecations` | N'avertit pas des paquets dépréciés |
| `--severity <valeur>` | Sévérité minimale des paquets affichés |
| `--exclude <valeur>` | Tableau de motifs glob de paquets à exclure de l'audit |
| `--ignore <valeur>` | Tableau de motifs glob d'ID d'advisories à ignorer dans le rapport |

## Détails

La commande recherche des rapports de sécurité connus sur les paquets utilisés. Par défaut, les rapports viennent du registre npm et peuvent ne pas concerner votre programme (toutes les vulnérabilités n'affectent pas tous les chemins de code).

Par cohérence avec les autres commandes, seules les dépendances directes du workspace actif sont vérifiées. `-A,--all` étend la recherche à tous les workspaces, `-R,--recursive` aux dépendances directes et transitives.

`--severity` limite le tableau d'audit aux vulnérabilités de la sévérité indiquée et au-dessus. Valeurs valides : `info`, `low`, `moderate`, `high`, `critical`.

Avec `--json`, Yarn affiche la sortie exactement telle que reçue du registre. Avec ou sans ce flag, le processus quitte avec un code non nul si un rapport est trouvé pour les paquets sélectionnés.

En cas de faux positifs pour un environnement, `--exclude` exclut des paquets de l'audit. Réglable aussi dans le fichier de configuration via `npmAuditExcludePackages`.

Pour ignorer des advisories précises, `--ignore` accepte des ID d'advisories. Réglable aussi via `npmAuditIgnoreAdvisories`.

Pour comprendre l'arbre de dépendances qui requiert les paquets vulnérables, consulter le rapport brut avec `--json` ou utiliser `yarn why package`.

## Exemples

Rechercher les failles connues dans les paquets installés (sortie : liste des problèmes connus) :

```
yarn npm audit
```

Auditer les dépendances de tous les workspaces :

```
yarn npm audit --all
```

Limiter l'audit à `dependencies` (exclut `devDependencies`) :

```
yarn npm audit --environment production
```

Afficher le rapport en JSON valide :

```
yarn npm audit --json
```

Auditer toutes les dépendances directes et transitives :

```
yarn npm audit --recursive
```

Afficher les vulnérabilités de sévérité `moderate` ou plus :

```
yarn npm audit --severity moderate
```

Exclure certains paquets :

```
yarn npm audit --exclude package1 --exclude package2
```

Ignorer des advisories précises :

```
yarn npm audit --ignore 1234567 --ignore 7654321
```
