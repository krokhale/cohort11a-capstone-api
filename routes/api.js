var express = require('express');
var router = express.Router();
const {Category, Question, Answer} = require('../lib/models');

// List out the questions for a particular category

// GET /api/v1/categories
// GET /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions
// POST /api/v1/categories/:categoryId/questions/:questionId/answers
// GET /api/v1/categories/:categoryId/questions/:questionId/answers

router.get(
    '/profile',
    (req, res, next) => {
        console.log('req.user is', req.user);
        // write code like find the user where the email id is this

        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            token: req.query.secret_token
        })
    }
);

router.get('/categories', async function(req, res, next) {
    console.log('req.user is', req.user);
    // write code like find the user where the email id is this
    // if user exists, find all categories/questions that belong to a user, Question.findAll({where: userId: user.id});

    let categories = await Category.findAll({});
    res.json(categories);
});

router.post('/categories/:categoryId/questions', async function(req, res, next) {
    let body = req.body;
    body.categoryId = req.params.categoryId;
    let question = await Question.create(body);
    res.json(question);
});

router.get('/categories/:categoryId/questions', async function(req, res, next) {
    let questions = await Question.findAll({where: {categoryId: req.params.categoryId}, include: [{model: Answer}]});
    res.json(questions);
});

router.post('/categories/:categoryId/questions/:questionId/answers', async function(req, res, next) {
    let body = req.body;
    body.questionId = req.params.questionId;
    let answer = await Answer.create(body);
    res.json(answer);
});

router.get('/categories/:categoryId/questions/:questionId/answers', async function(req, res, next) {
    let answers = await Answer.findAll({where: {questionId: req.params.questionId}});
    res.json(answers);
});

module.exports = router;
