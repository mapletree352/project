var routes = [
    {
        name: 'dashboard',
        url: '/dashboard',
        templateUrl: 'views/dashboard/dashboard.html',
		controller: 'DashboardController'
	}, {
		name: 'loading',
		url: '/loading',
		templateUrl: 'views/dashboard/loading.html',
		controller: ''
	}, {
		name: 'indent',
		url: '/indent/:indentNo',
		templateUrl: 'views/indent/indent.html',
		controller: 'IndentController'
	}, {
		name: 'indent new',
		url: '/indent_new',
		templateUrl: 'views/indent/indent_new.html',
		controller: 'IndentCreateController'
	}, {
		name: 'indents',
		url: '/indents',
		templateUrl: 'views/indent/indent_search.html',
		controller: 'IndentSearchController'
	}, {
		name: 'indents recommendation',
		url: '/indents/recommend',
		templateUrl: 'views/indent/indent_recommendation.html',
		controller: 'IndentRecommendationController'
	}, {
		name: 'indents approval',
		url: '/indents/approve',
		templateUrl: 'views/indent/indent_approval.html',
		controller: 'IndentApprovalController'
	}, {
		name: 'indent acceptance',
		url: '/indents/accept',
		templateUrl: 'views/indent/indent_acceptance.html',
		controller: 'IndentAcceptanceController'
	}, {
		name: 'indent multi hub acceptance',
		url: '/indents/accept_multi',
		templateUrl: 'views/indent/indent_acceptance_multi.html',
		controller: 'IndentMultiAcceptanceController'
	}, {
		name: 'indent confirmation',
		url: '/indents/confirm',
		templateUrl: 'views/indent/indent_confirmation.html',
		controller: 'IndentConfirmationController'
	}, {
		name: 'indent mtmaint confirmation',
		url: '/indents/mtmaintconfirm',
		templateUrl: 'views/indent/indent_mtmaintenance_confirmation.html',
		controller: 'IndentMtmaintConfirmationController'
	},{
		name: 'indent central vote approval',
		url: '/indents/cvapprove',
		templateUrl: 'views/indent/indent_cv_approval.html',
		controller: 'IndentCentralVoteApprovalController'
	}, {
		name: 'indents status',
		url: '/indents/:statusCodes',
		templateUrl: 'views/indent/indent_search.html',
		controller: 'IndentSearchController'
	}, {
		name: 'manage template',
		url: '/templates',
		templateUrl: 'views/indent/template_search.html',
		controller: 'ManageTemplateController'
	}, {
		name: 'credit refund approval',
		url: '/tasks/refundapprove',
		templateUrl: 'views/task/credit_refund_approval.html',
		controller: 'CreditRefundApprovalController'
	}, {
		name: 'tasks',
		url: '/tasks',
		templateUrl: 'views/task/task_search.html',
		controller: 'TaskSearchController'
	}, {
		name: 'tasks status',
		url: '/tasks/:statusCode',
		templateUrl: 'views/task/task_search.html',
		controller: 'TaskSearchController'
	}, {
		name: 'task',
		url: '/task/:taskId',
		templateUrl: 'views/task/task.html',
		controller: 'TaskController'
	}, {
		name: 'personnels',
		url: '/personnels',
		templateUrl: 'views/resource/personnel_search.html',
		controller: 'PersonnelSearchController'
	}, {
		name: 'personnel',
		url: '/personnel/:nricNo',
		templateUrl: 'views/resource/personnel.html',
		controller: 'PersonnelController'
	}, {
		name: 'drivers',
		url: '/drivers',
		templateUrl: 'views/resource/driver_search.html',
		controller: 'DriverSearchController'
	}, {
		name: 'driver',
		url: '/driver/:nricNo',
		templateUrl: 'views/resource/driver.html',
		controller: 'DriverController'
	}, {
		name: 'driver availability',
		url: '/driver_avail',
		templateUrl: 'views/resource/driver_avail.html',
		controller: 'DriverAvailController'
	}, {
		name: 'driver attachment endorsement',
		url: '/driver_attachment_endorsement',
		templateUrl: 'views/resource/driver_attachment_endorsement.html',
		controller: 'DriverAttachmentEndorsementController'
	}, {
		name: 'driver attachment approval',
		url: '/driver_attachment_approval',
		templateUrl: 'views/resource/driver_attachment_approval.html',
		controller: 'DriverAttachmentApprovalController'
	}, {
		name: 'driver skill approval',
		url: '/driver_skill_approval',
		templateUrl: 'views/resource/driver_skill_approval.html',
		controller: 'DriverSkillApprovalController'
	}, {
		name: 'driver reward verification',
		url: '/driver_reward_verification',
		templateUrl: 'views/resource/driver_reward_verification.html',
		controller: 'DriverRewardVerificationController'
	}, {
		name: 'driver reward recommendation',
		url: '/driver_reward_recommendation',
		templateUrl: 'views/resource/driver_reward_recommendation.html',
		controller: 'DriverRewardRecommendationController'
	}, {
		name: 'driver reward approval',
		url: '/driver_reward_approval',
		templateUrl: 'views/resource/driver_reward_approval.html',
		controller: 'DriverRewardApprovalController'
	}, {
		name: 'vehicles',
		url: '/vehicles',
		templateUrl: 'views/resource/vehicle_search.html',
		controller: 'VehicleSearchController'
	}, {
		name: 'vehicle',
		url: '/vehicle/:vehicleNo',
		templateUrl: 'views/resource/vehicle.html',
		controller: 'VehicleController'
	}, {
		name: 'vehicle types',
		url: '/vehicle_types',
		templateUrl: 'views/resource/vehicle_type_search.html',
		controller: 'VehicleTypeSearchController'
	}, {
		name: 'vehicle type',
		url: '/vehicle_type/:vehicleTypeId',
		templateUrl: 'views/resource/vehicle_type.html',
		controller: 'VehicleTypeController'
	}, {
		name: 'vehicle avail',
		url: '/vehicle_avail',
		templateUrl: 'views/resource/vehicle_avail.html',
		controller: 'VehicleAvailController'
	}, {
		name: 'transport leader account search',
		url: '/transport_leader_account_search',
		templateUrl: 'views/resource/transport_leader_account_search.html',
		controller: 'TlAccountSearchController'
	}, {
		name: 'transport leader account',
		url: '/transport_leader_account/:id',
		templateUrl: 'views/resource/transport_leader_account.html',
		controller: 'TlAccountController'
	}, {
		name: 'transport leader account new',
		url: '/transport_leader_account_new',
		templateUrl: 'views/resource/transport_leader_account_new.html',
		controller: 'TlAccountNewController'
	}, {
		name: 'vehicle loan endorsement',
		url: '/vehicle_loan_endorsement',
		templateUrl: 'views/resource/vehicle_loan_endorsement.html',
		controller: 'VehicleLoanEndorsementController'
	}, {
		name: 'vehicle loan approval',
		url: '/vehicle_loan_approval',
		templateUrl: 'views/resource/vehicle_loan_approval.html',
		controller: 'VehicleLoanApprovalController'
	}, {
		name: 'Credit Return',
		url: '/credit/credit_return',
		templateUrl: 'views/credit/credit_return.html',
		controller: 'CreditReturnController'
	}, {
		name: 'Credit Allocation/Transfer HQ',
		url: '/credit/credit_allocation_hq',
		templateUrl: 'views/credit/credit_allocation_hq.html',
		controller: 'CreditAllocationHqController'
	}, {
		name: 'Credit Allocation/Transfer Fmn',
		url: '/credit/credit_allocation_div_fmn',
		templateUrl: 'views/credit/credit_allocation_div_fmn.html',
		controller: 'CreditAllocationDivFmnController'
	}, {
		name: 'Credit Status',
		url: '/credit/credit_status',
		templateUrl: 'views/credit/credit_status.html',
		controller: 'CreditStatusSearchController'
	}, {
		name: 'Credit Movement',
		url: '/credit/credit_movement/:unitCode/:unit/:workYear',
		templateUrl: 'views/credit/credit_movement.html',
		controller: 'CreditTxnSearchController'
	}, {
		name: 'driver permits',
		url: '/driver_permits',
		templateUrl: 'views/permit/driver_permit_search.html',
		controller: 'DriverPermitSearchController'
	}, {
		name: 'driver permit',
		url: '/driver_permit/:driverPermitId/:driverNricNo',
		templateUrl: 'views/permit/driver_permit.html',
		controller: 'DriverPermitController'
	}, {
		name: 'driver permit new',
		url: '/driver_permit_new',
		templateUrl: 'views/permit/driver_permit_new.html',
		controller: 'DriverPermitNewController'
	}, {
		name: 'cdlcs',
		url: '/cdlcs',
		templateUrl: 'views/permit/cdlc_search.html',
		controller: 'CdlcSearchController'
	}, {
		name: 'cdlc',
		url: '/cdlc/:id',
		templateUrl: 'views/permit/cdlc.html',
		controller: 'CdlcViewController'
	}, {
		name: 'cdlc new',
		url: '/cdlc_new',
		templateUrl: 'views/permit/cdlc_new.html',
		controller: 'CdlcController'
	}, {
		name: 'cdlc approval',
		url: '/cdlc_approval',
		templateUrl: 'views/permit/cdlc_approval.html',
		controller: 'CdlcApprovalController'
	}, {
		name: 'Cdlc Conversion Master Data',
		url: '/cdlcmasterdata',
		templateUrl: 'views/permit/cdlc_master_data.html',
		controller: 'CdlcMasterDataController'
	},
	{
		name: 'accidents',
		url: '/accidents',
		templateUrl: 'views/safety/accident_search.html',
		controller: 'AccidentSearchController'
	},  {
		name: 'accident_update',
		url: '/accident_update/:id',
		templateUrl: 'views/safety/accident_update.html',
		controller: 'AccidentUpdateController'
	},{
		name: 'accident',
		url: '/accident',
		templateUrl: 'views/safety/accident.html',
		controller: 'AccidentController'
	}, , {
		name: 'accident_master_data',
		url: '/accidentmasterdata',
		templateUrl: 'views/safety/accident_master_data.html',
		controller: 'AccidentMasterDataController'
	},{	
		name: 'driver offences',
		url: '/driver_offences',
		templateUrl: 'views/safety/driver_offence_search.html',
		controller: 'DriverOffenceSearchController'
	}, {
		name: 'driver offence',
		url: '/driver_offence/:driverOffenceId',
		templateUrl: 'views/safety/driver_offence.html',
		controller: 'DriverOffenceController'
	}, {
		name: 'driver offence new',
		url: '/driver_offence_new',
		templateUrl: 'views/safety/driver_offence_new.html',
		controller: 'DriverOffenceNewController'
	}, {
		name: 'driver offence approval',
		url: '/driver_offence_approval',
		templateUrl: 'views/safety/driver_offence_approval.html',
		controller: 'DriverOffenceApprovalController'
	}, {
		name: 'driver reductions',
		url: '/driver_reductions',
		templateUrl: 'views/safety/driver_reduction_search.html',
		controller: 'DriverReductionSearchController'
	}, {
		name: 'driver reduction',
		url: '/driver_reduction/:driverDemeritPointsId',
		templateUrl: 'views/safety/driver_reduction.html',
		controller: 'DriverReductionController'
	}, {
		name: 'driver reduction new',
		url: '/driver_reduction_new',
		templateUrl: 'views/safety/driver_reduction_new.html',
		controller: 'DriverReductionNewController'
	}, {
		name: 'driver reduction approval',
		url: '/driver_reduction_approval',
		templateUrl: 'views/safety/driver_reduction_approval.html',
		controller: 'DriverReductionApprovalController'
	}, {
		name: 'detail sheet',
		url: '/report/detailsheet',
		templateUrl: 'views/report/detail_sheet.html',
		controller: 'DetailSheetController'
	}, {
		name: 'all orders',
		url: '/report/all_orders',
		templateUrl: 'views/report/all_orders.html',
		controller: 'AllOrdersController'
	}, {
		name: 'user accounts report',
		url: '/report/user_accounts_report',
		templateUrl: 'views/report/user_accounts_report.html',
		controller: 'UserAccountsReportController'
	}, {
		name: 'task fulfilment report',
		url: '/report/task_fulfilment_report',
		templateUrl: 'views/report/task_fulfilment_report.html',
		controller: 'TaskFulfilmentReportController'
	}, {
		name: 'supported purposes report',
		url: '/report/supported_purposes_report',
		templateUrl: 'views/report/supported_purposes_report.html',
		controller: 'SupportedPurposesReportController'
	}, {
		name: 'credit status report',
		url: '/report/credit_status_report',
		templateUrl: 'views/report/credit_status_report.html',
		controller: 'CreditStatusReportController'
	}, {
		name: 'to utilisation rate report',
		url: '/report/to_utilisation_rate_report',
		templateUrl: 'views/report/to_utilisation_rate_report.html',
		controller: 'TOUtilisationRateReportController'
	}, {
		name: 'vehicle utilisation rate report',
		url: '/report/vehicle_utilisation_rate_report',
		templateUrl: 'views/report/vehicle_utilisation_rate_report.html',
		controller: 'VehicleUtilisationRateReportController'
	}, {
		name: 'to mileage report',
		url: '/report/to_mileage_report',
		templateUrl: 'views/report/to_mileage_report.html',
		controller: 'TOMileageReportController'
	}, {
		name: 'vehicle mileage report',
		url: '/report/vehicle_mileage_report',
		templateUrl: 'views/report/vehicle_mileage_report.html',
		controller: 'VehicleMileageReportController'
	}, {
		name: 'ad-hoc report',
		url: '/report/adhoc_report',
		templateUrl: 'views/report/adhoc_report.html',
		controller: 'AdhocReportController'
	}, {
		name: 'users',
		url: '/users',
		templateUrl: 'views/admin/user_search.html',
		controller: 'UserSearchController'
	}, {
		name: 'user',
		url: '/user',
		templateUrl: 'views/admin/user.html',
		controller: 'UserCreateController'
	}, {
		name: 'user view',
		url: '/user/view/:personId',
		templateUrl: 'views/admin/user_view.html',
		controller: 'UserController'
	}, {
		name: 'user registration approval',
		url: '/user/registration_approval',
		templateUrl: 'views/admin/user_registration_approval.html',
		controller: 'UserRegistrationApprovalController'
	}, {
		name: 'user reactivation approval',
		url: '/user/reactivation_approval',
		templateUrl: 'views/admin/user_reactivation_approval.html',
		controller: 'UserReactivationApprovalController'
	}, {
		name: 'roles',
		url: '/roles',
		templateUrl: 'views/admin/roles.html',
		controller: 'RoleController'
	}, {
		name: 'role view',
		url: '/role/view',
		templateUrl: 'views/admin/role_view.html',
		controller: ''
	}, {
		name: 'support structure',
		url: '/support_structure',
		templateUrl: 'views/admin/support_structure.html',
		controller: 'ManageSupportStructureController'
	}, {
		name: 'master data',
		url: '/master_data',
		templateUrl: 'views/admin/master_data.html',
		controller: 'ManageMasterDataController'
	}, {
		name: 'parameters',
		url: '/parameters',
		templateUrl: 'views/admin/parameters.html',
		controller: 'ManageParameterController'
	}, {
		name: 'notifications',
		url: '/notifications',
		templateUrl: 'views/admin/notifications.html',
		controller: 'ManageNotificationController'
	}, {
		name: 'self service',
		url: '/self_service',
		templateUrl: 'views/self_service/login_ss.html',
		controller: 'SelfServiceLoginController'
	}, {
		name: 'self service dashboard',
		url: '/self_service_dashboard/:nricNo',
		templateUrl: 'views/self_service/dashboard_ss.html',
		controller: 'SelfServiceDashboardController'
	}, {
		name: 'register',
		url: '/register',
		templateUrl: 'views/registration/register.html',
		controller: 'RegisterController'
	}, {
		name: 'registered',
		url: '/registered',
		templateUrl: 'views/registration/registered.html',
		controller: ''
	}, {
		name: 'reactivate',
		url: '/reactivate',
		templateUrl: 'views/registration/reactivate.html',
		controller: 'ReactivateController'
	}, {
		name: 'reactivated',
		url: '/reactivated',
		templateUrl: 'views/registration/reactivated.html',
		controller: ''
	}, {
		name: 'update',
		url: '/update/:personId',
		templateUrl: 'views/registration/update.html',
		controller: 'UpdateController'
	}, {
		name: 'updated',
		url: '/updated',
		templateUrl: 'views/registration/updated.html',
		controller: ''
	}, {
		name: 'allorders',
		url: '/generateAllOrders',
		templateUrl: '/report/generateAllOrders',
		controller: ''
	}, {
		name: 'user endorsement',
		url: '/user/endorsement/:uuid',
		templateUrl: 'views/admin/user_endorsement.html',
		controller: 'EndorsementController'
	}, {
		name: 'vehicle type new',
		url: '/vehicle_type_new',
		templateUrl: 'views/resource/vehicle_type_new.html',
		controller: 'VehicleTypeCreateController'
	}
];
