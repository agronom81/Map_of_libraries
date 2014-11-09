$(function () {
	
	var r = Raphael('map', 790, 1000);
					
	//Границы района
	for (var bord in path_border) {	
		var objBord = r.path(path_border[bord].path);
		
		objBord.attr({
			stroke: '#797979',
			'stroke-width': 7.3,
      'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'stroke-miterlimit': 4,
			'stroke-opacity': 0.55,
			'stroke-dashoffset': 0
		});
	};
	
	//Дороги для автомобилей
	for (var road in path_road) {	
		var objRoad = r.path(path_road[road].path);
		
		objRoad.attr({
			stroke: "#f70808",
			'stroke-width': 1,
			'stroke-linejoin': 'round'
		});
		
		
	};
	
	//Условное обозначение дороги
	for (var roadColor in path_car) {	
		var objRoadColor = r.path(path_car[roadColor].path);
		
		objRoadColor.attr({
			fill: "#f70808",
			stroke: "#f70808",
			'stroke-width': 1,
			'stroke-linejoin': 'miter'
		});
	};
	
	r.text(560, 926, "- Дороги для автомобілів");
		
	//Железные дороги
	for (var train in path_train) {	
		var objTrain = r.path(path_train[train].path);
	
		objTrain.attr({
			stroke: '#674d4d',
			'stroke-width': 1,
      'stroke-linejoin': 'miter',
			'stroke-linecap': 'butt',
			display: 'inline',
			'stroke-opacity': 1
		});

	};
	
	//Условное обозначение железной дороги
	for (var iron in path_ironRoad) {	
		var objIron = r.path(path_ironRoad[iron].path);
		
		objIron.attr({
			fill: "#674d4d",
			stroke: "#674d4d",
			'stroke-width': 1,
			'stroke-linejoin': 'miter'
		});
	};
	
	r.text(527, 960, "- Залізна дорога");
	
	//Реки
	
			//Широкие
	for (var river in path_river_wide) {	
		var objRiverWide = r.path(path_river_wide[river].path);
	
		objRiverWide.attr({
			fill: '#2eade8',
			stroke: '#2eade8',
			'stroke-width': 1,
      'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'stroke-opacity': 1
		});
	};
	
			//Узкие
	for (var river in path_river_thin) {	
		var objRiverThin = r.path(path_river_thin[river].path);
	
		objRiverThin.attr({
			stroke: '#2eade8',
			'stroke-width': 1.3,
      'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'stroke-miterlimit': 4,
			'stroke-opacity': 1
		});
	};
	
	//Условное обозначение рек
	for (var waterColor in path_water) {	
		var objWater = r.path(path_water[waterColor].path);
		
		objWater.attr({
			fill: "#2eade8",
			stroke: "#2eade8",
			'stroke-width': 1,
			'stroke-linejoin': 'miter'
		});

	};
	
	r.text(493, 891, "- Вода");	
	
	//Зеленые насаждения(сады, рощи и т.д.)
	
	for (var tree in path_tree) {	
		var objTree = r.path(path_tree[tree].path);
	
		objTree.attr({
			fill: '#54a752',
			stroke: '#54a752',
			'stroke-width': 1,
      'stroke-linejoin': 'round',
			'stroke-linecap': 'round',
			'stroke-opacity': 1
		});
	};

	//Условное обозначение древестной растительности
	for (var treeColor in path_green) {	
		var objTreeColor = r.path(path_green[treeColor].path);
		
		objTreeColor.attr({
			fill: "#54a752",
			stroke: "#54a752",
			'stroke-width': 1,
			'stroke-linejoin': 'miter'
		});
	};
	
	r.text(540, 853, "- Лісові насадження");	
	
	//Фон верxний
	for (var bgr in path_bgr_up) {	
		var objBgrUp = r.path(path_bgr_up[bgr].path);
		
		objBgrUp.attr({
			fill: "#1f66f5",
			"fill-opacity": 0.2,
			stroke: "rgba(31, 102, 245, 0.01)",
			"stroke-width": 0.05
		});
	};
	
	//Фон нижний
	for (var bgr in path_bgr_bottom) {	
		var objBgrBottom = r.path(path_bgr_bottom[bgr].path);
		
		objBgrBottom.attr({
			fill: "#e8f108",
			"fill-opacity": 0.2,
			stroke: "rgba(232, 241, 8, 0.01)",
			"stroke-width": 0.05
		});
	};
	
	//Населенные пункты
	var attributes = {
            fill: '#efae2f',
            stroke: '#fff',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        },
			arr = new Array();
	
	for (var locality in villages) {
		
		var obj = r.path(villages[locality].path);
		
		obj.attr(attributes);
		
		arr[obj.id] = locality;
		
		obj.hover(function(){ 		//смена курсора при наведении на объект
			this.attr({
				cursor: 'pointer'
			});
		}, function(){
			this.attr({
				cursor: "auto"
			});
		});
		
		obj.hover(function(){			//смена цвета объекта под курсором
			this.animate({
				fill: '#1669AD'
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		})
		.click(function(e){				//появление окна с информацией
			document.location.hash = arr[this.id];
			
			var point = this.getBBox(0);
			
			$('#map').next('.point').remove();
			
			$('#map').after($('<div />').addClass('point'));
		
			$('.point')
			.html(villages[arr[this.id]].name)
			.prepend($('<a />').attr('href', '#').addClass('close').text('Закрыть'))
			.css({
				left: point.x+(point.width/2)-80,
				top: point.y+(point.height/2)-20
			})
			.fadeIn();
		});
		
		$('body').on('click','.point .close', function(){
			var t = $(this),
					parent = t.parent('.point');
			
			parent.fadeOut(function(){
				parent.remove();
			});
			return false;
		});
	};

	//Названия селений на карте
	r.text(580, 173, "Бармашове");
	r.text(44, 700, "Галицинове");
	r.text(445, 135, "Грейгове");
	r.text(348, 448, "Зелений Гай");
	r.text(294, 235, "Калинівка");
	r.text(141, 227, "Капустине");
	r.text(610, 330, "Квітневе");
	r.text(670, 285, "Комсомольське");
	r.text(442, 369, "Костянтинівка");
	r.text(334, 553, "Котляреве");
	r.text(95, 846, "Лимани");
	r.text(327, 660, "Луч");
	r.text(426, 686, "Мирне");
	r.text(369, 175, "Михайло-Ларине");
	r.text(158, 326, "Мішківка");
	r.text(150, 384, "Мішкове-Погорілове");
	r.text(459, 564, "Новогригорівка");
	r.text(498, 400, "Новомиколаївка");
	r.text(512, 348, "Новоселівка");
	r.text(658, 225, "Партизанське");
	r.text(558, 260, "Первомайське");
	r.text(257, 140, "Пересадівка");
	r.text(255, 422, "Полігон");
	r.text(191, 740, "Прибузьке");
	r.text(162, 555, "Миколаїв");
	r.text(239, 659, "Українка");
	r.text(285, 590, "Шевченкове");
	r.text(305, 325, "Воскресенськ");
	
	//Условные обозначения селений
	for (var liveColor in path_live) {	
		var objLiveColor = r.path(path_live[liveColor].path);
		
		objLiveColor.attr({
			fill: "#efae2f",
			stroke: "#efae2f",
			'stroke-width': 1,
			'stroke-linejoin': 'miter'
		});
	};
	
	r.text(540, 820, "- Населенні пункти");
		
});