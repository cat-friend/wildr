# **Database Schema**
DB diagram link: [here]

## `users`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| userName      | string(50)| not null, unique               |
| hashedPassword| string    | not null                       |
| email         | string    | not null, unique               |
| imageId       | integer   |                                |

* imageId references `images` table

## `profiles`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| userId        | integer   | not null, unique               |
| imageId       | integer   |                                |
| description   | text      | not null                       |

* userId references `users` table
* imageId references `images` table


## `images`
| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| url         | string    | not null              |
| userId      | integer   |                       |
* userId references `users` table

## `tags`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| name          | string(20)| not null, unique               |


## `imagestags`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| imageId       | integer   | not null                       |
| tagId         | integer   | not null                       |

* imageId references `images` table
* tagId references `tags` table

## `albums`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| id            | integer   | not null, primary key          |
| name          | string(30)| not null, unique               |
| userId        | integer   | not null                       |

* userId references `users` table

## `imagesalbums`
| column name   | data type | details                        |
|---------------|-----------|--------------------------------|
| imageId       | integer   | not null                       |
| albumId       | integer   | not null                       |

* imageId references `images` table
* album references `albums` table



[here]: https://dbdiagram.io/d/61dc4803f8370f0a2eed67a6
