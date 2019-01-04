import { Meteor } from 'meteor/meteor';
import { Mongo  } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
  Meteor.publish('links', function() {
    const userId = this.userId;
    if (userId) {
      return Links.find({userId});
    } else {
      return undefined;
    }
  });
}

Meteor.methods({
  'links.insert'(url) {
    const _id = shortid.generate()
    const userId = this.userId;
    const visible = true;

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({url});

    if (!userId) {
      throw new Meteor.Error('Not authorized');
    }

    Links.insert({
      _id,
      url,
      userId,
      visible,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    new SimpleSchema({
      _id: { type: String, min: 1 },
      visible: { type: Boolean }
    }).validate({_id, visible});

    Links.update({_id, userId: this.userId}, {$set: {visible}});
  },

  'links.trackVisit'(_id) {
    new SimpleSchema(
      {
        _id: { type: String, min: 1 }
      }).validate({ _id });

    Links.update(
      { _id },
      {
        $set: {lastVisitedAt: new Date().getTime()},
        $inc: {visitedCount: 1}
      }
    );
  }
});
