The provided code demonstrates how to check if a resource has been loaded in Cypress. Here's a summary:

1. **Access Window Object:** Using `cy.window()`, access the browser window object to interact with its properties, in this case, the performance entries.

2. **Retrieve Performance Entries:** Utilize `win.performance.getEntriesByType('resource')` to obtain an array of performance entries specifically related to resources.

3. **Check Resource Loading:** Use the `find` method on the array to search for a resource entry whose name ends with a specified name. The result is assigned to the `foundResource` variable.

This code snippet effectively checks if a particular resource has been loaded by examining the browser's performance entries for resources.


```
// how to check if a resource has been loaded
cy.window().then(win => {
  foundResource = win.performance
    .getEntriesByType('resource')
    .find(item => item.name.endsWith(name))
})
```


-c: This flag is typically used to enable caching. The value that follows determines the cache time in seconds.

-1: In this case, the value -1 is used, indicating that caching should be disabled. A cache time of -1 effectively means that the server should not cache any content, always fetching the latest version from the server.