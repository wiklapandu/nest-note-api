# Nest Note Rest API

### Summary
api server for note application client web https://github.com/wiklapandu/-client-note-app.git 

### Features
- Authorization
  - login
  - register
- Note
  - get all note by author id
  - get detail note
  - create note
  - update note
  - delete note


### API


#### Authorization

<details>
<summary><code>POST</code> <code><b>/auth/login</b></code> <code>(authorize user and return token)</code> </summary>

##### Body

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username      |  required | string   | username of user  |
> | password | required | string | password of user |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"success","message":"Welcome back", "token": "AUTHORIZATION_TOKEN"}` |
> | `400`         | `application/json`                | `{"status":"unauthorized","message":"ERROR_MESSAGE"}` |


</details>

-----

<details>
  <summary>
    <code>POST</code> <code><b>/auth/register</b></code> <code>(register user)</code>
  </summary>

  ##### Body
  > | Name | Type | Data Type | Description |
  > |----|----|----|----|
  > | username | required | string | username of user|
  > | email | email, required | string | email of user |
  > | password | password, required | string | password of user |

  ##### Responses
  > | http code | content-type | response |
  > |--------|--------|------|
  > | `201` | `application/json` | `{"status":"success","message":"success register user", "data": <User>[]}` |
  > | `400` | `application/json` | `{"status":"failed","message":"Failed Register user", "error": error}` |

</details>


#### Note

<details>
  <summary><code>GET</code> <code><b>/note</b></code> <code>(Get all notes by author id)</code> </summary>

  ##### Headers
  > |Name|Type|Data Type|Description|
  > |----|---|----|----|
  > |Authorization|required|string|we can get the token from endpoint login|

  ##### Query
  > | Name | Type | Data Type | Description |
  > |----|---|----|----|
  >| status | N/A | string | status of note|
  >|search | N/A | string | for search note by title, and content|


  ##### Responses
  > | http code | content-type | response |
  > |--------|--------|------|
  > | `201` | `application/json` | `{"status":"Success","data": <Note>[]}` |
</details>

---------

<details>
  <summary><code>GET</code> <code><b>/note/:id</b></code> <code>(get detail of note by id)</code> </summary>

  ##### Headers
  > |Name|Type|Data Type|Description|
  > |----|---|----|----|
  > |Authorization|required|string|we can get the token from endpoint login|

  ##### Params
  > |Name|Type|Data Type|Description|
  >|----|----|----|----|
  >| id | required, uuid | string | id of note |


  ##### Responses
  > | http code | content-type | response |
  > |--------|--------|------|
  > | `201` | `application/json` | `{"status":"success","data": <Note>}` |
  > | `400` | `application/json` | `{"status":"failed","message":"Failed error","error":error}` |

</details>

---------

<details>
  <summary><code>POST</code> <code><b>/note</b></code> <code>(store note)</code> </summary>

  ##### Headers
  > |Name|Type|Data Type|Description|
  > |----|---|----|----|
  > |Authorization|required|string|we can get the token from endpoint login|

  ##### Body
  > |Name|Type|Data Type|Description|
  >|----|----|----|----|
  >| title | required | string | title of note |
  >| content | required | string | content of note |
  >| color | required | string | color of note |
  >| status | required | string | status of note |


  ##### Responses
  > | http code | content-type | response |
  > |--------|--------|------|
  > | `201` | `application/json` | `{"status":"success","message":"created note","note": <Note>}` |
  > | `400` | `application/json` | `{"status":"failed","message":"Failed error","error":error}` |

</details>

---------

<details>
  <summary><code>PUT</code> <code><b>/note/:id</b></code> <code>(store note)</code> </summary>

  ##### Headers
  > |Name|Type|Data Type|Description|
  > |----|---|----|----|
  > |Authorization|required|string|we can get the token from endpoint login|


  ##### Params
  > |Name|Type|Data Type|Description|
  >|----|----|----|----|
  >| id | required, uuid | string | id of note |

  ##### Body
  > |Name|Type|Data Type|Description|
  >|----|----|----|----|
  >| title | required | string | title of note |
  >| content | required | string | content of note |
  >| color | required | string | color of note |
  >| status | required | string | status of note |


  ##### Responses
  > | http code | content-type | response |
  > |--------|--------|------|
  > | `201` | `application/json` | `{"status":"success","message":"success update note"}` |
  > | `400` | `application/json` | `{"status":"failed","message":"Failed update error","error":error}` |

</details>