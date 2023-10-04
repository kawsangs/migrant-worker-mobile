const surveyLogicUtil = (() => {
  return {
    getMatchAnyQuery,
    getMatchAllQuery,
  }

  function getMatchAnyQuery(answer, responseValue) {
    let query = '';
    const answers = answer.split(',');
    for (let i = 0; i < answers.length; i++) {
      const index = responseValue.indexOf(answers[i]);
      query = !!answers[i] ? `${index > -1 ? 'true' : 'false'}` : 'false';
      if (index > -1)
        break;
    }
    return query;
  }

  function getMatchAllQuery(answer, responseValue) {
    let query = '';
    const responseValues = responseValue.split(',');
    for (let i = 0; i < responseValues.length; i++) {
      query += answer.indexOf(responseValues[i]) > -1 ? 'true' : 'false';
      if (i < responseValues.length - 1)
        query += ' && ';
    }
    return query;
  }
})();

export default surveyLogicUtil;