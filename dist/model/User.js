"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Users_db_1 = require("../database/Users.db");
const Tweet_db_1 = require("../database/Tweet.db");
class User {
    constructor(username, email, password) {
        this.following = [];
        this.followers = [];
        this.tweets = [];
        this.id = (0, uuid_1.v4)();
        this.username = username;
        this.email = email;
        this.password = password;
        const verifyUser = Users_db_1.users.find((user) => user.email === this.email || user.username === this.username);
        if (verifyUser) {
            console.log("Usuario já esta registrado!");
        }
        else {
            Users_db_1.users.push(this);
        }
    }
    sendTweet(tweet) {
        this.tweets.push(tweet);
    }
    follow(user) {
        if (user.username === this.username) {
            console.log("Você não pode seguir você mesmo!");
        }
        else {
            console.log(`@${this.username} Seguiu @${user.username}`);
            user.followers.push(this);
            this.following.push(user);
        }
    }
    showFeed() {
        const myTweets = Tweet_db_1.tweets.filter((tweetUser) => tweetUser.user === this.username);
        if (myTweets.length > 0) {
            console.log("Meus Tweets");
            myTweets.forEach((tweet) => tweet.show());
        }
        else {
            console.log("Tweets do usuario não encontrado!");
        }
        console.log("------------------------------------");
        if (this.following.length < 0) {
            console.log("Feed de pessoas que você segue!");
            this.following.forEach((user) => user.tweets.forEach((tweet) => tweet.show()));
        }
        else {
            console.log("Esse usuario não segue ninguem!");
        }
    }
    showTweets() {
        const userSearch = Tweet_db_1.tweets.filter((user) => user.user === this.username);
        if (userSearch.length > 0) {
            userSearch.forEach((tweet) => tweet.show());
        }
        else {
            console.log("Esse usuario não tem nenhum Tweet!");
        }
    }
}
exports.default = User;
