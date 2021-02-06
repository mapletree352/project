app.run(function($httpBackend, Constants) {
	/*
	$httpBackend.whenGET(Constants.BASE_URL + '/dashboard/actions').respond(function(){
		var x = [200, [{
			"date":1472432595359,
			"title":"Action Title 111",
			"type":"Action Type 1",
			"description":"A long description ldkgfj lkdjfhgljskd hgljkshfgldflkljgfhdsghldladfg ahl fjkddjfgh dajfghlaf ghg ajdfgladfhjfg dhjdfgljdhl dahgld f",
			"url":"/module/1"
		},{
			"date":1472432595360,
			"title":"Action Title 2",
			"type":"Action Type 2",
			"description":"A long description ldkgfj lkdjfhgljskd hgljkshfgldflkljgfhdsghldladfg ahl fjkddjfgh dajfghlaf ghg ajdfgladfhjfg dhjdfgljdhl dahgld f",
			"url":"/module/2"
		}], {}];
		
		return x;
	});

	$httpBackend.whenGET(Constants.BASE_URL + '/dashboard/notifications1').respond(function(){
		var x = [200, [{
			"date":1472432595359,
			"type":"Notification Type 1",
			"description":"A long description ldkgfj lkdjfhgljskd hgljkshfgldflkljgfhdsghldladfg ahl fjkddjfgh dajfghlaf ghg ajdfgladfhjfg dhjdfgljdhl dahgld f",
			"url":"/module/1"
		},{
			"date":1472432595360,
			"type":"Notification Type 2",
			"description":"A long description ldkgfj lkdjfhgljskd hgljkshfgldflkljgfhdsghldladfg ahl fjkddjfgh dajfghlaf ghg ajdfgladfhjfg dhjdfgljdhl dahgld f",
			"url":"/module/2"
		}], {}];
		
		return x;
	});


    $httpBackend.whenGET('/api/clearCart').respond(function(){
        var cartItems = mockData.carts.items;
        angular.forEach(cartItems,function(cKey,cIndex){
            if(cKey.productId!='C01888'){
                var quantity = parseInt(cKey.quantity);
                var productId = cKey.productId;
                var sizeId = cKey.sizeId;
                var product = '';
                angular.forEach(mockData.products,function(pKey,pIndex){
                    if(pKey.productId==productId){
                        product = pKey;
                    }
                });
                angular.forEach(mockData.groups,function(gKey,gIndex){
                    if(parseInt(gKey.id)==parseInt(product.groupId)){
                        gKey.maq+=quantity;
                    }
                });
            }
        });
        mockData.carts.creditValue=0;
        mockData.carts.cashValue=0;
        mockData.carts.items = [];

        var statusResponse = {
            statusCode:'SUCCESS',
            statusMessage:'The products in your cart are cleared.'
        }
        return [200,statusResponse,{}];
    });
    $httpBackend.whenPOST('/api/removeCart').respond(
        function(method,url,data,headers){

            data = JSON.parse(data);
            var statusResponse = {
                statusCode:'SUCCESS',
                statusMessage:'The product has been remove from the cart.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The product failed to remove from cart. Pleas try again later.'
            // }
            var creditValue = 0;
            var items = [];
            var restoreMaq = 0;
            var product = '';
            angular.forEach(mockData.products,function(pKey,pIndex){
                if(pKey.productId==data.productId){
                    product = pKey;
                }
            });
            angular.forEach(mockData.carts.items,function(key,index){
                if(key.productId==data.productId && key.sizeId==data.sizeId){
                    restoreMaq = parseInt(key.quantity);
                }else{
                    items.push(key);
                    creditValue+=parseFloat(key.creditValue);
                }
            });
            mockData.carts.creditValue=creditValue;
            mockData.carts.items = [];
            mockData.carts.items = angular.copy(items);
            angular.forEach(mockData.groups,function(gKey,gIndex){
                if(parseInt(gKey.id)==parseInt(product.groupId)){
                    gKey.maq+=parseInt(restoreMaq);
                }
            });
            
            return [200, statusResponse, {}];
        }
    );
    $httpBackend.whenPOST('/api/alterQuantityInCart').respond(
        function(method,url,data,headers){
            //data: {sizeId:sizeId,productId:productId,quantity:quantity}
            data = JSON.parse(data);
            //{sizeId:sizeId,productId:productId,quantity:quantity}
            var statusResponse = {
                statusCode:'SUCCEEDED',
                statusMessage:'The quantity has been altered successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The quantity has not been altered successfully. Pleas try again later.'
            // }

            var product = '';
            angular.forEach(mockData.products,function(pKey,pIndex){
                if(pKey.productId==data.productId){
                    product = pKey;
                }
            });
            mockData.carts.creditValue = 0;
            var originalMaqUsed = 0;
            angular.forEach(mockData.carts.items,function(key,index){
                if(key.productId==data.productId && key.sizeId==data.sizeId){
                    originalMaqUsed = key.quantity;
                    key.quantity = data.quantity;
                    key.creditValue = parseInt(key.quantity)*parseFloat(product.onlinePrice);
                }
                mockData.carts.creditValue += parseFloat(key.creditValue);
            });
            angular.forEach(mockData.groups,function(gKey,gIndex){
                if(gKey.id==product.groupId){
                    gKey.maq = (gKey.maq+parseInt(originalMaqUsed))-parseInt(data.quantity);
                }
            });

            return [200, statusResponse, {}];
        }
    );
    $httpBackend.whenPOST('/api/getProduct').respond(
        function(method,url,data,headers){
            var product = {};
            data = JSON.parse(data);
            angular.forEach(mockData.products,function(key,index){
                if(key.productId==data.productId){
                    product = key;
                }
            });

            return [200, product, {}];
        }
    );
    $httpBackend.whenGET('/api/productGroups').respond(mockData.groups);
    $httpBackend.whenGET('/api/productCategories').respond(mockData.categories);
    $httpBackend.whenGET('/api/carts').respond(mockData.carts);
    
    $httpBackend.whenPOST('/api/findProductsByCategory').respond(
        function(method, url, d, headers) {
            var data = [];
            d = JSON.parse(d);
            angular.forEach(mockData.products, function(key, value) {
                if(key.productId!='C01888'){
                    if(key.categoryId==d.categoryId){
                        data.push(key);
                    }
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenPOST('/api/search').respond(
        function(method, url, data, headers) {
            var result = {
                found:false,
                products:[],
                message:''                
            };

            data = JSON.parse(data);
            angular.forEach(mockData.products, function (key, value) {
                if(key.productId!='C01888'){
                    if (key.productName.toLowerCase().indexOf(data.keyword) >= 0) {
                        result.products.push(key);
                        result.found = true;
                    }
                }
            });
            if(!result.found){
                result.message = 'Result not found.';
            }
            return [200, result, {}];
        }
    );
    $httpBackend.whenPOST('/api/insertOrUpdateCart').respond(
        function(method,url,carts,headers){
            
            var statusResponse = {
                statusCode:'SUCCESS',
                statusMessage:'The product is updated in the cart successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The product failed alter in the cart. Pleas try again later.'
            // }
            carts = JSON.parse(carts);
            mockData.carts.creditValue = carts.creditValue;
            mockData.carts.cashValue = carts.cashValue;

            //To refresh data first
            mockData.groups[0].maq = 7;
            mockData.groups[1].maq = 5;
            mockData.groups[2].maq = 15;
            mockData.groups[3].maq = 5;
            mockData.groups[4].maq = 10;
            mockData.groups[5].maq = 9;
            mockData.groups[6].maq = 5;

            //To recalculate MAQ
            angular.forEach(carts.items,function(key,index){
                var groupId = 0;
                angular.forEach(mockData.products,function(pKey,pIndex){
                    if(pKey.groupId!=null && pKey.productId==key.productId){
                        groupId = pKey.groupId;
                    }
                });
                angular.forEach(mockData.groups,function(gKey,gIndex){
                    if(gKey.id==groupId){
                        gKey.maq = parseInt(gKey.maq) - parseInt(key.quantity);
                    }
                });
            });
            mockData.carts.items = angular.copy(carts.items);
            return [200, statusResponse, {}];
        }
    );






























    //-------------------------------------------------------------
    $httpBackend.whenGET('/api/getEmartCart').respond(mockData.cart.person1);

    $httpBackend.whenGET('/api/validateAddProduct').respond(
        function(){
            return [200,{response:true},{}];
        });
    $httpBackend.whenGET('/api/user/0').respond(mockData.serviceman);
    $httpBackend.whenGET('/api/serviceman').respond(mockData.serviceman);
    $httpBackend.whenGET('/api/measurement').respond(mockData.measurement);
    //$httpBackend.whenGET('/api/measurementOptions').respond(mockData.measurementOptions);
    $httpBackend.whenGET('/api/transactionLogs').respond(
        function(){
            var logs = mockData.transactionLogs;
            angular.forEach(logs.details,function(key,index){
                angular.forEach(key.cart,function(k,i){
                    if(k.productId==mockData.sewingProduct.productId){
                        k.productDetail = mockData.sewingProduct;
                    }else{
                        angular.forEach(mockData.emartProducts,function(m,n){
                            if(m.productId==k.productId){
                                k.productDetail = m;
                            }
                        });
                    }
                });
            });
            return [200,logs,{}];
        }
    );
    
    $httpBackend.whenPOST('/api/alterQuantityInCartWithCash').respond(
        function(method,url,cart,headers){
            
            var statusResponse = {
                statusCode:'SUCCEEDED',
                statusMessage:'The product is updated in the cart successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The product failed alter in the cart. Pleas try again later.'
            // }
            cart = JSON.parse(cart);

            angular.forEach(mockData.cart.person1.list,function(key,index){
                if(key.productId==cart.productId && key.sizeSelected==cart.sizeId){
                    key.totalQuantity = parseInt(cart.creditQuantity)+parseInt(cart.cashQuantity);
                    key.creditQuantity = parseInt(cart.creditQuantity);
                    key.cashQuantity = parseInt(cart.cashQuantity);
                }
            });
            angular.forEach(mockData.emartProducts,function(key,index){
                if(key.productId==cart.productId){
                    key.maq = 0;
                }
            });
            return [200, statusResponse, {}];
        }
    );
    
    
    $httpBackend.whenPOST('/api/findProducts').respond(
        function(method,url,data,headers){
            var products = [];
            data = JSON.parse(data);

            angular.forEach(data,function(productId,index){
                angular.forEach(mockData.products, function(key, value) {
                    if(key.productId==productId){
                        products.push(key);
                    }
                });
            });

            return [200, products, {}];
        }
    );
    // $httpBackend.whenPOST('/api/addSewingServiceByCredit').respond(
    //     function(method,url,data,headers){
            
    //         var statusResponse = {
    //             statusCode:'SUCCEEDED',
    //             statusMessage:'The sewing service is added into cart successfully.'
    //         }
    //         // var statusResponse = {
    //         //     statusCode:'FAILED',
    //         //     statusMessage:'The sewing service failed added into cart. Please try again later.'
    //         // }
    //         data = JSON.parse(data);
    //         var record = {};
    //         record.cartId = 0;
    //         record.productId = data.productId;
    //         record.creditQuantity = 0;
    //         record.cashQuantity = 0;
    //         record.totalQuantity = 0;

    //         angular.forEach(data.sewingBasket,function(key,index){
    //             record.creditQuantity += key.basket.length;
    //             record.totalQuantity += key.basket.length;
    //         });

    //         record.tagText = '';
    //         //$scope.sewingOrder.sewableProducts;
    //         record.sewingBasket = data.sewingBasket;
    //         record.onlinePrice = data.totalPrice;
    //         record.sizeSelected = 0;

    //         mockData.cart.person1.list.push(record);
    //         //console.log(mockData.cart.person1.list);
    //         return [200, statusResponse, {}];
    //     });
    // $httpBackend.whenPOST('/api/updateSewingServiceByCredit').respond(
    //     function(method,url,data,headers){
    //         console.log('/api/updateSewingService');
    //         var statusResponse = {
    //             statusCode:'SUCCEEDED',
    //             statusMessage:'The sewing service is updated into cart successfully.'
    //         }
    //         // var statusResponse = {
    //         //     statusCode:'FAILED',
    //         //     statusMessage:'The sewing service failed altered into cart. Pleas try again later.'
    //         // }
    //         data = JSON.parse(data);
    //         var record = {};
    //         record.cartId = 0;
    //         record.productId = data.productId;
    //         record.creditQuantity = 0;
    //         record.cashQuantity = 0;
    //         record.totalQuantity = 0;

    //         angular.forEach(data.sewingBasket,function(key,index){
    //             record.creditQuantity += key.basket.length;
    //             record.totalQuantity += key.basket.length;
    //         });

    //         record.tagText = '';
    //         //$scope.sewingOrder.sewableProducts;
    //         record.sewingBasket = data.sewingBasket;
    //         record.onlinePrice = data.totalPrice;
    //         record.sizeSelected = 0;

    //         var mycart = [];
    //         angular.forEach(mockData.cart.person1.list,function(key,index){
    //             if(key.productId!=mockData.sewingProduct.productId){
    //                 mycart.push(key);
    //             }else if(key.productId==mockData.sewingProduct.productId){
    //                 mycart.push(record);
    //             }
    //         });
    //         mockData.cart.person1.list = [];
    //         mockData.cart.person1.list = mycart;
    //         //console.log(mockData.cart.person1.list);
    //         return [200, statusResponse, {}];
    //     });
    $httpBackend.whenPOST('/api/addSewingService').respond(
        function(method,url,data,headers){
            
            var statusResponse = {
                statusCode:'SUCCEEDED',
                statusMessage:'The sewing service is added into cart successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The sewing service failed added into cart. Please try again later.'
            // }
            data = JSON.parse(data);
            var record = {};
            record.cartId = 0;
            record.productId = data.productId;
            record.creditQuantity = parseInt(data.totalCreditQuantity);
            record.cashQuantity = parseInt(data.totalCashQuantity);
            record.totalQuantity = (record.creditQuantity+record.cashQuantity);
            record.tagText = '';
            //$scope.sewingOrder.sewableProducts;
            record.sewingBasket = data.sewingBasket;
            record.onlinePrice = data.onlinePrice;
            record.sizeSelected = 0;

            mockData.cart.person1.list.push(record);
            //console.log(mockData.cart.person1.list);
            return [200, statusResponse, {}];
        });
    $httpBackend.whenPOST('/api/updateSewingService').respond(
        function(method,url,data,headers){
            //console.log('/api/updateSewingService');
            var statusResponse = {
                statusCode:'SUCCEEDED',
                statusMessage:'The sewing service is updated into cart successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The sewing service failed altered into cart. Pleas try again later.'
            // }
            data = JSON.parse(data);
            var record = {};
            record.cartId = 0;
            record.productId = data.productId;
            record.creditQuantity = parseInt(data.totalCreditQuantity);
            record.cashQuantity = parseInt(data.totalCashQuantity);
            record.totalQuantity = (record.creditQuantity+record.cashQuantity);

            record.tagText = '';
            //$scope.sewingOrder.sewableProducts;
            record.sewingBasket = data.sewingBasket;
            record.onlinePrice = data.onlinePrice;
            record.sizeSelected = 0;

            var mycart = [];
            angular.forEach(mockData.cart.person1.list,function(key,index){
                if(key.productId!=mockData.sewingProduct.productId){
                    mycart.push(key);
                }else if(key.productId==mockData.sewingProduct.productId){
                    mycart.push(record);
                }
            });
            mockData.cart.person1.list = [];
            mockData.cart.person1.list = mycart;
            //console.log(mockData.cart.person1.list);
            return [200, statusResponse, {}];
        });
    $httpBackend.whenPOST('/api/updateSimpleCart').respond(
        function(method,url,cart,headers){
            //console.log('/api/updateSimpleCart');
            var statusResponse = {
                statusCode:'SUCCEEDED',
                statusMessage:'The product is updated in the cart successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The product failed alter in the cart. Pleas try again later.'
            // }
            cart = JSON.parse(cart);
            angular.forEach(mockData.cart.person1.list,function(key,index){
                if(key.productId==cart.productId && key.sizeSelected==cart.sizeSelected){
                    key.totalQuantity = parseInt(key.totalQuantity) + parseInt(cart.totalQuantity);
                    key.creditQuantity = parseInt(key.creditQuantity) + parseInt(cart.creditQuantity);
                    key.cashQuantity = parseInt(key.cashQuantity) + parseInt(cart.cashQuantity);
                    key.tagText = cart.tagText;
                }
            });
            if(cart.tagText.length>0){
                angular.forEach(mockData.cart.person1.list,function(key,index){
                    if(key.productId==mockData.sewingProduct.productId){
                        if(key.sewingBasket.length>0){
                            angular.forEach(key.sewingBasket,function(sewProdKey,sewProdIndex){
                                if(sewProdKey.basket.length>0){
                                    angular.forEach(sewProdKey.basket,function(basketKey,basketIndex){
                                        if(basketKey.productId==cart.productId){
                                            basketKey.tagText = cart.tagText;
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
            angular.forEach(mockData.emartProducts,function(key,index){
                if(key.productId==cart.productId){
                    key.maq = parseInt(key.maq)-parseInt(cart.totalQuantity);
                }
                if(key.maq<=0) key.maq=0;
            });
            return [200, statusResponse, {}];
        }
    );
    $httpBackend.whenPOST('/api/addSimpleCart').respond(
        function(method,url,cart,headers){
            //console.log('/api/addSimpleCart');
            var statusResponse = {
                statusCode:'SUCCEEDED',
                statusMessage:'The product is added into cart successfully.'
            }
            // var statusResponse = {
            //     statusCode:'FAILED',
            //     statusMessage:'The product failed add into cart. Please try again later.'
            // }
            cart = JSON.parse(cart);
            mockData.cart.person1.list.push(cart);
            angular.forEach(mockData.emartProducts,function(key,index){
                if(key.productId==cart.productId){
                    key.maq = key.maq-cart.totalQuantity;
                }
                if(key.maq<=0) key.maq=0;
            });

            if(cart.tagText.length>0){
                angular.forEach(mockData.cart.person1.list,function(key,index){
                    if(key.productId==mockData.sewingProduct.productId){
                        if(key.sewingBasket.length>0){
                            angular.forEach(key.sewingBasket,function(sewProdKey,sewProdIndex){
                                if(sewProdKey.basket.length>0){
                                    angular.forEach(sewProdKey.basket,function(basketKey,basketIndex){
                                        if(basketKey.productId==cart.productId){
                                            basketKey.tagText = cart.tagText;
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
            

            return [200, statusResponse, {}];
        }
    );
    $httpBackend.whenPOST('/api/productInCart').respond(
        function(method,url,cart,headers){
            var statusResponse = {
                statusCode:'NotExist'
            }
            cart = JSON.parse(cart);
            
            angular.forEach(mockData.cart.person1.list,function(key,index){
                if(key.productId==cart.productId && key.sizeSelected == cart.sizeId){
                    statusResponse.statusCode = 'Exist'
                }
            });
            return [200, statusResponse, {}];
        }
    );





    $httpBackend.whenGET('/api/usernric/0').respond(mockData.servicemanNric);


    
    
    
    $httpBackend.whenGET('/api/totalCreditCharge/0').respond(function(){
        var data = {totalCreditCharge:0};
        angular.forEach(mockData.cart.person1.list,function(key,index){
            data.totalCreditCharge += (key.quantity*key.onlinePrice);
        });
        return [200,data,{}];
    });

    $httpBackend.whenGET('/api/delivery').respond(
        mockData.delivery
    );

    $httpBackend.whenGET('/api/configSetting').respond(mockData.config);
    $httpBackend.whenGET('/api/sewingProduct').respond(mockData.sewingProduct);
    
    $httpBackend.whenGET('/api/categories').respond(
        function() {
            var data = [];
            angular.forEach(mockData.productCategory, function(key, value) {
                switch (key.id) {
                    case 1:
                        data.push(key);
                        break;
                    case 2:
                        data.push(key);
                        break;
                    case 3:
                        data.push(key);
                        break;
                    case 4:
                        data.push(key);
                        break
                    case 5:
                        data.push(key);
                        break;
                    case 6:data.push(key);
                        break;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/getProductsByDefaultCategory').respond(
        function() {
            var data = [];

            angular.forEach(mockData.emartProducts, function(key, value) {
                switch (key.categoryId) {
                    case 1:
                        data.push(key);
                        break;
                }
            });

            return [200, data, {}];
        }
    );
    
    $httpBackend.whenGET('/api/defaultCategory').respond(
        function() {
            var data = {};
            angular.forEach(mockData.productCategory, function(key, value) {
                switch (key.id) {
                    case 1:
                        data = key;
                        break;
                }
            });
            return [200, data, {}];
        }
    );



    


    $httpBackend.whenGET('/api/findProductByCategory/sewing').respond(
        function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key,productId==41){
                    data.push(key);
                }
            });
            return [200, data, {}];
        }
    );
    
    $httpBackend.whenGET('/api/isSewingServiceAdded').respond(
        
        function() {
            var data = {
                flag:false
            };
            angular.forEach(mockData.cart.person1.list,function(key,index){
                
                    if(key.productId==88){
                        
                        data.flag = true;
                        
                    }
                
            });
            return [200, data, {}];
        }
    );
    
    $httpBackend.whenGET('/api/isSewableProductInCart').respond(
        function() {
            var data = {
                flag:false
            };
            angular.forEach(mockData.cart.person1.list,function(key,index){
                angular.forEach(mockData.emartProducts,function(k,i){
                    if(key.productId==k.productId){
                        if(k.sewableType!=null && k.sewableType.length>0){
                            data.flag = true;
                        }
                    }
                });
            });
            return [200, data, {}];
        }
    );


//        Please have a logic to check if the cart has sewable product (Clothing) and name tag producted added then proceed to sewing service page
    $httpBackend.whenGET('/api/sewingCartStatus').respond(
        function() {
            var data = {
                sewingServiceFlag:false,
                sewableProductFlag:false
            };
            var isSewableProductFound = false;
            var isNameTagProductFound = false;
            angular.forEach(mockData.cart.person1.list,function(key,index){
                angular.forEach(mockData.emartProducts,function(k,i){
                    //Look for nametag product
                    if(key.productId==k.productId && k.sewableType.length>0){
                        //Found at least one nametag product
                        isNameTagProductFound = true;
                    }
                    if(key.productId==k.productId && k.sewableRestriction!=null){
                        //Found at least one seable product, for example clothing
                        isSewableProductFound = true;
                    }
                });
                if(isNameTagProductFound && isSewableProductFound){
                    data.sewableProductFlag = true;
                }

                //To find out if any sewable service in the cart
                if(key.productId==88){  
                    data.sewingServiceFlag = true;   
                }
            });
            return [200, data, {}];
        }
    );


    $httpBackend.whenGET('/api/emartProducts').respond(mockData.emartProducts);
    //$httpBackend.whenGET('/api/productOptions').respond(mockData.productOptions);

    $httpBackend.whenGET('/api/cart/S7821254C').respond(mockData.cart.person1);


    $httpBackend.whenGET('/api/productCategory/1').respond(
        function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.categoryId==1){
                    data.push(key);
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/productCategory/2').respond(function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.categoryId==2){
                    data.push(key);
                }
            });
            return [200, data, {}];
        });
    $httpBackend.whenGET('/api/productCategory/3').respond(function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.categoryId==3){
                    data.push(key);
                }
            });
            return [200, data, {}];
        });
    $httpBackend.whenGET('/api/productCategory/4').respond(function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.categoryId==4){
                    data.push(key);
                }
            });
            return [200, data, {}];
        });
    $httpBackend.whenGET('/api/productCategory/5').respond(function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.categoryId==5){
                    data.push(key);
                }
            });
            return [200, data, {}];
        });
    $httpBackend.whenGET('/api/productCategory/6').respond(function() {
            var data = [];
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.categoryId==6){
                    data.push(key);
                }
            });
            return [200, data, {}];
        });

    $httpBackend.whenGET('/api/nric/0').respond(mockData.serviceman);
    //    $httpBackend.whenGET('/api/nric/0').respond(mockData.serviceman.nricNo);
    $httpBackend.whenGET('/api/findProduct/88').respond(mockData.sewingProduct);
    $httpBackend.whenGET('/api/findProduct/1').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==1){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/2').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==2){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/3').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==3){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/4').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==4){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/5').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==5){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/6').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==6){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/7').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==7){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/8').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==8){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/9').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==9){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/10').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==10){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/11').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==11){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/12').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==12){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/13').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==13){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/14').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==14){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/15').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==15){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/16').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==16){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/17').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==17){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/18').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==18){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/19').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==19){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/20').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==20){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/21').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==21){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/22').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==22){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/23').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==23){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/24').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==24){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/25').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==25){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/26').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==26){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/27').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==27){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/28').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==28){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/29').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==29){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/30').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==30){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/31').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==31){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/32').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==32){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/33').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==33){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/34').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==34){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/35').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==35){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/36').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==36){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/37').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==37){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/38').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==38){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/39').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==39){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/40').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==40){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenGET('/api/findProduct/41').respond(
        function() {
            var data = {};
            angular.forEach(mockData.emartProducts, function(key, value) {
                if(key.productId==41){
                    data = key;
                }
            });
            return [200, data, {}];
        }
    );
    $httpBackend.whenPOST('/api/testFindProduct').respond(
        function(method, url, data, headers) {
            var feedback = {company:'Wizvision Ptd Ltd'};
            //console.log(data);
            //console.log('testFindProduct');
            //console.log(data);
            return [200, {}, {}];
        }
    );
    
    $httpBackend.whenPOST('/api/saveMeasurement').respond(
        function(method,url,data,headers){
            var result = {
                isSaved:true,
                message:'Your measurement is save successfully'

                // isSaved:false,
                // message:'Your measurement is not save. Please try again later'
            };
            data = JSON.parse(data);
            var flag = true;
            angular.forEach(data,function(key,index){
                if(key.figure==undefined){
                    flag = false;
                }
            });

            if(flag){
                angular.forEach(mockData.measurement,function(key,index){
                    angular.forEach(data,function(k,i){
                        if(key.name==k.name){
                            key.figure=k.figure;
                        }
                    });
                });
            }else{
                result.isSaved = false;
                result.message = 'Please verify invalid measurement figure.';
            }

            return [200, result, {}];
        }
    );
    $httpBackend.whenPOST('/api/saveFeedback').respond(
        function(method,url,data,headers){
            var result = {
                isSaved:true,
                message:'We have received your feedback.'

                // isSaved:false,
                // message:'We have yet to receive feedback from you. Please try again later'
            };
            data = JSON.parse(data);
            // console.log('mock-backend.js - /api/saveFeedback');

            return [200, result, {}];
        }
    );
    $httpBackend.whenGET('/api/feedbackType').respond(mockData.feedbackType);
    
    //$httpBackend.whenGET('/api/product/0').respond(mockData.products.clothing);
    $httpBackend.whenGET('/api/student').respond(mockData.testData);
*/

    //    $httpBackend.whenGET('/api/products/0').respond(mockData.products);
    //    $httpBackend.whenGET('/api/detail').respond(mockData.products.clothing);
    // adds a new phone to the phones array
    //    $httpBackend.whenPOST('/phones').respond(function(method, url, data) {
    //        var phone = angular.fromJson(data);
    //        phones.push(phone);
    //        return [200, phone, {}];
    //    });

    //    $httpBackend.whenGET(/js\//).passThrough();
    //    $httpBackend.whenGET(/css\//).passThrough();
    //    $httpBackend.whenGET(/img\//).passThrough();
    //    $httpBackend.whenGET(/lib\//).passThrough();
    //    $httpBackend.whenGET(/components\//).passThrough();
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenJSONP(/.*/).passThrough();
});