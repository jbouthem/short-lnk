import ReactDom from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import '../imports/startup/simple-schema-configuration.js';

import { onAuthChange, routes} from '../imports/routes/routes.jsx';

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();

    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDom.render(routes(), document.getElementById('app'));
});
