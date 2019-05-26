const Chance = require('chance');
module.exports = (sequelize, Sequelize) => {
  // declare and define models
  class Article extends Sequelize.Model {
    // returns plain object representing the article and its tags
    async serialize(complete = false) {
      try {
        const article = this.get({plain: true});
        // delete createdAt and updatedAt properties if complete is false
        if (!complete) {
          delete article.createdAt;
          delete article.updatedAt;
        }
        // get article tags
        article.tags = (await this.getTags()).map(({keyword}) => keyword);
        return article;
      } catch (err) {
        process.stderr.write(err);
      }
    }
    // applies this.serialize to items of an array of instances
    static async serializeArray(instances, complete = false) {
      try {
        const articles = [];
        for(let instance of instances) {
          articles.push(await instance.serialize(complete));
        }
        return articles;
      } catch (err) {
        process.stderr.write(err);
      }
    }
    // convert plain object into a non-persistent instance
    static async deserialize(plainObj) {
      try {
        const {
          title,
          uniformResourceLocator,
          tags
        } = plainObj;
        const tagInstances = [];
        for(let tag of tags) {
          const [tagInstance] = await Tag.findOrCreate({where: {keyword: tag}});
          tagInstances.push(tagInstance);
        }
        const articleInstance = await Article.create({
          title,
          uniformResourceLocator,
        });
        await articleInstance.addTags(tagInstances);
        return plainObj;
      } catch (err) {
        process.stderr.write(err.toString());
      }
    }
    // checks if nickname already exists in db
    static async doesNicknameExist(name) {
      const count = await Article.count({
        where: {
          nickname: name,
        },
      });
      return count > 0 ? true : false;
    }
    // generates unique nickname
    async generateUniqueNickname() {
      // replace spaces with underscores
      function format(str) {
        return str.toLowerCase().replace(/\s/g, '_');
      }
      const chance = new Chance();
      let nickname;
      // iterate until a unique nickname is generated
      do {
        // random word, last name, and animal
        const components = [
          chance.word(),
          chance.last(),
          chance.animal()
        ].map(comp => format(comp));
        nickname = components.join('_');
      } while(await Article.doesNicknameExist(nickname));
      return nickname;
    }
  }
  Article.init({
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    uniformResourceLocator: {
      type: Sequelize.TEXT,
      unique: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      defaultValue: 'temp',
    },
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'article',
    underscored: true,
  });
  // automatically add a unique nickname before creating record
  Article.beforeCreate((user) => {
    return (async function assignUniqueNickname() {
      user.nickname = await user.generateUniqueNickname();
    })();
  });
  // before saving if user nickname doesn't exist generate one
  Article.beforeSave((user) => {
    return (async function assignUniqueNickname() {
      if (!user.nickname) {
        user.nickname = await user.generateUniqueNickname();
      }
    })();
  });
  class Tag extends Sequelize.Model {}
  Tag.init({
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    keyword: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tag',
    underscored: true,
  });
  class ArticleTag extends Sequelize.Model {}
  ArticleTag.init({}, {
    sequelize,
    underscored: true,
    modelName: 'ArticleTag',
    tableName: 'article_tag',
  });
  // declare many-to-many relationship between Article and Tag models
  Article.belongsToMany(Tag, {through: ArticleTag});
  Tag.belongsToMany(Article, {through: ArticleTag});
  return {
    Article,
    Tag,
    ArticleTag,
  };
};
