# flow Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_flow.html

## `sf flow get test`

Display test results for a specific asynchronous test run.

### Description

Provide a flow test run ID to display test results for an enqueued or completed asynchronous test run. The test run ID is displayed after running the "sf flow run test" command.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for flow tests in your org. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

### Usage

```bash
sf flow get test [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --test-run-id <value> [--code-coverage] [--detailed-coverage] [--output-dir <value>] [--result-format <value>] [--concise]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-i | --test-run-id=<value>`

ID of the test run.

- Type: option
- Required: yes

#### `-c | --code-coverage`

Retrieve code coverage results.

- Type: boolean
- Required: no

#### `--detailed-coverage`

Not available for flow tests.

- Type: boolean
- Required: no
- Depends on: `--code-coverage`

#### `-d | --output-dir=<value>`

Directory in which to store test result files.

- Type: option
- Required: no

#### `-r | --result-format=<value>`

Format of the test results.

- Type: option
- Required: no
- Permitted values: `human`, `tap`, `junit`, `json`
- Default: `human`

#### `--concise`

Display only failed test results; works with human-readable output only.

- Type: boolean
- Required: no

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Display flow test results for your default org using a test run ID:

```bash
sf flow get test --test-run-id <test run id>
```

Similar to previous example, but output the result in JUnit format:

```bash
sf flow get test --test-run-id <test run id> --result-format junit
```

Also retrieve code coverage results and output in JSON format:

```bash
sf flow get test --test-run-id <test run id> --code-coverage --json
```

Specify a directory in which to save the test results from the org with the “me@my.org” username (rather than your default org):

```bash
sf flow get test --test-run-id <test run id> --code-coverage --output-dir <path to outputdir> --target-org me@my.org'
```

---

## `sf flow run test`

Invoke flow tests in an org.

### Description

Specify which tests to run by using the --class-names flag followed by the names of the flows you want to test. For example, if you save a flow with the name Flow1, then use: --class-names Flow1.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for classes in your org. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

By default, "flow run test" runs asynchronously and immediately returns a test run ID. If you use the -–synchronous flag, you can use the --wait flag to specify the number of minutes to wait; if the tests finish in that timeframe, the command displays the results. If the tests haven't finished by the end of the wait time, the command displays a test run ID. Use the "flow get test --test-run-id" command to get the results.

To run both Flow and Apex tests together, run the "sf logic run test" CLI command, which has similar flags as this command, but expands the --tests flag to also include Apex tests.

You must have the "View All Data" org system permission to use this command. The permission is disabled by default and can be enabled only by a system administrator.

### Usage

```bash
sf flow run test [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--result-format <value>] [--concise] [--output-dir <value>] [--code-coverage] [--synchronous] [--test-level <value>] [--class-names <value>] [--suite-names <value>] [--tests <value>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no

#### `-r | --result-format=<value>`

Format of the test results.

- Type: option
- Required: no
- Permitted values: `human`, `tap`, `junit`, `json`
- Default: `human`

#### `--concise`

Display only failed test results; works with human-readable output only.

- Type: boolean
- Required: no

#### `-d | --output-dir=<value>`

Directory in which to store test result files.

- Type: option
- Required: no

#### `-c | --code-coverage`

Retrieve code coverage results.

- Type: boolean
- Required: no

#### `-y | --synchronous`

Run flow tests for one flow synchronously; if not specified, tests are run asynchronously.

- Type: boolean
- Required: no

#### `-l | --test-level=<value>`

Level of tests to run; default is RunLocalTests.

Here's what the levels mean:

- RunLocalTests — All tests in your org are run, except the ones that originate from installed managed and unlocked packages.
- RunAllTestsInOrg — All tests are run. The tests include all tests in your org, including tests of managed packages.
- RunSpecifiedTests - Only the tests that you specify with the --tests flag are run.

- Type: option
- Required: no
- Permitted values: `RunLocalTests`, `RunAllTestsInOrg`, `RunSpecifiedTests`

#### `-n | --class-names=<value>`

Flow names that contain flow tests to run.

Default is all flow tests. If you select --class-names, you can't specify --tests.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--suite-names`, `--tests`
- Aliases: `--classnames`

#### `-s | --suite-names=<value>`

Not available for flow tests.

Not available for flow tests.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--class-names`, `--tests`
- Aliases: `--suitenames`

#### `-t | --tests=<value>`

Flow test names to run.

Default is all flow tests. If you specify --tests, you can't specify --class-names.

- Type: option
- Required: no
- Multiple values: yes
- Exclusive with: `--class-names`, `--suite-names`

### Global flags

#### `--json`

Format output as json.

- Type: boolean
- Required: no

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Run all local tests in your default org:

```bash
sf flow run test --test-level RunLocalTests
```

Run all the Flow1 and Flow2 flow tests in the org with alias “scratchOrg”:

```bash
sf flow run test --target-org scratchOrg --class-names Flow1 --class-names Flow2
```

Run specific Flow1 and Flow2 flow tests in your default org:

```bash
sf flow run test --tests Flow1.Test1 --tests Flow2.Test2 --test-level RunSpecifiedTests
```

Run all tests synchronously in your default org; the command waits to display the test results until all tests finish:

```bash
sf flow run test –synchronous
```

Run all local tests in the org with the username “me@my.org”; save the output to the specified directory:

```bash
sf flow run test --test-level RunLocalTests --output-dir /Users/susan/temp/cliOutput --target-org me@my.org
```
