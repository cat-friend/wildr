# **Database Schema**
DB diagram link: [here]

## `users`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| username      | string(50)| not null, unique               |
| hashedPassword| string    | not null                       |
| email         | string    | not null, unique               |
| imageId       | integer   |                                |
| createdAt     | datetime  | not null                       |
| updatedAt     | datetime  | not null                       |

* imageId references `images` table


## `profiles`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| userId        | integer   | not null, unique               |
| imageId       | integer   | not null, random default       |
| description   | text      | not null, standard default     |
| createdAt     | datetime  | not null                       |
| updatedAt     | datetime  | not null                       |

* userId references `users` table
* imageId references `images` table


## `images`
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| url         | string    | not null              |
| description | text      |                       |
| userId      | integer   |                       |
| albumId     | integer   | unique                |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

* userId references `users` table
* albumId references `albums` table


## `tags`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| name          | string(20)| not null, unique               |
| createdAt     | datetime  | not null                       |
| updatedAt     | datetime  | not null                       |


## `imagestags`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| imageId       | integer   | not null                       |
| tagId         | integer   | not null                       |
| createdAt     | datetime  | not null                       |
| updatedAt     | datetime  | not null                       |

* imageId references `images` table
* tagId references `tags` table

## `albums`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| name          | string(30)| not null, unique               |
| userId        | integer   | not null                       |
| createdAt     | datetime  | not null                       |
| updatedAt     | datetime  | not null                       |

* userId references `users` table

[here]: https://dbdiagram.io/d/61dc4803f8370f0a2eed67a6
