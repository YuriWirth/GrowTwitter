import { v4 as uuidv4 } from "uuid";
import Tweet from "./Tweet";
import { users } from "../database/Users.db";
import { tweets } from "../database/Tweet.db";

class User {
  private id: string;
  public username: string;
  public email: string;
  private password: string;
  public following: User[] = [];
  public followers: User[] = [];
  public tweets: Tweet[] = [];

  constructor(username: string, email: string, password: string) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password;

    const verifyUser = users.find(
      (user) => user.email === this.email || user.username === this.username
    );
    if (verifyUser) {
      console.log("Usuario já esta registrado!");
    } else {
      users.push(this);
    }
  }
  sendTweet(tweet: Tweet) {
    this.tweets.push(tweet);
  }

  follow(user: User) {
    if (user.username === this.username) {
      console.log("Você não pode seguir você mesmo!");
    } else {
      console.log(`@${this.username} Seguiu @${user.username}`);
      user.followers.push(this);
      this.following.push(user);
    }
  }
  showFeed() {
    const myTweets = tweets.filter(
      (tweetUser) => tweetUser.user === this.username
    );
    if (myTweets.length > 0) {
      console.log("Meus Tweets");
      myTweets.forEach((tweet) => tweet.show());
    } else {
      console.log("Tweets do usuario não encontrado!");
    }
    console.log("------------------------------------");
    if (this.following.length < 0) {
      console.log("Feed de pessoas que você segue!");
      this.following.forEach((user) =>
        user.tweets.forEach((tweet) => tweet.show())
      );
    } else {
      console.log("Esse usuario não segue ninguem!");
    }
  }
  showTweets() {
    const userSearch = tweets.filter((user) => user.user === this.username);
    if (userSearch.length > 0) {
      userSearch.forEach((tweet) => tweet.show());
    } else {
      console.log("Esse usuario não tem nenhum Tweet!");
    }
  }
}

export default User;
