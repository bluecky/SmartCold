coldWeb.controller('review', function ($rootScope, $scope, $state, $cookies, $http,Upload,$stateParams,$location) {
	$scope.load = function(){
		$scope.rdcid = $stateParams.rdcID;
		$http.get('/i/rdc/findRDCByRDCId?rdcID=' + $stateParams.rdcID).success(function(data,status,config,headers){
			$scope.rdc = data[0];
			$http.get('/i/user/findUser').success(function(data,status,config,headers){
				$rootScope.user = data;
				if($rootScope.user == null || $rootScope.user.id == 0){
					url = "http://" + $location.host() + ":" + $location.port() + "/login.html#/coldStorage/" + $scope.rdcid + "/review";
					window.location.href = url;
				}
			})
		})
		$http.get('/i/comment/findCommentsByRDCId?rdcID=' + $scope.rdcid + "&npoint=1").success(function(data,status,config,headers){
			$scope.lastComment = data.length == 1? data[0] : {};
		})
		$scope.files;
		
		$scope.max = 5;
		$scope.starsNum = 5;
		$scope.ratingVal = [];
		$scope.totalfiles = [];
	}
	$scope.onClick = function(i,val){
		$scope.ratingVal[i] = val;
	};
	
	$scope.addFiles = function (files) {
		if($scope.totalfiles.length + files.length > 5){
			alert("最多上传五张图片");
			return;
		}
		$scope.totalfiles = $scope.totalfiles.concat(files);
	}
	
	$scope.drop = function(file){
		angular.forEach($scope.totalfiles,function(item){
			if(item == file){
			    $scope.totalfiles.pop(item);
			}
		})
	}
	
	
	$scope.submit = function(){
		data = {
				file0: null,
				file1: null,
				file2: null,
				file3: null,
				file4: null,
				rdcID : $scope.rdcid,
				content : encodeURI($scope.content,"UTF-8"),
				grade : $scope.ratingVal[0],
				locationGrade : $scope.ratingVal[1],
				facilityGrade : $scope.ratingVal[2],
				serviceGrade : $scope.ratingVal[3],
				sanitaryGrade : $scope.ratingVal[4],
		}
		for(i = 0; i < $scope.totalfiles.length; i++){
			data["file" + i] = $scope.files[i];
		}
		
//		$http({
//			url : '/i/review/add',
//			method: "POST",
//			data:data,
//			headers: {'Content-Type': undefined},
//			transformRequest:function (data) {
//	            var formData = new FormData();
//	            formData.append("rdcID", data.rdcID);
//	            formData.append("content", data.content);
//	            formData.append("grade", data.grade);
//	            formData.append("locationGrade", data.locationGrade);
//	            formData.append("facilityGrade", data.facilityGrade);
//	            formData.append("serviceGrade", data.serviceGrade);
//	            formData.append("sanitaryGrade", data.sanitaryGrade);
//	            formData.append("files", data.files);
//	            console.log(formData.get("rdcID"));
//	            return formData;
//	            }
//		}).success(function(data,status,config,headers){
//			
//		})
		
		Upload.upload({
            url: '/i/review/add',
            headers :{ 'Content-Transfer-Encoding': 'utf-8' },
            data: data
        }).then(function (resp) {
            alert("评价成功");
            $location.path("/coldStorageComment/" + $scope.rdcid);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.name);
        });
	}
	$scope.load();
})