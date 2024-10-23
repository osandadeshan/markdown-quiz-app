# Quiz 4: Advanced Technical Skills - Java, Selenium, and TestNG

## 1. In Java, how does the "volatile" keyword ensure visibility and ordering of variables across threads? [single]

- [ ] It prevents multiple threads from accessing the variable.
- [x] It ensures that writes to the variable are visible to all threads.
- [ ] It guarantees atomicity of operations on the variable.
- [ ] It only applies to local variables within a thread.

## 2. What is the effect of setting the "forkCount" attribute to "0" in the TestNG Maven Surefire plugin? [single]

- [x] It disables parallel execution and runs all tests in the same JVM.
- [ ] It executes tests in parallel across all available CPU cores.
- [ ] It enables debugging mode for each test.
- [ ] It allows only one thread to run per test class.

## 3. In Selenium, how would you handle dynamic web elements that do not have stable locators across page reloads? [multiple]

- [x] Use XPath with attribute conditions that are stable (e.g., contains(), starts-with()).
- [x] Implement a custom wait using "ExpectedConditions" to handle dynamic loading.
- [ ] Use the "By.name()" locator as it’s the most reliable for dynamic elements.
- [ ] Apply JavaScriptExecutor to directly interact with elements by their DOM index.

## 4. In Java, what is the role of the "CompletableFuture" class in asynchronous programming? [multiple]

- [x] It allows non-blocking asynchronous execution of tasks.
- [x] It can be combined with other "CompletableFuture" instances for complex workflows.
- [ ] It guarantees thread safety when multiple threads modify a shared resource.
- [ ] It allows synchronous execution of tasks across multiple threads.

## 5. In Selenium WebDriver, what is the difference between "implicitlyWait()", "WebDriverWait", and "FluentWait"? [multiple]

- [x] "implicitlyWait()" sets a default wait time for all findElement() operations.
- [x] "WebDriverWait" allows waiting for specific conditions to be met.
- [x] "FluentWait" allows fine-grained control over wait intervals and ignores specific exceptions.
- [ ] "implicitlyWait()" applies only to AJAX calls and not static elements.

## 6. What happens when you define multiple "@DataProvider" methods in a TestNG test class and use them across different test methods? [single]

- [ ] Only the first "@DataProvider" method is recognized and used.
- [x] You can specify which "@DataProvider" to use for each test method by name.
- [ ] TestNG runs all "@DataProvider" methods sequentially before executing the tests.
- [ ] It causes a runtime conflict between data sets, leading to test failure.

## 7. How would you ensure thread safety when running Selenium WebDriver tests in parallel across multiple browsers? [multiple]

- [x] Use a "ThreadLocal<WebDriver>" to create a separate instance of WebDriver for each thread.
- [x] Ensure all shared test data is immutable or synchronized properly.
- [ ] Implement the Singleton design pattern for WebDriver instance management.
- [ ] Use "synchronized" blocks around all WebDriver actions.

## 8. In Java, how can you handle circular dependencies between Spring beans when writing tests? [single]

- [ ] Circular dependencies are automatically resolved by the Spring framework.
- [x] Use "@Lazy" initialization or break the circular dependency using interfaces or constructor injection.
- [ ] Annotate beans with "@ComponentScan" to avoid circular dependencies.
- [ ] Use direct field injection to bypass circular dependency issues.

## 9. In Selenium, how do you handle file uploads when the `'<input type="file">'` is not visible or directly interactable? [multiple]

- [x] Use "sendKeys()" to set the file path to the "'<input>'" element.
- [x] Use JavaScriptExecutor to make the element visible before interacting with it.
- [ ] Use "Robot" class to simulate keyboard interactions for file upload dialogs.
- [ ] Use the "Actions" class to drag and drop files into the element.

## 10. In TestNG, how would you rerun only failed tests automatically during the same test execution? [single]

- [ ] Use the "@RetryFailed" annotation to mark tests for retry.
- [x] Configure the "testng-failed.xml" suite file and rerun it programmatically at the end of the test execution.
- [ ] Add a "retryAnalyzer" attribute to the "@Test" annotation and set the retry count.
- [ ] Use "dependsOnMethods" to ensure failed tests are rerun after their dependencies succeed.
