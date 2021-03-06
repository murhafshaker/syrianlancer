let project_id;

function loadProject(id) {
	$.ajax({
		type: 'GET',
		url: 'src/Controllers/ProjectController.php',
		datatype: 'text',
		data: 'fid=2&id=' + id,
		success: function (response) {
			var JsonArray = $.parseJSON(response);
			if (JsonArray[0].deleted == 1)
				location.href = 'browse.php?';
			else {
				project_id = JsonArray[0].id;
				var project_category;
				if (JsonArray[0].category == 'programming') project_category = 'برمجة، تطوير المواقع والتطبيقات';
				else if (JsonArray[0].category == 'business') project_category = 'أعمال وخدمات استشارية وإدارية';
				else if (JsonArray[0].category == 'marketing') project_category = 'تسويق الكتروني ومبيعات';
				else if (JsonArray[0].category == 'training') project_category = 'تدريب، تعليم ومساعدة عن بعد';
				else if (JsonArray[0].category == 'language') project_category = 'كتابة، تحرير، ترجمة ولغات';
				else if (JsonArray[0].category == 'design') project_category = 'تصميم وأعمال فنية وإبداعية';
				else project_category = 'أمور أخرى';
				if (JsonArray[0].owner == 1) {
					$('#project-main-card').html(
						'<div class="row"><div class="col-10 d-flex mb-3"><img id="project-avatar" src="./assets/images/placeholder.png" class="project-avatar mb-auto mt-auto ml-4" onerror="this.src=\'./assets/images/placeholder.png\'"><h2 id="project-name" class="primary-dark mb-auto mt-auto"</h2></div><div class="col-2 pull-2 justify-content-center align-self-center">' + (JsonArray[0].completed == null ? '<button id="edit-project" class="btn btn-primary ripple pull-left mw-100 ml-1"><i class="fas fa-edit"></i></button>' : '') + '<button id="remove-project" class="btn btn-danger ripple pull-left mw-100"><i class="fas fa-trash"></i></button></div></div><div class="row"><h6 class="card-subtitle col-10 mb-2 ml-2 text-muted"><i class="fas fa-calendar-alt ml-1"></i><span id="created_at" class="ml-3"></span><i class="fas fa-user ml-1"></i><span id="owner-name" class="ml-3"></span><i class="fas fa-tags ml-1"></i><span id="project-category" class="ml-3"></span></h6></div>');
				} else {
					$('#project-main-card').html(
						'<div class="row"><div class="col-10 d-flex mb-3"><img id="project-avatar" src="./assets/images/placeholder.png" class="project-avatar mb-auto mt-auto ml-4" onerror="this.src=\'./assets/images/placeholder.png\'"><h2 id="project-name" class="primary-dark mb-auto mt-auto"</h2></div><div class="col-2 pull-2 justify-content-center align-self-center"><button id="report-project" class="btn btn-danger ripple pull-left"><i class="fas fa-flag"></i></button></div></div><div class="row"><h6 class="card-subtitle col-10 mb-2 ml-2 text-muted"><i class="fas fa-calendar-alt ml-1"></i><span id="created_at" class="ml-3"></span><i class="fas fa-user ml-1"></i><span id="owner-name" class="ml-3"></span><i class="fas fa-tags ml-1"></i><span id="project-category" class="ml-3"></span></h6></div>'
					);
				}
				$('#project-name').html(JsonArray[0].name);
				$('#owner-name').html(JsonArray[0].first_name + ' ' + JsonArray[0].last_name);
				$('#project-avatar').attr("src", JsonArray[0].userImage);
				var date = new Date(JsonArray[0].created_at);
				$('#created_at').html(getFormattedDate(date));
				$('#project-category').html(project_category);
				$('#low-balance').html(JsonArray[0].low_balance);
				$('#high-balance').html(JsonArray[0].high_balance);
				$('#duration').html(JsonArray[0].duration);
				var avg = JsonArray[0].offersAvg;
				if (avg == undefined) $('#offer-average').html('0');
				else $('#offer-average').html(avg);
				$('#offer-count').html(JsonArray[0].offersNum);
				$('#description').html(JsonArray[0].description);
				if (JsonArray[0].completed == 1) {
					$('#project-details-header').append('<div class="col-2 pull-2"><span class="badge badge-success pull-left mw-100">منتهي التنفيذ</span></div>')
				} else if (JsonArray[0].completed == 0) {
					$('#project-details-header').append('<div class="col-2 pull-2"><span class="badge badge-warning pull-left mw-100">قيد التنفيذ</span></div>')
				} else {
					$('#project-details-header').append('<div class="col-2 pull-2"><span class="badge badge-info pull-left mw-100">تقديم الطلبات</span></div>')
				}
				var created_at;
				for (var i = 1; i < JsonArray.length; i++) {
					date = new Date(JsonArray[i].created_at);
					created_at = getFormattedDate(date);
					var mainFocus;
					if (JsonArray[i].main_focus == 'programming') mainFocus = 'برمجة، تطوير المواقع والتطبيقات';
					else if (JsonArray[i].main_focus == 'business') mainFocus = 'أعمال وخدمات استشارية وإدارية';
					else if (JsonArray[i].main_focus == 'marketing') mainFocus = 'تسويق الكتروني ومبيعات';
					else if (JsonArray[i].main_focus == 'training') mainFocus = 'تدريب، تعليم ومساعدة عن بعد';
					else if (JsonArray[i].main_focus == 'language') mainFocus = 'كتابة، تحرير، ترجمة ولغات';
					else if (JsonArray[i].main_focus == 'design') mainFocus = 'تصميم وأعمال فنية وإبداعية';
					else mainFocus = 'أمور أخرى';
					if (JsonArray[0].owner == 1) {
						$('#offers-holder').append(
							'<div class="card-text"><div class="row"><div class="col-10 d-flex mb-3"><img src="' +
							JsonArray[i].userImage +
							'" class="offer-avatar mb-auto mt-auto ml-4"><h5 id="freelancer-' +
							i +
							'" class="primary-dark mb-auto mt-auto">' +
							JsonArray[i].first_name +
							' ' +
							JsonArray[i].last_name +
							'</h5></div><div class="col-2 pull-2 justify-content-center align-self-center">' +
							(JsonArray[0].completed == null ? '<button id="' +
								JsonArray[i].user_id +
								'"class="btn btn-primary ripple pull-left mw-100 choose-off"><i class="fas fa-check"></i></button>' : '') +
							'<button id="report' +
							i +
							'"class="btn btn-danger ripple pull-left"><i class="fas fa-flag"></i></button></div></div><h6 class="card-subtitle mb-2 ml-2 text-muted"><small id="created-at-' +
							i +
							'" class="ml-3"><i class="fas fa-calendar-alt ml-1"></i>' +
							created_at +
							'</small><small id="focus-' +
							i +
							'" class="ml-3"><i class="fas fa-tags ml-1"></i>' +
							mainFocus +
							'</small><small id="price-' +
							i +
							'" class="ml-3"><i class="fas fa-money-bill-wave ml-1"></i>' +
							JsonArray[i].price +
							'</small><small id="duration-' +
							i +
							'" class="ml-3"><i class="fas fa-calendar-day ml-1"></i>' +
							JsonArray[i].duration +
							'يوم</small></h6><p id="offer-text-' +
							i +
							'" class="card-text text-justify mt-5 mb-5">' +
							JsonArray[i].description +
							'</p><hr></div>'
						);
					} else {
						if (JsonArray[i].offer_own == 0) {
							$('#offers-holder').append(
								'<div class="card-text"><div class="row"><div class="col-10 d-flex mb-3"><img src="' +
								JsonArray[i].userImage +
								'" class="offer-avatar mb-auto mt-auto ml-4"><h5 id="freelancer-' +
								i +
								'" class="primary-dark mb-auto mt-auto">' +
								JsonArray[i].first_name +
								' ' +
								JsonArray[i].last_name +
								'</h5></div><div class="col-2 pull-2 justify-content-center align-self-center">' +
								'<button id="report' +
								i +
								'"class="btn btn-danger ripple pull-left"><i class="fas fa-flag"></i></button></div></div><h6 class="card-subtitle mb-2 ml-2 text-muted"><small id="created-at-' +
								i +
								'" class="ml-3"><i class="fas fa-calendar-alt ml-1"></i>' +
								created_at +
								'</small><small id="focus-' +
								i +
								'" class="ml-3"><i class="fas fa-tags ml-1"></i>' +
								mainFocus +
								'</small><small id="price-' +
								i +
								'" class="ml-3"><i class="fas fa-money-bill-wave ml-1"></i>' +
								JsonArray[i].price +
								'</small><small id="duration-' +
								i +
								'" class="ml-3"><i class="fas fa-calendar-day ml-1"></i>' +
								JsonArray[i].duration +
								'يوم</small></h6><p id="offer-text-' +
								i +
								'" class="card-text text-justify mt-5 mb-5">' +
								JsonArray[i].description +
								'</p><hr></div>'
							);
						} else {
							$('#offers-holder').append(
								'<div class="card-text"><div class="row"><div class="col-10 d-flex mb-3"><img src="' +
								JsonArray[i].userImage +
								'" class="offer-avatar mb-auto mt-auto ml-4"><h5 id="freelancer-' +
								i +
								'" class="primary-dark mb-auto mt-auto">' +
								JsonArray[i].first_name +
								' ' +
								JsonArray[i].last_name +
								'</h5></div><div class="col-2 pull-2 justify-content-center align-self-center">' +
								(JsonArray[0].completed == null ? '<button id="edit-offer" class="btn btn-primary ripple pull-left mw-100 ml-1"><i class="fas fa-edit"></i></button>' : '') + '<button id="remove-offer" class="btn btn-danger ripple pull-left"><i class="fas fa-trash"></i></button></div></div><h6 class="card-subtitle mb-2 ml-2 text-muted"><small id="created-at-' +
								i +
								'" class="ml-3"><i class="fas fa-calendar-alt ml-1"></i>' +
								created_at +
								'</small><small id="focus-' +
								i +
								'" class="ml-3"><i class="fas fa-tags ml-1"></i>' +
								mainFocus +
								'</small><small id="price-' +
								i +
								'" class="ml-3"><i class="fas fa-money-bill-wave ml-1"></i>' +
								JsonArray[i].price +
								'</small><small id="duration-' +
								i +
								'" class="ml-3"><i class="fas fa-calendar-day ml-1"></i>' +
								JsonArray[i].duration +
								'يوم</small></h6><p id="offer-text-' +
								i +
								'" class="card-text text-justify mt-5 mb-5">' +
								JsonArray[i].description +
								'</p><hr></div>'
							);
						}
					}
				}
				if (JsonArray.length == 0)
					$('#offers-holder').append('<h4 class="text-center font-weight-bold">لا يوجد اية عروض</h4>');
				if (JsonArray[0].owner == 1 || JsonArray[0].completed != null || JsonArray[0].archived == 1) $('#add-offer-card').remove();
				$('#cover').removeClass('invisible');
				$(function () {
					$('#edit-project').on('click', function () {
						location.href = 'edit_project.php?fid=4&id=' + project_id;
					});
				});
				$(function () {
					$('.choose-off').on('click', function () {
						let id = this.id;
						$('#confirm-offer').attr("value", id);
						$('#offerModal').modal('show');
					});
				});
				$(function () {
					$('#confirm-offer').on('click', function () {
						chooseOffer(this.value);
					});
				});
			}
		},
		error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert(msg);
		}
	});
}

function chooseOffer(user_id) {
	$.ajax({
		type: 'POST',
		url: 'src/Controllers/ProjectController.php',
		datatype: 'text',
		data: 'fid=6&id=' + project_id + "&user=" + user_id,
		success: function (response) {
			var JsonObj = $.parseJSON(response);
			location.href = 'chat.php?freelancer_projects=' + JsonObj.freelancer_projects_id;
		},
		error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			alert(msg);
		}
	});
}

function getFormattedDate(date) {
	var year = date.getFullYear();
	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;
	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;
	return year + '-' + month + '-' + day;
}

$(function () {
	$('#offer-price').on('change', function () {
		let price = $('#offer-price').val();
		$('#revenue').val(price * 0.1);
	});
});


$(function () {
	$('#add-offer').on('click', function () {
		$('#duration-error').html('');
		$('#price-error').html('');
		$('#text-error').html('');
		let duration = parseFloat($('#offer-duration').val());
		let price = parseFloat($('#offer-price').val());
		let offerText = $('#offer-details').val();
		let _duration = true;
		let _price = true;
		let _offerText = true;
		if (duration > $('#duration').html() || isNaN(duration)) {
			$('#duration-error').html('يجب على الفترة ان تكون اقل او تساوي المدة المحددة.');
			_duration = false;
		}

		if (price < $('#low-balance').html() || price > $('#high-balance').html() || isNaN(price)) {
			$('#price-error').html('يجب على المبلغ المحدد ان يكون ضمن نطاق الميزانية المحددة');
			_price = false;
		}

		if (offerText.trim().length < 80 || offerText.trim().length > 1500) {
			$('#text-error').html(' ويجب ان يكون طول النص غلى الأقل 80 محرف و 1500 على الأكثر.');
			_offerText = false;
		}

		if (!_price || !_duration || !_offerText) {
			$('#alert-div').html('<div class="alert alert-danger mb-5" role="alert">تأكد من المعلومات المدخلة.</div>');
		} else {
			$.ajax({
				type: 'GET',
				url: 'src/Controllers/ProjectController.php',
				datatype: 'text',
				data: 'fid=3&id=' + project_id + '&duration=' + duration + '&price=' + price + '&offerText=' + offerText,
				success: function (response) {
					var JsonObject = $.parseJSON(response);
					if (JsonObject.logged == 0) {
						$('#alert-div').html(
							'<div class="alert alert-danger mb-5" role="alert">يجب تسجيل الدخول لترك عرض.</div>'
						);
					} else {
						if (JsonObject.success == 1) {
							location.reload();
						} else if (JsonObject.success == 0) {
							$('#alert-div').html(
								'<div class="alert alert-danger mb-5" role="alert">لا يمكنك إضافة عرض اخر.</div>'
							);
						}
					}
				},
				error: function (jqXHR, exception) {
					var msg = '';
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested JSON parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					alert(msg);
				}
			});
		}
	});
});