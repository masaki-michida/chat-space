# README

# chat_space table design

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index|
|email|string|null: false, unique: true|
|passward|string|null: false, unique: true|
|messages_id|integer|foreign_key: true|
|groups_users_id|integer|foreign_key: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index|
|messages_id|integer|foreign_key: true|
|groups_users_id|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
