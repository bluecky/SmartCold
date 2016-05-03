/**
 * Created by sunqiunian on 16/3/3.
 */
coldWeb.controller('compressorBlower', function ($scope, $location, $stateParams,$http) {
    console.log($stateParams.userId);
    $scope.coldCnt = 0;
    $scope.defrostCnt = 0;
    $scope.freeCnt = 0;
    $scope.load = function () {
        $http.get('/i/compressorBlower/findByUserId', {
            params: {
                "userId": $stateParams.userId
            }
        }).success(function (result) {
            console.log("result:" + result);
            $scope.blowers = result;
            for (var i = 0; i < result.length; i++) {
                console.log("result:" + result[i].coldStorageId + ",blowerId: " + result[i].blowerId + ",coldStorageName: " + result[i].coldStorageName );
                if (parseInt(result[i].state) === 0){
                    $scope.coldCnt = $scope.coldCnt + 1;
                }
                if (parseInt(result[i].state) === 1){
                    $scope.defrostCnt = $scope.defrostCnt + 1;
                }
                if (parseInt(result[i].state) === 2){
                    $scope.freeCnt = $scope.freeCnt + 1;
                }
            }
        })
    }
    $scope.load();

    clearInterval(timeTicket);
    var timeTicket = setInterval(function () {
        $scope.load();
    }, 5000);
});
