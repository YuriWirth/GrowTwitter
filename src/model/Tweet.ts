import { v4 as uuidv4 } from "uuid";
import User from "./User";
import { tweets } from "../database/Tweet.db";

class Tweet {
  private id: string;
  public content: string;
  public user: string;
  protected type?: "Tweet" | "Reply";
  public likes: User[] = [];
  public replys: Tweet[] = [];
  constructor(content: string, user: string, type: "Tweet" | "Reply") {
    this.id = uuidv4();
    this.content = content;
    this.type = type;
    this.user = user;
  }

  post() {
    tweets.push(this);
  }
  reply(content: string, user: string) {
    const reply = new Tweet(content, user, "Reply");
    this.replys.push(reply);
  }
  likeTweet(user: User) {
    if (this.likes.includes(user)) {
      console.log("Usuario já curtiu o post");
    } else {
      this.likes.push(user);
    }
  }

  showLike() {
    if (this.likes.length === 0) {
      console.log(`[0 Curtidas]`);
    } else if (this.likes.length === 1) {
      console.log(`[@${this.likes[0]} Curtidas]`);
    } else if (this.likes.length === 1) {
      console.log(`[@${this.likes[0]}  1 ou mais usuarios curtiram`);
    } else {
      console.log(
        `[@${this.likes[0]} more ${this.likes.length - 1} Usuarios curtiram]`
      );
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
  like(user: any) {
    if (this.likes.includes(user)) {
      console.log("Usuario já curtiu esse post!");
    } else {
      this.likes.push(user);
    }
  }
}

export default Tweet;
