# api-testing-doc
Quick unit test and export document APIs

# Features
1. Test HTTP APIs passed or failed
2. Validate response data, response headers...
3. Re-use variable after each testcase done
4. Split a big testcase to many smaller testcases which make easy testing for large project
5. Easy to extends for specific project

# How to use
### Installation
```javascript
npm install -g api-testing-doc
```

### Write testcase
- Main file must be `index.yaml`
- You can include many files in index.yaml via `case` field
- You should install install "Project Snippets" plugins in visual code to make testcase easier
- After installed, please folow these below commands to write testcase faster. 

  * In .yaml please use these shortcuts to create APIs
    - `post`: Generate POST api in yaml
    - `put`: Generate PUT api in yaml
    - `get`: Generate GET api in yaml
    - `delete`: Generate DELETE api in yaml
    - `head`: Generate HEAD api in yaml
  * In .yaml please use these shortcuts to validate response data
    - `status`: Validate response status
    - `size`: Validate response data size
    - `match`: Validate response data must be matched your expection
    - `some`: Validate response data must be included atleast 1 of your expections
    - `every`: Validate response data must be contains all of your expections

### Run test
```sh
api-testing-doc test \"./EXPORTING_FILE_NAME.md\"
```

### How to write a testcase
1. Main testcase file `index.yaml` which is used to execute the first
```yaml
---
title: My Project # Module title
des: This is the super project # Project description
saveto: ./../../output/api-document.md # After the executing has done, the result will be exported to this path
debug: false # Always show a test link below each test step in console screen
docs: # Description for each fields in the response, request body... which is showed in document
  token: user or admin token
  pj: project id
  role: role id
vars: # Global variables which will be used in the test steps via ${varName}
  url: http://localhost/MyProject # use ${url} in test steps
  token: "my token here"  
cases:
- my_module.yaml # Auto import test case from file
```

2. file `my_module.yaml`
```yaml
---
title: Account APIs # Module title
des: Test account and roles  # Module description
debug: true # Always show a test link below each test step in console screen
stepbystep: true # Pause after each execution
docs: # Description for each fields in the response, request body... which is showed in document
  username: User name or Email
  recover_by: Email
vars: # Global variables which will be used in the test steps via ${varName}
  path: /Account # use ${url}${path} in test steps
steps: # Defined test steps which will be run sequence
- "<no-doc>": # This test step only run to test and validate, not export to doc
  "<try-to-pass>": 5/4000 # Retry 5 times and sleep time between each time is 4s when the request is validated failed.
  "<if>": "${isOk}" # Condition to execute test step/test job/test case...
  "Add a new log | ADMIN": # Test case description
    POST: ${url}${path}?fields={"*":1} # Request url ([POST, PUT, GET, DELETE, HEAD, PATCH])
    headers: { token: "${token}" } # Use quick template to add request headers
    body: { # Request body
      title: "Test new log",
      event_name: "test",
      event_code: "EVENT_CODE_HERE",
      files: ${File('./assets/w3logo.jpg')} # Upload file from path "./assets/w3logo.jpg"
    }
    debug: true # Always show a test link below each test step in console screen
    var: newlog # Variable which store response body to re-used in the other testcases
    vars: # Assign some value to some variables
      userToken: headers.token # varName: (headers|data|status) in response
    validate: # Validate response data after execute successfully
      - Check response status: # Validator description
        - match(status): 200 # Validate response status must be equals 200 (status|data|headers)
      - Check data after creating: # Validator description
        - match(data): { # Response data must match this value
          title: "Test new log",
          event_name: "test",
          event_code: "EVENT_CODE_HERE"
        }
      - Check some in data must be in the below: # Validator description
        - some: { # Response data must includes this value or atleast is 1 of them. This value can be object or array
          title: "Test new log",
          event_name: "test",
          event_code: "EVENT_CODE_HERE"
        }
      - Check all of data must be in the below: # Validator description
        - every: { # Response data must contains this value (all of them). This value can be object or array
          title: "Test new log",
          event_name: "test",
          event_code: "EVENT_CODE_HERE"
        }
        - size: 10 # Response data must be array or string and its length must be equals 10 items
    # Everything need to note for this APIs. Example: Status: On: 1, Off: 0...
    note: |
      - title and event_code are required
      - event_name is customize field

- Test case send fund and decline # Show text message in console log

- <import>: my_module_1.yaml # Execute test steps in "my_module_1"

- "<pause>": # Wait until enter anything to continue the next

- "<extends>": "Add a new log | ADMIN" # Copy a test step with name "Add a new log | ADMIN" and overide its attributes if is specified
    note: Overide note here

- "<sleep>": 2000 - Do something here # This make request hang up 2s. Need - to add description

- "<job>": # This will group apis into it
  - Group apis into a job # Show text message in console log

- "<job async>": # This will group apis into it and call asyns these apis
  - Async call apis in job # Show text message in console log

- "Remove log after execute in my_module_1.yaml done":
    DELETE: ${url}${path}/:logId|${newlog._id}
    headers: *adminToken # Use quick template to add request headers
```