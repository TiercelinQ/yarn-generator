# yarn constraints

Vérification des contraintes du projet. Trois commandes : `yarn constraints`, `yarn constraints query`, `yarn constraints source`.

Sources : https://yarnpkg.com/cli/constraints, https://yarnpkg.com/cli/constraints/query, https://yarnpkg.com/cli/constraints/source

Écriture des contraintes : https://yarnpkg.com/features/constraints

---

## yarn constraints

Vérifie que les contraintes du projet sont respectées.

### Usage

```
yarn constraints
```

### Options

| Option | Description |
| --- | --- |
| `--fix` | Tente de corriger automatiquement les problèmes non ambigus, en plusieurs passes |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande exécute les contraintes sur le projet et émet une erreur pour chaque contrainte non respectée. Si une erreur est émise, le processus quitte avec un code de sortie non nul.

Avec `--fix`, Yarn tente de corriger les problèmes au mieux, en plusieurs passes (10 itérations maximum). Certains motifs ambigus ne peuvent pas être corrigés automatiquement : la bonne résolution doit alors être indiquée à la main.

### Exemples

Vérifier que toutes les contraintes sont satisfaites :

```
yarn constraints
```

Corriger automatiquement toutes les contraintes non satisfaites :

```
yarn constraints --fix
```

---

## yarn constraints query

Interroge la base de faits des contraintes.

### Usage

```
yarn constraints query <query>
```

### Options

| Option | Description |
| --- | --- |
| `--json` | Sortie au format flux NDJSON |

### Détails

La commande affiche toutes les correspondances d'une requête Prolog.

### Exemples

Lister toutes les dépendances du workspace :

```
yarn constraints query 'workspace_has_dependency(_, DependencyName, _, _).'
```

---

## yarn constraints source

Affiche le code source des contraintes.

### Usage

```
yarn constraints source
```

### Options

| Option | Description |
| --- | --- |
| `-v,--verbose` | Affiche aussi la base de faits compilée automatiquement depuis les manifestes des workspaces |

### Détails

La commande affiche le code source Prolog utilisé par le moteur de contraintes. Avec `-v,--verbose`, elle affiche le code source complet, base de faits incluse.

### Exemples

Afficher le code source :

```
yarn constraints source
```

Afficher le code source et la base de faits :

```
yarn constraints source -v
```
