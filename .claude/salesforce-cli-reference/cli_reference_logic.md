# logic Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_logic.html

## `sf logic get test`

Status: beta

Get the results of a test run.

### Description

When you run 'sf logic run test' to test Apex classes and Flows asynchronously, it returns a test run ID. Use that ID with this command to see the results.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for classes in your org. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

### Usage

```bash
sf logic get test [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --test-run-id <value> [--code-coverage] [--detailed-coverage] [--output-dir <value>] [--result-format <value>] [--concise]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-i | --test-run-id=<value>`

ID of the test run.

- Type: option
- Required: yes
- Aliases: `--testrunid`

#### `-c | --code-coverage`

Retrieve code coverage results.

- Type: boolean
- Required: no
- Aliases: `--codecoverage`

#### `--detailed-coverage`

Display detailed code coverage per test.

- Type: boolean
- Required: no
- Depends on: `--code-coverage`

#### `-d | --output-dir=<value>`

Directory in which to store test result files.

- Type: option
- Required: no
- Aliases: `--outputdir`, `--output-directory`

#### `-r | --result-format=<value>`

Format of the test results.

- Type: option
- Required: no
- Permitted values: `human`, `tap`, `junit`, `json`
- Default: `human`
- Aliases: `--resultformat`

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

Get the results for a specific test run ID in the default human-readable format; uses your default org:

```bash
sf logic get test --test-run-id <test run id>
```

Get the results for a specific test run ID, format them as JUnit, and save them to the "test-results/junit" directory; uses the org with alias "my-scratch":

```bash
sf logic get test --test-run-id <test run id> --result-format junit --target-org my-scratch
```

---

## `sf logic run test`

Status: beta

Invoke tests for Apex and Flows in an org.

### Description

This command provides a single and unified way to run tests for multiple Salesforce features, such as Apex classes and Flows. Running the tests together with a single command ensures seamless interoperability between the features.

By default, the command executes asynchronously and returns a test run ID. Then use the "sf logic get test" command to retrieve the results. If you want to wait for the test run to complete and see the results in the command output, use the --synchronous flag.

To run specific tests, use the --tests flag and pass it the names of Apex and Flow tests. For Apex, simply specify the name of the Apex test class. For Flows, use the format "FlowTesting.\<name-of-flow-test\>". To find the name of all the flow tests in your org, run this command and specify the Flow category, such as "sf logic run test --synchronous --test-category Flow --test-level RunAllTestsInOrg". The command displays a table of all the flow tests it ran; see the "TEST NAME" column for the full name of all available flow tests in your org.

You can also run specific test methods, although if you run the tests synchronously, the methods must belong to a single Apex class or Flow test. To run all tests of a certain category, use --test-category and --test-level together. If neither of these flags is specified, all local tests for all categories are run by default. You can also use the --class-names and --suite-names flags to run Apex test classes or suites.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for the tested classes or flows. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

You must have the "View All Data" org system permission to use this command. The permission is disabled by default and can be enabled only by a system administrator.

### Usage

```bash
sf logic run test [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--code-coverage] [--output-dir <value>] [--test-level <value>] [--class-names <value>] [--result-format <value>] [--suite-names <value>] [--tests <value>] [--wait <value>] [--synchronous] [--detailed-coverage] [--concise] [--test-category <value>]
```

### Flags

#### `-o | --target-org=<value>`

Username or alias of the target org. Not required if the `target-org` configuration variable is already set.

- Type: option
- Required: yes
- Default: resolved dynamically (configuration variable or environment)
- Aliases: `--targetusername`, `--u`

#### `--api-version=<value>`

Override the api version used for api requests made by this command

- Type: option
- Required: no
- Aliases: `--apiversion`

#### `-c | --code-coverage`

Retrieve code coverage results.

- Type: boolean
- Required: no
- Aliases: `--codecoverage`

#### `-d | --output-dir=<value>`

Directory in which to store test run files.

- Type: option
- Required: no
- Aliases: `--outputdir`, `--output-directory`

#### `-l | --test-level=<value>`

Level of tests to run; default is RunLocalTests.

Here's what the levels mean:

- RunSpecifiedTests — Only the tests that you specify in the runTests option are run. Code coverage requirements differ from the default coverage requirements when using this test level. The executed tests must cover each class and trigger in the deployment package for a minimum of 75% code coverage. This coverage is computed for each class and triggers individually, and is different than the overall coverage percentage.
- RunLocalTests — All local tests in your org, including tests that originate from no-namespaced unlocked packages, are run. The tests that originate from installed managed packages and namespaced unlocked packages aren't run. This test level is the default for production deployments that include Apex classes or triggers.
- RunAllTestsInOrg — All tests are run. The tests include all tests in your org.

- Type: option
- Required: no
- Permitted values: `RunLocalTests`, `RunAllTestsInOrg`, `RunSpecifiedTests`
- Aliases: `--testlevel`

#### `-n | --class-names=<value>`

Apex test class names to run; default is all classes.

If you select --class-names, you can't specify --suite-names or --tests.
For multiple classes, repeat the flag for each.
--class-names Class1 --class-names Class2

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--suite-names`, `--tests`, `--test-category`
- Aliases: `--classnames`

#### `-r | --result-format=<value>`

Format of the test results.

- Type: option
- Required: no
- Permitted values: `human`, `tap`, `junit`, `json`
- Default: `human`
- Aliases: `--resultformat`

#### `-s | --suite-names=<value>`

Apex test suite names to run.

If you select --suite-names, you can't specify --class-names or --tests.
For multiple suites, repeat the flag for each.
--suite-names Suite1 --suite-names Suite2

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--class-names`, `--tests`, `--test-category`
- Aliases: `--suitenames`

#### `-t | --tests=<value>`

Comma-separated list of test names to run. Can include Apex test classes and Flow tests.

If you specify --tests, you can't specify --class-names or --suite-names
For multiple tests, repeat the flag for each.
--tests Test1 --tests Test2

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--class-names`, `--suite-names`, `--test-category`

#### `-w | --wait=<value>`

Sets the streaming client socket timeout in minutes; specify a longer wait time if timeouts occur frequently.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

#### `-y | --synchronous`

Runs test methods from a single Apex class synchronously; if not specified, tests are run asynchronously.

- Type: boolean
- Required: no

#### `-v | --detailed-coverage`

Display detailed code coverage per test.

- Type: boolean
- Required: no
- Depends on: `--code-coverage`
- Aliases: `--detailedcoverage`

#### `--concise`

Display only failed test results; works with human-readable output only.

- Type: boolean
- Required: no

#### `--test-category=<value>`

Category of tests to run, such as Apex or Flow.

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Permitted values: `Apex`, `Flow`

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

Run a mix of specific Apex and Flow tests asynchronously in your default org:

```bash
sf logic run test --tests MyApexClassTest,FlowTesting.Modify_Account_Desc.Modify_Account_Desc_TestAccountDescription
```

Run all local Apex and Flow tests and wait for the results to complete; run the tests in the org with alias "my-scratch":

```bash
sf logic run test --test-level RunLocalTests --test-category Apex --test-category Flow --synchronous --target-org my-scratch
```

Run two methods in an Apex test class and an Apex test suite:

```bash
sf logic run test --class-names MyApexClassTest.methodA --class-names MyApexClassTest.methodB --suite-names MySuite
```

Run all local tests for all categories (the default behavior), save the JUnit results to the "test-results" directory, and include code coverage results:

```bash
sf logic run test --result-format junit --output-dir test-results --synchronous --code-coverage
```
