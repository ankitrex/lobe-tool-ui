function runValidations(){

	if(localStorage.getItem("accessToken")===null || localStorage.getItem("refreshToken")===null){
		console.log("token not found")
		window.location.replace("signup.html");
	}
	var resp = validateUser();
	if(resp==undefined){
		tokenRefresh();
		resp = validateUser();
	}
	if(resp==undefined){
		console.log("invalid tokens")
		window.location.replace("signup.html");
	}
	else{
		return resp.data;
	}
}

function validateUser() {
	var accessToken = localStorage.getItem("accessToken");
	var resp;
	$.ajax({
		type: 'GET',
		async: false,
		url: 'http://localhost:8080/api/user/profile',
		dataType: 'json',
		headers : {
			'Authorization': 'Bearer '+accessToken,
		},
		success: function(response){
			resp=response;
		},
		error: function(error){
			console.log(error);
		}
	});
	return resp;
}

function tokenRefresh() {
	var refreshToken = localStorage.getItem("refreshToken");
	$.ajax({
		type: 'GET',
		async: false,
		url: 'http://localhost:8080/api/user/token-refresh',
		dataType: 'json',
		headers : {
			'Authorization': 'Bearer '+refreshToken,
		},
		success: function(response){
			localStorage.setItem("accessToken", response.accessToken)
		},
		error: function(error){
			//redirect to login page if issue with refresh token
			console.log(error);
			window.location.replace("signup.html");
		}
	});
}
