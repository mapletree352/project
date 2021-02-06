app.filter('defaultDate', function ($filter) {
    var filter = $filter('date');
    return function (value) {
        return filter(value, 'dd MMM yyyy');
    }
});
app.filter('digitDate', function ($filter) {
    var filter = $filter('date');
    return function (value) {
        return filter(value, 'dd.MM.yyyy');
    }
});
app.filter('dashDate', function ($filter) {
    var filter = $filter('date');
    return function (value) {
        return filter(value, 'dd-MM-yyyy');
    }
});
app.filter('amount', function ($filter) {
    var filter = $filter('number');
    return function (value) {
        return filter(value, 2);
    }
});
app.filter('capitalize', function () {
    return function (input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});
app.filter('roundup', function () {
	return function (value) {
		return Math.ceil(value);
	};
})
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};