angular.module('lozQuiz').controller('mainCtrl', function ($scope, $http, $sce) {

  $scope.score = 0;
  $scope.activeQuestion = -1;
  $scope.activeQuestionAnswered = 0;
  $scope.percentage = 0;

  $http.get('quiz_data.json').then(function (quizData) {
    $scope.myQuestions = quizData.data;
    $scope.totalQuestions = $scope.myQuestions.length;
  });

  $scope.selectAnswer = function (qIndex, aIndex) {
    var questionState = $scope.myQuestions[qIndex].questionState;

    if (questionState != 'answered') {
      $scope.myQuestions[qIndex].selectedAnswer = aIndex;
      var correctAnswer = $scope.myQuestions[qIndex].correct;
      $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

      if (aIndex === correctAnswer) {
        $scope.myQuestions[qIndex].correctness = 'correct';
        $scope.score += 1;
      }else{
        $scope.myQuestions[qIndex].correctness = 'incorrect';
      };

    $scope.myQuestions[qIndex].questionState = 'answered';

    };

    $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
  };

  $scope.isSelected = function (qIndex, aIndex) {
    return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
  }

  $scope.isCorrect = function (qIndex, aIndex) {
    return $scope.myQuestions[qIndex].correctAnswer === aIndex;
  }

  $scope.selectContinue = function () {
    return $scope.activeQuestion += 1;
  }

  $scope.createShareLinks = function (percentage) {

    var url = 'https://toastertom.github.io/loz-quiz/index.html';

    var emailLink = '<a class="btn email" href="mailto:?subject= Legend Of Zelda Knowledge Test!&amp;body=I scored '+percentage+' percent on this Legend Of Zelda Ocarina Of Time quiz. See if you can beat my score! Take the quiz at '+url+' ">E-mail a friend</a>';

    var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text= I scored '+percentage+' percent on this Legend Of Zelda Ocarina Of Time quiz. Try to beat my score at&amp;hashtags=lozquiz&url='+url+'">Tweet your score</a>';

    var newMarkup = emailLink + twitterLink;

    return $sce.trustAsHtml(newMarkup);
  }


});
