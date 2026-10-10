# apex Commands

Salesforce CLI version: `2.150.6`

Source page: https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_apex.html

## `sf apex get log`

Fetch the specified log or given number of most recent logs from the org.

### Description

To get the IDs for your debug logs, run "sf apex log list". Executing this command without flags returns the most recent log.

### Aliases

- `sf force apex log get`

### Usage

```bash
sf apex get log [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--log-id <value>] [--number <value>] [--output-dir <value>]
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

#### `-i | --log-id=<value>`

ID of the specific log to display.

- Type: option
- Required: no
- Aliases: `--logid`

#### `-n | --number=<value>`

Number of the most recent logs to display.

- Type: option
- Required: no

#### `-d | --output-dir=<value>`

Directory for saving the log files.

The location can be an absolute path or relative to the current working directory. The default is the current directory.

- Type: option
- Required: no
- Aliases: `--outputdir`, `--output-directory`

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

Fetch the log in your default org using an ID:

```bash
sf apex get log --log-id <log id>
```

Fetch the log in the org with the specified username using an ID:

```bash
sf apex get log --log-id <log id> --target-org me@my.org
```

Fetch the two most recent logs in your default org:

```bash
sf apex get log --number 2
```

Similar to previous example, but save the two log files in the specified directory:

```bash
sf apex get log --output-dir /Users/sfdxUser/logs --number 2
```

---

## `sf apex get test`

Display test results for a specific asynchronous test run.

### Description

Provide a test run ID to display test results for an enqueued or completed asynchronous test run. The test run ID is displayed after running the "sf apex test run" command.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for classes in your org. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

### Aliases

- `sf force apex test report`

### Usage

```bash
sf apex get test [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] --test-run-id <value> [--code-coverage] [--detailed-coverage] [--output-dir <value>] [--result-format <value>] [--concise]
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

Display test results for your default org using a test run ID:

```bash
sf apex get test --test-run-id <test run id>
```

Similar to previous example, but output the result in JUnit format:

```bash
sf apex get test --test-run-id <test run id> --result-format junit
```

Also retrieve code coverage results and output in JSON format:

```bash
sf apex get test --test-run-id <test run id> --code-coverage --json
```

Specify a directory in which to save the test results from the org with the specified username (rather than your default org):

```bash
sf apex get test --test-run-id <test run id> --code-coverage --output-dir <path to outputdir> --target-org me@myorg'
```

---

## `sf apex list log`

Display a list of IDs and general information about debug logs.

### Description

Run this command in a project to list the IDs and general information for all debug logs in your default org.

To fetch a specific log from your org, obtain the ID from this command's output, then run the “sf apex log get” command.

### Aliases

- `sf force apex log list`

### Usage

```bash
sf apex list log [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>]
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

List the IDs and information about the debug logs in your default org:

```bash
sf apex list log
```

Similar to previous example, but use the org with the specified username:

```bash
sf apex list log --target-org me@my.org
```

---

## `sf apex run`

Execute anonymous Apex code entered on the command line or from a local file.

### Description

If you don’t run this command from within a Salesforce DX project, you must specify the —-target-org flag.

To execute your code interactively, run this command with no flags. At the prompt, enter all your Apex code; press CTRL-D when you're finished. Your code is then executed in a single execute anonymous request.
For more information, see "Anonymous Blocks" in the Apex Developer Guide.

### Aliases

- `sf force apex execute`

### Usage

```bash
sf apex run [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--file <value>]
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

#### `-f | --file=<value>`

Path to a local file that contains Apex code.

- Type: option
- Required: no
- Aliases: `--apexcodefile`

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

Execute the Apex code that's in the ~/test.apex file in the org with the specified username:

```bash
sf apex run --target-org testusername@salesforce.org --file ~/test.apex
```

Similar to previous example, but execute the code in your default org:

```bash
sf apex run --file ~/test.apex
```

Run the command with no flags to start interactive mode; the code will execute in your default org when you exit. At the prompt, start type Apex code and press the Enter key after each line. Press CTRL+D when finished.

```bash
sf apex run
```

---

## `sf apex run test`

Invoke Apex tests in an org.

### Description

Specify which tests to run by using the --class-names, --suite-names, or --tests flags. Alternatively, use the --test-level flag to run all the tests in your org, local tests, or specified tests.

To see code coverage results, use the --code-coverage flag with --result-format. The output displays a high-level summary of the test run and the code coverage values for classes in your org. If you specify human-readable result format, use the --detailed-coverage flag to see detailed coverage results for each test method run.

By default, Apex tests run asynchronously and immediately return a test run ID. You can use the --wait flag to specify the number of minutes to wait; if the tests finish in that timeframe, the command displays the results. If the tests haven't finished by the end of the wait time, the command displays a test run ID. Use the "sf apex get test --test-run-id" command to get the results.

To run both Apex and Flow tests together, run the "sf logic run test" CLI command, which has similar flags as this command, but expands the --tests flag to also include Flow tests.

You must have the "View All Data" system permission to use this command. The permission is disabled by default and can be enabled only by a system administrator.

NOTE: The testRunCoverage value (JSON and JUnit result formats) is a percentage of the covered lines and total lines from all the Apex classes evaluated by the tests in this run.

### Aliases

- `sf force apex test run`

### Usage

```bash
sf apex run test [--json] [--flags-dir <value>] --target-org <value> [--api-version <value>] [--code-coverage] [--output-dir <value>] [--test-level <value>] [--class-names <value>] [--result-format <value>] [--suite-names <value>] [--tests <value>] [--poll-interval <value>] [--wait <value>] [--synchronous] [--detailed-coverage] [--concise]
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
- Exclusive with: `--suite-names`, `--tests`
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
- Exclusive with: `--class-names`, `--tests`
- Aliases: `--suitenames`

#### `-t | --tests=<value>`

Apex test class names or IDs and, if applicable, test methods to run; default is all tests.

If you specify --tests, you can't specify --class-names or --suite-names
For multiple tests, repeat the flag for each.
--tests Test1 --tests Test2

- Type: option
- Required: no
- Multiple values: yes (delimiter `,`)
- Exclusive with: `--class-names`, `--suite-names`

#### `-i | --poll-interval=<value>`

Number of seconds to wait between retries.

- Type: option
- Required: no
- Default: resolved dynamically (configuration variable or environment)

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

Run all Apex tests and suites in your default org:

```bash
sf apex run test
```

Run the specified Apex test classes in your default org and display results in human-readable form:

```bash
sf apex run test --class-names MyClassTest --class-names MyOtherClassTest --result-format human
```

Run the specified Apex test suites in your default org and include code coverage results and additional details:

```bash
sf apex run test --suite-names MySuite --suite-names MyOtherSuite --code-coverage --detailed-coverage
```

Run the specified Apex tests in your default org and display results in human-readable output:

```bash
sf apex run test --tests MyClassTest.testCoolFeature --tests MyClassTest.testAwesomeFeature --tests AnotherClassTest --tests namespace.TheirClassTest.testThis --result-format human
```

Run all tests in the org with the specified username with the specified test level; save the output to the specified directory:

```bash
sf apex run test --test-level RunLocalTests --output-dir <path to outputdir> --target-org me@my.org
```

Run all tests in the org asynchronously:

```bash
sf apex run test --target-org myscratch
```

Run all tests synchronously; the command waits to display the test results until all tests finish:

```bash
sf apex run test --synchronous
```

Run specific tests using the --test-level flag:

```bash
sf apex run test --test-level RunLocalTests
```

Run Apex tests on all the methods in the specified class; output results in Test Anything Protocol (TAP) format and request code coverage results:

```bash
sf apex run test --class-names TestA --class-names TestB --result-format tap --code-coverage
```

Run Apex tests on methods specified using the standard Class.method notation; if you specify a test class without a method, the command runs all methods in the class:

```bash
sf apex run test --tests TestA.excitingMethod --tests TestA.boringMethod --tests TestB
```

Run Apex tests on methods specified using the standard Class.method notation with a namespace:

```bash
sf apex run test --tests ns.TestA.excitingMethod --tests ns.TestA.boringMethod --tests ns.TestB
```

---

## `sf apex tail log`

Activate debug logging and display logs in the terminal.

### Description

You can also pipe the logs to a file.

### Aliases

- `sf force apex log tail`

### Usage

```bash
sf apex tail log [--flags-dir <value>] --target-org <value> [--api-version <value>] [--color] [--debug-level <value>] [--skip-trace-flag]
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

#### `-c | --color`

Apply default colors to noteworthy log lines.

- Type: boolean
- Required: no

#### `-d | --debug-level=<value>`

Debug level to set on the DEVELOPER_LOG trace flag for your user.

- Type: option
- Required: no
- Exclusive with: `--skip-trace-flag`
- Aliases: `--debuglevel`

#### `-s | --skip-trace-flag`

Skip trace flag setup. Assumes that a trace flag and debug level are fully set up.

- Type: boolean
- Required: no
- Aliases: `--skiptraceflag`

### Global flags

#### `--flags-dir=<value>`

Import flag values from a directory.

- Type: option
- Required: no

### Examples

Activate debug logging:

```bash
sf apex tail log
```

Specify a debug level:

```bash
sf apex tail log --debug-level MyDebugLevel
```

Skip the trace flag setup and apply default colors:

```bash
sf apex tail log --color --skip-trace-flag
```
