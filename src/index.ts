import { tweets } from "./database/Tweet.db";
import { Tweet, User } from "./model";

const user1 = new User("YuriWirth", "yuriwirth@gmail.com", "1qaz2wsx");
const user2 = new User("Jacinto", "jacinto@gmail.com", "3edc4rfv");
const user3 = new User("Random", "random@gmai.com", "6yhn7ujm");

const tweet1 = new Tweet("Tweet de YuriWirth", user1.username, "Tweet");
const tweet2 = new Tweet("Meu primeiro tweet", user1.username, "Tweet");
const tweet3 = new Tweet("SALVE CRIA!", user2.username, "Tweet");

tweet1.post();
tweet2.post();
tweet3.post();

tweet1.like(user2.username);
tweet1.like(user1.username);
tweet3.like(user3.username);

user1.sendTweet(tweet1);
user1.sendTweet(tweet2);
user2.sendTweet(tweet3);

user2.follow(user2);
user2.follow(user1);
user3.follow(user1);

tweet1.reply("Concordo mano!", user1.username);
tweet3.reply("Só coisa boa ", user2.username);

// user1.showTweets()
user1.showFeed();