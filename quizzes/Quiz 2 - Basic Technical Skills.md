# Quiz 2: Basic Technical Skills - Java, Selenium, and TestNG

## 1. What is the default access modifier for classes and members in Java? [single]

- [ ] private
- [ ] public
- [x] package-private (default)
- [ ] protected

## 2. Which of the following is true about Java's `final` keyword? [multiple]

- [x] It can be applied to classes, methods, and variables.
- [ ] It prevents method overriding but allows inheritance.
- [ ] It allows multiple inheritance.
- [ ] It can only be applied to methods.

## 3. In Selenium, how do you switch to an iframe in the webpage? [single]

- [ ] `driver.switchTo().alert();`
- [ ] `driver.switchTo().window();`
- [x] `driver.switchTo().frame();`
- [ ] `driver.switchTo().defaultContent();`

## 4. What is the correct syntax for asserting a condition in TestNG? [single]

- [ ] `assertTrue(condition);`
- [x] `Assert.assertTrue(condition);`
- [ ] `assertEquals(condition);`
- [ ] `Assert(condition);`

## 5. How do you execute multiple test cases in parallel using TestNG? [single]

- [x] By setting the `parallel` attribute in the TestNG XML configuration.
- [ ] Using `@Test(parallel = true)`
- [ ] TestNG does not support parallel execution.
- [ ] Using `Thread.sleep()` in test methods.

## 6. Select the methods that are part of Selenium WebDriver for interacting with web elements: [multiple]

- [x] `sendKeys()`
- [ ] `enterText()`
- [x] `click()`
- [ ] `typeText()`

## 7. What is the use of `@BeforeMethod` in TestNG? [single]

- [x] It executes before each test method in a test class.
- [ ] It runs once before all tests in the suite.
- [ ] It runs after each test method.
- [ ] It executes after all test methods in a class.

## 8. Select the valid locators used to find elements in Selenium WebDriver: [multiple]

- [x] `By.id()`
- [x] `By.name()`
- [ ] `By.tag()`
- [ ] `By.link()`

## 9. Which of the following are advantages of using TestNG over JUnit? [multiple]

- [x] Parallel test execution
- [x] Data-driven testing using DataProvider
- [ ] No annotations required
- [ ] Uses JUnit's test runner

## 10. Which of the following Selenium WebDriver methods are used to handle browser navigation? [multiple]

- [x] `navigate().to()`
- [x] `navigate().back()`
- [ ] `refreshPage()`
- [ ] `goForward()`
