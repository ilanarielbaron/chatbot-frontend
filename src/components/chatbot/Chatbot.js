import React from "react";
import { connect } from "react-redux";
import * as transactionsActions from "../../redux/actions/transactionsActions";
import * as userActions from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { ChatbotBody } from "./ChatbotBody";

const Chatbot = ({ ...props }) => {
  const { actions, user, loading } = props;

  function handleRegister(userData) {
    return actions
      .registerUser(userData)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error;
      });
  }

  function handleLogin(userData) {
    return actions
      .loginUser(userData)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <ChatbotBody
      onRegister={handleRegister}
      response={user}
      onLogin={handleLogin}
      loading={loading}
    />
  );
};

Chatbot.propTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
  transactions: PropTypes.array,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    transactions: !state.user
      ? []
      : state.transactions.map((transaction) => {
          return {
            ...transaction,
            user: state.user.name,
          };
        }),
    user: state.user,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTransactions: bindActionCreators(
        transactionsActions.loadTransactions,
        dispatch
      ),
      saveCourse: bindActionCreators(
        transactionsActions.saveTransaction,
        dispatch
      ),
      loginUser: bindActionCreators(userActions.login, dispatch),
      registerUser: bindActionCreators(userActions.register, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot); //calls function connect and then call another with the Courses Page
