# **My App Name**
## hacktiv8Press
Final Livecode Phase 2..

## REST API
#### List of articles routes:
|**Route**|**HTTP**|**Description**|
|---------|--------|---------------|
|/api/articles/|GET|Print all articles|
|/api/articles/:id|GET|Print one article|
|/api/articles/author/:name|GET|Print articles by author name|
|/api/articles/category/:name|GET|Print articles by category|
|/api/articles/create|POST|Create article|
|/api/articles/update/:id|PUT|Updated selected articles|
|/api/articles/delete/:id|DELETE|Delete Selected articles|

#### List of user routes:
|**Route**|**HTTP**|**Description**|
|---------|--------|---------------|
|/api/users/:id|GET|get a single user|
|/api/users/signin|POST|Create a user|
|/api/users/signup|POST|Create a user|
|/api/users/:id|PUT|Update a user with new info|
|/api/users/:id|DELETE|Delete a user|

## Usage
#### Server:
```
npm install
npm start
```

#### Client
```
npm run serve
```
