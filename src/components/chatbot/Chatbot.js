import React from "react";
import { connect } from "react-redux";
import * as transactionsActions from "../../redux/actions/transactionsActions";
import * as userActions from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { ChatbotBody } from "./ChatbotBody";

const Chatbot = ({ ...props }) => {
  const { actions, user, transactions } = props;

  return (
    <ChatbotBody
      onRegister={actions.registerUser}
      response={user}
      onLogin={actions.loginUser}
      saveTransaction={actions.saveTransaction}
      getTransactions={actions.loadTransactions}
      transactions={transactions}
      updateCurrency={actions.updateCurrency}
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
      : state.transactions.data?.map((transaction) => {
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
      saveTransaction: bindActionCreators(
        transactionsActions.saveTransaction,
        dispatch
      ),
      loginUser: bindActionCreators(userActions.login, dispatch),
      registerUser: bindActionCreators(userActions.register, dispatch),
      updateCurrency: bindActionCreators(userActions.updateCurrency, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot); //calls function connect and then call another with the Courses Page
