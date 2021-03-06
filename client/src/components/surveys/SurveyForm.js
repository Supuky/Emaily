// SurveyForm shows a from for a user to add input
import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {Link} from 'react-router-dom';
import SurveyField from "./SurveyField";
import validateEmails from '../../util/validateEmails';
import formFileds from './formFields';


class SurveyForm extends Component {
  renderFields() {
      return _.map(formFileds, ({label, name}) => {
        return (
          <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        );
      })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
          Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
                NEXT
              <i className="material-icons right">done</i>
            </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFileds, ({name}) => {
        if(!values[name]) {
           errors[name] = 'You must provide a value'
        }
    });

    return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
