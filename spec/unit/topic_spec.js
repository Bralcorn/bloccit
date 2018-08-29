const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

    Topic.create({
      title: "When will the world end?",
      description: "Nobody knows!"
    })
    .then((topic) => {
      this.topic = topic;
      Post.create({
        title: "My first visit to Proxima Centauri b",
        body: "I saw some rocks.",
        topicId: this.topic.id
      })
      .then((post) => {
        this.post = post;
        done();
      });
    })
    .catch((err) => {
      console.log(err);
      done();
    });
    });
  });

  describe("#create()", () => {
    it("should return the created topic with the name and description", (done) => {
      Topic.create({
        title: "What to do this weekend?",
        description: "Figure it out!"
      })
      .then((topic) => {
        expect(topic.title).toBe("What to do this weekend?");
        expect(topic.description).toBe("Figure it out!");
        done();
      })
    });
  });

  describe("#getPosts()", () => {
    it("should return all posts associtated with topic", (done) => {
      this.topic.getPosts()
      .then((posts) => {
        expect(posts[0].title).toBe("My first visit to Proxima Centauri b");
        expect(posts[0].body).toBe("I saw some rocks.");
        expect(posts[0].topicId).toBe(this.topic.id);
        done();
      });
    });
  });
});

