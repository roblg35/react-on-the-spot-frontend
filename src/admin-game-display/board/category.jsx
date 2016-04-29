import React, { Component } from 'react';
import { Link } from 'react-router';
import Question from './question'

class Category extends Component {
  constructor(props) {
    super(props);
    // this.selectQuestion = this.selectQuestion.bind(this)
    this.state = {
      selectedQuestion: ''
    }
  }

selectQuestion(questionID) {
  localStorage.setItem('currentQuestion', '');
    this.props.questions.filter(function (el) {
      if (el.id == questionID) {
      return localStorage.setItem('currentQuestion', el.question);  
      }
    });
}

  render() {

    let categories;
    let columnHeader;
    let questions;
    let question;

    if (this.props.categories && this.props.questions) {

      var result = this.props.questions.reduce(function (acc, question) {
        if ( acc[question.category_name] ) {
          acc[question.category_name].push(question);
          acc[question.category_name].sort(function (a, b) {
            return a.points - b.points;
          });
        } else {
          acc[question.category_name] = [question];
        }

        return acc;
      }, {});


      categories = Object.keys(result);

      columnHeader = categories.map(function (el) {
        for (var i in result) {
          if (i === el) {
            questions = result[i].map(function (el) {
              return <div id={el.id} className="question"
                          key={el.id}
                          onClick={event => this.selectQuestion(event.target.getAttribute('id'))}
                          >
                          {el.points}</div>
            }, this);
          }
        }
         return <div className="category" key={el}><strong className="category-name">{el}</strong> {questions}</div>
       }, this);
    }

    return (
      <div className="categories-and-questions">
          {columnHeader}
          <Question
          questions={this.props.questions}
          />
      </div>
    )
  }

}

export default Category;
