
# Testing Redux Store

Testing Redux store using Cypress as described in [this blog post](https://www.cypress.io/blog/2018/11/14/testing-redux-store/).

## Shows how to

- control application via DOM and check that Redux store has been properly updated
- drive application by dispatching Redux actions
- use Redux actions directly from tests
- load initial Redux state from a fixture file
- use automatic user function retries with [cypress-pipe](https://github.com/NicholasBoll/cypress-pipe#readme)
- use snapshot testing via [meinaart/cypress-plugin-snapshots](https://github.com/meinaart/cypress-plugin-snapshots) plugin

## Application

The example TodoMVC application in this folder was copied from [https://github.com/reduxjs/redux/tree/master/examples/todomvc](https://github.com/reduxjs/redux/tree/master/examples/todomvc) on November 2018.

The application exposes the reference to to the store while running inside Cypress-controlled browsers like this

```js
const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store
}
```

And the tests can access the store using

```js
it('has expected state on load', () => {
  cy.visit('/')
  cy.window().its('store').then(store => {
    // manipulate the store reference
  })
})
```


`cypress-pipe` 是 Cypress 的一个插件，它允许您在测试中使用类似于函数式编程的方法。它提供了一个 `.pipe()` 方法，使您能够对前一个命令的结果进行操作，然后传递给下一个命令。这有助于在 Cypress 测试中处理异步操作和构建更复杂的断言逻辑。

使用 `cypress-pipe` 的 `.pipe(getTodos)`，它将 `getTodos` 函数应用于前一个命令 `cy.window()` 的结果。这允许您在 Cypress 测试中以函数式的方式获取窗口状态的 `todos` 数组。接着，`.should('have.length', 3)` 断言了 `todos` 数组的长度是否为 3。

`cypress-pipe` 使得 Cypress 测试更具灵活性，特别是在处理复杂的异步操作或构建更复杂的断言逻辑时。

