// Utils to send requests to the 500px API endpoint

import request from "superagent";
import { assign } from "lodash";
import _ from "underscore";

import mysql from 'mysql';

import config from "../config";

const debug = require("debug")("isomorphic500");

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'partisk'
});

const APIUtils = {

  get(endpoint, query, { locale }, done) {
    if (arguments.length === 2) {
      done = query;
      query = {};
    }

    const url = `${config.apiRoot}${endpoint}`;

    debug("Sending GET request to %s", url, query);

    // Consumer key is required by 500px API
    query = assign(query, {
      consumer_key: config.consumerKey
    });

    request.get(url)
      .set("accept-language", locale)
      .query(query)
      .end((err, res) => {
        debug("Received response %s from %s", res && res.status, url);

        if (err) {
          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status;
          }

          return done(err);
        }

        done(null, res.body);
      });
  },

  getParties(query, { locale }, done) {
    connection.query('SELECT * from parties where deleted=false', function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows)));
      }, 10);
    });
  },

  getParty(name, { locale }, done) {
    connection.query('SELECT * from parties where name = ? and deleted=false', [name], function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows))[0]);
      }, 10);
    });
  },

  getQuestions(query, { locale }, done) {
    connection.query('SELECT * from questions where approved=true and deleted=false', function(questionErr, questionRows) {
      if (questionErr) throw questionErr;

      var questions = JSON.parse(JSON.stringify(questionRows));

      connection.query('SELECT tag_id, question_id from question_tags', function(tagErr, tagRows) {
        if (tagErr) throw tagsErr;

        var question_tags = _.groupBy(JSON.parse(JSON.stringify(tagRows)), function (row) {
          return row.question_id;
        });

        _.each(questions, function (question) {
          question.tagIds = _.map(question_tags[question.id], function (questionTag) {
              return questionTag.tag_id;
          });
        });

        setTimeout(function () {
          done(null, questions);
        }, 10);
      });
    });
  },

  getQuestion(title, { locale }, done) {
    connection.query('SELECT * from questions where title = ? and deleted=false', [title], function(err, rows, fields) {
      if (err) throw err;

      var question = JSON.parse(JSON.stringify(rows))[0];

      connection.query('SELECT tag_id from question_tags where question_id = ?', [question.id], function(tagErr, tagRows) {
        if (tagErr) throw tagsErr;

        question.tagIds = _.map(JSON.parse(JSON.stringify(tagRows)), function (questionTag) {
            return questionTag.tag_id;
        });

        setTimeout(function () {
          done(null, question);
        }, 10);
      });
    });
  },

  getAnswers(query, { locale }, done) {
    connection.query('SELECT * from answers where approved=true and deleted=false', function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows)));
      }, 10);
    });
  },

  getAnswer(questionId, partyId, { locale }, done) {
    connection.query('SELECT * from answers where question_id = ? and party_id = ? and deleted=false', [questionId, partyId], function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows))[0]);
      }, 10);
    });
  },

  getQuizzes(query, { locale }, done) {
    connection.query('SELECT * from quizzes where approved=true and deleted=false', function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows)));
      }, 10);
    });
  },

  getQuiz(name, { locale }, done) {
    connection.query('SELECT * from quizzes where name = ? where approved=true and deleted=false', [name], function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows))[0]);
      }, 10);
    });
  },

  getUsers(query, { locale }, done) {
    connection.query('SELECT * from users where approved=true and deleted=false', function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows)));
      }, 10);
    });
  },

  getUser(name, { locale }, done) {
    connection.query('SELECT * from users where name = ? approved=true and deleted=false', [name], function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows))[0]);
      }, 10);
    });
  },

  getTags(query, { locale }, done) {
    connection.query('SELECT * from tags where deleted=false', function(err, tagRows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(tagRows)));
      }, 10);
    });
  },

  getTag(name, { locale }, done) {
    console.log(name);
    connection.query('SELECT * from tags where name = ? and deleted=false', [name], function(err, rows, fields) {
      if (err) throw err;

      setTimeout(function () {
        done(null, JSON.parse(JSON.stringify(rows))[0]);
      }, 10);
    });
  }
};

export default APIUtils;
