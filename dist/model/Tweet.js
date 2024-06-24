"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Tweet_db_1 = require("../database/Tweet.db");
class Tweet {
    constructor(content, user, type) {
        this.likes = [];
        this.replys = [];
        this.id = (0, uuid_1.v4)();
        this.content = content;
        this.type = type;
        this.user = user;
    }
    post() {
        Tweet_db_1.tweets.push(this);
    }
    reply(content, user) {
        const reply = new Tweet(content, user, "Reply");
        this.replys.push(reply);
    }
    likeTweet(user) {
        if (this.likes.includes(user)) {
            console.log("Usuario já curtiu o post");
        }
        else {
            this.likes.push(user);
        }
    }
    showLike() {
        if (this.likes.length === 0) {
            console.log(`[0 Curtidas]`);
        }
        else if (this.likes.length === 1) {
            console.log(`[@${this.likes[0]} Curtidas]`);
        }
        else if (this.likes.length === 1) {
            console.log(`[@${this.likes[0]}  1 ou mais usuarios curtiram`);
        }
        else {
            console.log(`[@${this.likes[0]} more ${this.likes.length - 1} Usuarios que curtiram]`);
        }
    }
    showReplys() {
        for (let reply of this.replys) {
            console.log(` > @${reply.user}: ${reply.content}`);
        }
    }
    show() {
        console.log("------------REPLYS ABAIXO------------------");
        console.log(`@${this.user}: ${this.content}`);
        this.showLike();
        this.showReplys();
    }
    like(user) {
        if (this.likes.includes(user)) {
            console.log("Usuario já curtiu esse post!");
        }
        else {
            this.likes.push(user);
        }
    }
}
exports.default = Tweet;
