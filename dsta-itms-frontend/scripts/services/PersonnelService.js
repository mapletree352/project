app.service("PersonnelService", function (Restangular) {
	
	this.searchPersonnels = function(searchDTO) {
        return Restangular.one("personnel/searchPersonnels").get(searchDTO);
	};
	
	this.exportPersonnels = function(searchDTO) {
        return Restangular.one("personnel/exportPersonnels").withHttpConfig({ responseType:'arraybuffer' }).get(searchDTO);
	};
	
	this.getPersonnel = function(nricNo) {
		return Restangular.one("personnel/getPersonnel/" + nricNo).get();
	};
});
