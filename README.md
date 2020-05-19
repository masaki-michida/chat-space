# README

# chat_space table design

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|passward|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## groupsテーブル



|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|



### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user|references|null: false, foreign_key: true|
|groups|references|null: false, foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group
