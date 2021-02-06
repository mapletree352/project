app.service("ReportService", function (Restangular) {
	//implementation
	this.exportAdhocReport = function(dto, module) {
        return Restangular.all("report/exportAdhocReport/" + module).withHttpConfig({ responseType:'arraybuffer' }).post(dto);
	};
});
