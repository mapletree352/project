var mockData = {
    serviceman: {
        nricNo: 'S7821254C',
        name: 'Wilson Na',

        defaultTagPrefix:'ME',
        maxTagCharacter:'17',
        // maxTagCharacter:'10',
        rankCode: 'ME1-1',
        rankPosition:1,
        //rank: 'LTA',

        //      service: 'NAVY',
        service: 'ARMY',
        //      service: 'AIRFORCE',

        accountStatus: 'ACTIVE',

        creditBalance: '314.25',
        //creditBalance: '64',
        creditBalanceExpiryDate: new Date(),

        creditExpiringDate: new Date(),

        nextCreditTopUp: '150',

        nextProjectedCreditTopUp: '260',
        nextProjectedCreditTopUpDate: new Date()
        
    },
    categories:[
        {id:'C01',name:'Clothing'},
        {id:'C02',name:'Footwear'},
        {id:'C03',name:'Headwear'},
        {id:'C04',name:'Rank'},
        {id:'C05',name:'Badge/Medal'},
        {id:'C06',name:'Expendables'},
    ],
    groups:[
        {id:'1',name:'Clothing', maq:7},
        {id:'2',name:'Nametag', maq:5},
        {id:'3',name:'Footwear', maq:15},
        {id:'4',name:'Headwear', maq:5},
        {id:'5',name:'Rank', maq:10},
        {id:'6',name:'Badge/Medal', maq:9},
        {id:'7',name:'Expendables', maq:5},
    ],
    carts:{
        creditValue:0,
        cashValue:0,
        items: []
    },
    ////Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge
    products:[
        {
            categoryId:'C01', groupId:null, productId:'C01888', productName:'Sewing Service', 
                onlinePrice:0.65, outletPrice:0.65, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'', 
                imageList:[1],  
                sizeList:[{id:'0010011'}]
        },
        {
            categoryId:'C01', groupId:'2', productId:'C01001', productName:'Name Tag', 
                onlinePrice:2.5, outletPrice:4.5, embroideryFlag:'Y', 
                sewableType:'nameTag', uniformType:'No4', sewableRestriction: null, productDescription:'This is a sample description of the product Name Tag where Name Tag is the product name.', 
                imageList:[1,2],  
                sizeList:[{id:'C0010001'}]
        },
        {
            categoryId:'C01', groupId:'1', productId:'C01002', productName:'No3 Top', 
                onlinePrice:12.5, outletPrice:14.5, embroideryFlag:null, 
                sewableType:null, 
                uniformType:'No3',
                sewableRestriction: {
                    nameTag:1,
                    proficiencyBadge: 2,
                    skillTab: 2,
                    vocationBadge: 3 
                },
                productDescription:'This is a sample description of the product No3 Top where No3 Top is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C01002001',label:'S',disabled:true},
                {id:'C01002002',label:'M'},
                {id:'C01002003',label:'L', default:true},
                {id:'C01002004',label:'XL'},
                {id:'C01002005',label:'XXL',disabled:true}
                ]
        },
        {
            categoryId:'C01', groupId:'1', productId:'C01003', productName:'No4 Pixelised Pants', 
                onlinePrice:12.5, outletPrice:14.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product No4 Pixelised Pants where No4 Pixelised Pants is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C01003001',label:'S'},
                {id:'C01003002',label:'M', default:true},
                {id:'C01003003',label:'L'},
                {id:'C01003004',label:'XL',disabled:true},
                {id:'C01003005',label:'XXL',disabled:true}
                ]
        },
        {
            categoryId:'C01', groupId:'1', productId:'C01004', productName:'No4 Pixelised Top', 
                onlinePrice:12.5, outletPrice:14.5, embroideryFlag:null, 
                sewableType:null,
                uniformType:'No4', 
                sewableRestriction: {
                    nameTag:1,
                    proficiencyBadge: 2,
                    skillTab: 2,
                    vocationBadge: 3  
                },
                productDescription:'This is a sample description of the product No4 Pixelised Top where No4 Pixelised Top is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C01004001',label:'S',disabled:true},
                {id:'C01004002',label:'M',disabled:true},
                {id:'C01004003',label:'L',disabled:true},
                {id:'C01004004',label:'XL'},
                {id:'C01004005',label:'XXL', default:true}
                ]
        },
        {
            categoryId:'C01', groupId:'1', productId:'C01005', productName:'T-Shirt Round Crew Neck', 
                onlinePrice:12.5, outletPrice:14.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product T-Shirt Round Crew Neck where T-Shirt Round Crew Neck is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C01005001',label:'S',disabled:true},
                {id:'C01005002',label:'M',disabled:true},
                {id:'C01005003',label:'L',disabled:true},
                {id:'C01005004',label:'XL'},
                {id:'C01005005',label:'XXL', default:true}
                ]
        },
        //Footwear
        {
            categoryId:'C02', groupId:'3', productId:'C02001', productName:'Black Shoe', 
                onlinePrice:12.5, outletPrice:14.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Black Shoe where Black Shoe is the product name.', 
                imageList:[1,2],  
                sizeList:[
                {id:'C02002001',label:'7',disabled:true},
                {id:'C02002002',label:'8',disabled:true},
                {id:'C02002003',label:'9',disabled:true},
                {id:'C02002004',label:'10'},
                {id:'C02002005',label:'11', default:true}
                ]
        },
        {
            categoryId:'C02', groupId:'3', productId:'C02002', productName:'Black Socks', 
                onlinePrice:6.5, outletPrice:8.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Black Socks where Black Socks is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C02002001',label:'7',disabled:true},
                {id:'C02002002',label:'8',disabled:true},
                {id:'C02002003',label:'9',disabled:true},
                {id:'C02002004',label:'10'},
                {id:'C02002005',label:'11', default:true}
                ]
        },
        {
            categoryId:'C02', groupId:'3', productId:'C02003', productName:'Boot Laces', 
                onlinePrice:3.5, outletPrice:4.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Boot Laces where Boot Laces is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C02003001',label:'NA'}
                ]
        },
        {
            categoryId:'C02', groupId:'3', productId:'C02004', productName:'Combat Boots', 
                onlinePrice:25.5, outletPrice:26.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Combat Boots where Combat Boots is the product name.', 
                imageList:[1,2,3,4],  
                sizeList:[
                {id:'C02004001',label:'7',disabled:true},
                {id:'C02004002',label:'8',disabled:true},
                {id:'C02004003',label:'9',disabled:true},
                {id:'C02004004',label:'10'},
                {id:'C02004005',label:'11', default:true}
                ]
        },
        {
            categoryId:'C02', groupId:'3', productId:'C02005', productName:'Green Socks', 
                onlinePrice:2.5, outletPrice:4.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Green Socks where Green Socks is the product name.', 
                imageList:[1,2,3],  
                sizeList:[
                {id:'C02005001',label:'7',disabled:true},
                {id:'C02005002',label:'8',disabled:true},
                {id:'C02005003',label:'9',disabled:true},
                {id:'C02005004',label:'10'},
                {id:'C02005005',label:'11', default:true}
                ]
        },
        {
            categoryId:'C02', groupId:'3', productId:'C02006', productName:'Running Shoe', 
                onlinePrice:16.5, outletPrice:18.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Running Shoe where Running Shoe is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C02006001',label:'7',disabled:true},
                {id:'C02006002',label:'8',disabled:true},
                {id:'C02006003',label:'9',disabled:true},
                {id:'C02006004',label:'10'},
                {id:'C02006005',label:'11', default:true}
                ]
        },
        //Headwear
        {
            categoryId:'C03', groupId:'4', productId:'C03001', productName:'Beret', 
                onlinePrice:8.5, outletPrice:10.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Beret where Beret is the product name.', 
                imageList:[1,2],  
                sizeList:[
                {id:'C03001001',label:'6',disabled:true},
                {id:'C03001002',label:'6.25',disabled:true},
                {id:'C03001003',label:'6.5',disabled:true},
                {id:'C03001004',label:'6.75'},
                {id:'C03001005',label:'7', default:true}
                ]
        },{
            categoryId:'C03', groupId:'4', productId:'C03002', productName:'Pixelised Jockey Cap', 
                onlinePrice:8.5, outletPrice:10.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Pixelised Jockey Cap where Pixelised Jockey Cap is the product name.', 
                imageList:[1,2],  
                sizeList:[
                {id:'C03002001',label: '7', enabled:false},
                {id:'C03002002',label: '7.25', enabled:false},
                {id:'C03002003',label: '7.5'},
                {id:'C03002004',label: '7.75', default:true}
                ]
        },
        //Rank
        {
            categoryId:'C04', groupId:'5', productId:'C04001', productName:'no3 1st Warrant Officer Pin', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product no3 1st Warrant Officer Pin where no3 1st Warrant Officer Pin is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C04001001',label: '1WO'}
                ]
        },{
            categoryId:'C04', groupId:'5', productId:'C04002', productName:'no3 2nd Lieutenant Collar Pin', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product no3 2nd Lieutenant Collar Pin where no3 2nd Lieutenant Collar Pin is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C04002001',label: '2LT'}
                ]
        },{
            categoryId:'C04', groupId:'5', productId:'C04003', productName:'no3 2nd Warrant Officer Pin', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product no3 2nd Warrant Officer Pin where no3 2nd Warrant Officer Pin is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C04003001',label: '2WO'}
                ]
        },{
            categoryId:'C04', groupId:'5', productId:'C04004', productName:'no3 Captain Collar Pin', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product no3 Captain Collar Pin where no3 Captain Collar Pin is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C04004001',label: 'CPT'}
                ]
        },{
            categoryId:'C04', groupId:'5', productId:'C04005', productName:'no3 Lieutenant Collar Pin', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product no3 Lieutenant Collar Pin where no3 Lieutenant Collar Pin is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C04005001',label: 'LTA'}
                ]
        },{
            categoryId:'C04', groupId:'5', productId:'C04006', productName:'no3 Master Warrant Officer Pin', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product no3 Master Warrant Officer Pin where no3 Master Warrant Officer Pin is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C04006001',label: 'MWO'}
                ]
        },
        //Badges/Medal
        {
            categoryId:'C05', groupId:'6', productId:'C05001', productName:'No3 Ranger', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:'proficiencyBadge', uniformType:'No3', sewableRestriction: null, productDescription:'This is a sample description of the product No3 Ranger where No3 Ranger is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C05001001',label: 'NA'}
                ]
        },{
            categoryId:'C05', groupId:'6', productId:'C05002', productName:'No4 Marksmanship', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:'proficiencyBadge', uniformType:'No4', sewableRestriction: null, productDescription:'This is a sample description of the product No4 Marksmanship where No4 Marksmanship is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C05002001',label: 'NA'}
                ]
        },{
            categoryId:'C05', groupId:'6', productId:'C05003', productName:'no4 master parachutist', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:'proficiencyBadge', uniformType:'No4', sewableRestriction: null, productDescription:'This is a sample description of the product no4 master parachutist where no4 master parachutist is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C05003001',label: 'NA'}
                ]
        },{
            categoryId:'C05', groupId:'6', productId:'C05004', productName:'no4 Ranger', 
                onlinePrice:5.5, outletPrice:6.5, embroideryFlag:null, 
                sewableType:'proficiencyBadge', uniformType:'No4', sewableRestriction: null, productDescription:'This is a sample description of the product no4 Ranger where no4 Ranger is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C05004001',label: 'NA'}
                ]
        },
        //Expendables
        {
            categoryId:'C06', groupId:'7', productId:'C06001', productName:'Ear Plugs', 
                onlinePrice:9.5, outletPrice:10.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Ear Plugs where Ear Plugs is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C06001001',label: 'NA'}
                ]
        },{
            categoryId:'C06', groupId:'7', productId:'C06002', productName:'Green Towel', 
                onlinePrice:9.5, outletPrice:10.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Green Towel where Green Towel is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C06002001',label: 'NA'}
                ]
        },{
            categoryId:'C06', groupId:'7', productId:'C06003', productName:'Kiwi Shoe Polish Black', 
                onlinePrice:10.5, outletPrice:11.5, embroideryFlag:null, 
                sewableType:null, uniformType:null, sewableRestriction: null, productDescription:'This is a sample description of the product Kiwi Shoe Polish Black where Kiwi Shoe Polish Black is the product name.', 
                imageList:[1],  
                sizeList:[
                {id:'C06003001',label: 'NA'}
                ]
        }
    ],


//-------------------------------------------------------------------------------------------------------------------------------


    transactionLogs:{
        instants:[
            {title:'Credit Movement Update',detail:'Unutilised Credits Expired on 01.08.2013',figure:'-25.59'},
            {title:'Credit Movement Update',detail:'Unutilised Credits Expired on 01.09.2014',figure:'-20'},
            {title:'Credit Movement Update',detail:'Unutilised Credits Expired on 01.10.2015',figure:'-35.59'}
        ],
        details:[
            {
                title:'Credit Movement Update',
                detail:'Annual DOB Credits Top-up on 01.10.2015',
                figure:'35.59',
                purchaseOrder:'1100124780',
                orderDate: new Date(),
                deliveryMode: 'Self Collection',
                collectionOutlet:'Chevrons',
                deliveryDate:new Date(),
                productCount:6,
                totalCreditUsed:-158.81,
                totalCashUsed:68.50,
                orderStatus:'Delivered',
                cart:[
                    {
                        productId:1,
                        price:16,
                        sizeId:1,
                        creditQuantity:5,
                        cashQuantity:1,
                        totalQuantity:6,
                        tagText:'',
                        size:{id:3,label: 'L'}
                    },
                    {
                        productId:2,
                        price:16,
                        sizeId:1,
                        creditQuantity:1,
                        cashQuantity:0,
                        totalQuantity:1,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:3,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:4,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:5,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:6,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:11,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:12,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:13,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:14,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:15,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    },
                    {
                        productId:16,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{id:2,label: 'M'}
                    }
                ]
            },
            {
                title:'Credit Movement Update',
                detail:'Annual DOB Credits Top-up on 01.10.2015',
                figure:'35.59',
                purchaseOrder:'1100124781',
                orderDate: new Date(),
                deliveryMode: 'Home Delivery',
                collectionOutlet:'Chevrons',
                deliveryDate:new Date(),
                productCount:6,
                totalCreditUsed:-168.81,
                totalCashUsed:65.50,
                orderStatus:'Pending',
                cart:[
                    {
                        productId:3,
                        price:16,
                        sizeId:13,
                        creditQuantity:2,
                        cashQuantity:0,
                        totalQuantity:2,
                        tagText:'',
                        size:{id:3,label: 'L'}
                    },
                    {
                        productId:4,
                        price:16,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:0,
                        totalQuantity:2,
                        tagText:'',
                        size:{id:1,label: 'S'}
                    }
                    ,
                    {
                        productId:88,
                        price:1.5,
                        sizeId:1,
                        creditQuantity:2,
                        cashQuantity:1,
                        totalQuantity:3,
                        tagText:'',
                        size:{}
                    }
                ]
            }
        ]
    },  
    // measurementOptions:{
    //     footArch:[{
    //             id:1,
    //             label:'Small'
    //         },
    //         {
    //             id:2,
    //             label:'Medium'
    //         },
    //         {
    //             id:3,
    //             label:'Large'
    //         }]
    // },

// Object.keys(measurement);  --> var keys = [chest, waist]
// measurement[key] = {figure:0,unit}

    measurement:[
        {
            label:'Chest',
            name:'chest',
            figure:0,
            unit:'cm'
        },
        {
            label:'Waist',
            name:'waist',
            figure:0,
            unit:'cm'
        },
        {
            label:'Hip',
            name:'hip',
            figure:0,
            unit:'cm'
        },
        {
            label:'Sleeve Length',
            name:'sleeveLength',
            figure:0,
            unit:'cm'
        },
        {
            label:'Head Circumference',
            name:'headCircumference',
            figure:0,
            unit:'cm'
        },
        {
            label:'Foot Length',
            name:'footLength',
            figure:0,
            unit:'mm'
        },
        {
            label:'Foot Width',
            name:'footWidth',
            figure:0,
            unit:'mm'
        }
    ],

    servicemanNric: {
        nricNo: 'S7821254C'
    },
    // productOptions: {
    //     maxQuantityAllow: 10
    //     //,
    //     // maxStandardameTagCharacter: 10,
    //     // maxPremiumNameTagCharacter: 17,
    //     // defaultTagPrefix:'ME'
    // },
    config: {
        eNetsEnable: false,
        maxQuantityAllow: 10
        //,sewingService: 0.64
    },
    cart: {
        person1: {
            list: [
            ]
        }
        // person1: {
        //     createdDate: new Date(),
            // list: [{
            //     //Cart Id refer to size ID, make it as unique ID in Cart
            //     cartId:0,
            //     productId: 1,
            //     creditQuantity:0,
            //     cashQuantity:0,
            //     //totalQuantity for the purpose to put total quantity in product selection list
            //     totalQuantity:2,
            //     tagText:'',
            //     onlinePrice:16,
            //     //We can expect that sizeSelected ID is same as cartId
            //     sizeSelected:1,

        
        //         quantity: 3,
                



                
        //         nameTagText:'',
        //         basket:[],
        //         detail:[]
        //     }]
            
        // }
        
    },
    deliveryMode:[
            {
                id:1,
                label:'Home Delivery'
            },
            {
                id:2,
                label:'Self-Collection'
            },
            {
                id:3,
                label:'Overseas Delivery'
            }
    ],
    deliveryOpt:[
            {
                id:1,
                label:'Operator 1'
            },
            {
                id:2,
                label:'Operator 2'
            },
            {
                id:3,
                label:'Operator 3'
            }
    ],
    delivery:{
        deliveryMode:[{
                id:1,
                label:'Home Delivery'
            },
            {
                id:0,
                label:'Self-Collection'
            },
            {
                id:2,
                label:'Overseas Delivery'
            }],
        deliveryOpt:[
            {
                id:1,
                label:'Operator 1'
            },
            {
                id:2,
                label:'Operator 2'
            },
            {
                id:3,
                label:'Operator 3'
            }
        ],
        deliveryOverseas:[
            {id:1,label:'Overseas Base 1'},
            {id:2,label:'Overseas Base 2'},
            {id:3,label:'Overseas Base 3'},
            {id:4,label:'Detachment 1'},
            {id:5,label:'Detachment 2'},
        ],
        collectionOutlet:[
            {
                id:1,
                label:'Collection Out 1',
                address: '48 Boon Lay Way #01-03 Singapore 609961',
                contact:'6862 5600',
                operating:'Daily: 1100 - 2000 Hrs',
                restricted:false
            },
            {
                id:2,
                label:'Collection Out 2',
                address: '48 Chua Chu Kang Way #01-03 Singapore 609962',
                contact:'6862 5601',
                operating:'Daily: 1100 - 2000 Hrs',
                restricted:true
            },
            {
                id:3,
                label:'Collection Out 3',
                address: '48 Mandai Road Way #01-03 Singapore 609963',
                contact:'6862 5602',
                operating:'Daily: 1100 - 2000 Hrs',
                restricted:false
            }
        ]
    },
    feedbackType:[
        {id:1,label:'Feedback Type 1'},
        {id:2,label:'Feedback Type 2'},
        {id:3,label:'Feedback Type 3'},
        {id:4,label:'Feedback Type 4'},
        {id:5,label:'Feedback Type 5'}
    ],
    productCategory: [{
        id: 1,
        name: 'Clothing',
        ordinal: 1
    }, {
        id: 2,
        name: 'Footwear',
        ordinal: 2
    }, {
        id: 3,
        name: 'Headwear',
        ordinal: 3
    }, {
        id: 4,
        name: 'Rank',
        ordinal: 4
    }, {
        id: 5,
        name: 'Badge/Medal',
        ordinal: 5
    }, {
        id: 6,
        name: 'Expendables',
        ordinal: 6
    }, {
        id: 7,
        name: 'Others',
        ordinal: 7
    }],
    sewingProduct:{
        productId:88,
        categoryId:0,
        maq:4,
        //no maq
        sizeList: [{id:1,label: 'S'}],
        sewableType:'',
        productName:'Sewing Service',
        onlinePrice: 1.50,
        outletPrice: 0,
        productPicture: 'others_1.jpg'
    },
    emartProducts: [{
        productId: 1,
        categoryId: 1,
        maq:4,
        sizeList: [{id:1,label: 'S'}],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge
        sewableType:'nameTag',
        sewableRestriction: null,
        // Var: sewableRestriction only available in clothe category
        //It is to check how many item can tag into this clothe
        // sewableRestriction: [{
        //     maxNameTag:1,
        //     maxProficiencyBadge: 2,
        //     maxSkillTab: 2,
        //     maxVocationBadge: 3 
        // }],
        // //uniformType and service must match in another item
        // uniformType:'no4',
        // service:'ARMY', (every product has this attribute) --[service is not applicable anymore on 9 July 2015 by Wilson]

        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge
        // sewableType:'nameTag'
        // Note:
        // 1. All attribute are exist in all product.
        // 2. Depends if the value is null or not.
        // 3. sewableRestriction has value on the product when it is not null.
        // 4. sewableType has value on the product when it is sewable.
        // 5. service has value in each product
        // 6. uniformType has value on certain product only.

        productName: 'Name Tag',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Name Tag 01.jpg',
        productDescription: 'This is a sample description of the product Name Tag where Name Tag is the product name.',
        thumbnails: ['Name Tag 01.jpg', 'Name Tag 02.jpg'],
        //images:["1","2","3","4","5"]   /[Product ID]_[IMages_ID].jpg and [Product ID]_[IMages_ID]_thumbnail.jpg

    }, {
        productId: 2,
        categoryId: 1,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'S', enabled:false},
        {id:2,label: 'M'},
        {id:3,label: 'L', default:true},
        {id:4,label: 'XL'},
        {id:5,label: 'XXL', enabled:false}
        ],
        sewableType:'',
        //sewableRestriction to move out, put into constant
        sewableRestriction: {
            maxNameTag:1,
            maxProficiencyBadge: 2,
            maxSkillTab: 2,
            maxVocationBadge: 3 
        },
        productName: 'No3 Top',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'No3 Top 01.jpg',
        productDescription: 'This is a sample description of the product No3 Top where No3 Top is the product name.',
        thumbnails: ['No3 Top 01.jpg']
    }, {
        productId: 3,
        categoryId: 1,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'S', enabled:false},
        {id:2,label: 'M', enabled:false},
        {id:3,label: 'L', enabled:false},
        {id:4,label: 'XL'},
        {id:5,label: 'XXL', default:true}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'No4 Pixelised Pants',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'No4 Pixelised Pants 01.jpg',
        productDescription: 'This is a sample description of the product No4 Pixelised Pants where No4 Pixelised Pants is the product name.',
        thumbnails: ['No4 Pixelised Pants 01.jpg']
    }, {
        productId: 4,
        categoryId: 1,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'S', enabled:false},
        {id:2,label: 'M', enabled:false},
        {id:3,label: 'L'},
        {id:4,label: 'XL', default:true},
        {id:5,label: 'XXL'}
        ],
        sewableType:'',
        sewableRestriction: {
            maxNameTag:1,
            maxProficiencyBadge: 2,
            maxSkillTab: 2,
            maxVocationBadge: 3 
        },
        productName: 'No4 Pixelised Top',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'No4 Pixelised Top 01.jpg',
        productDescription: 'This is a sample description of the product No4 Pixelised Top where No4 Pixelised Top is the product name.',
        thumbnails: ['No4 Pixelised Top 01.jpg']
    }, {
        productId: 5,
        categoryId: 1,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'S', enabled:false},
        {id:2,label: 'M', enabled:false},
        {id:3,label: 'L'},
        {id:4,label: 'XL', default:true},
        {id:5,label: 'XXL'}
        ],
        sewableType:'',
        sewableRestriction: {
            maxNameTag:1,
            maxProficiencyBadge: 2,
            maxSkillTab: 2,
            maxVocationBadge: 3 
        },
        productName: 'T-Shirt Round Crew Neck',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'T-Shirt Round Crew Neck 01.jpg',
        productDescription: 'This is a sample description of the product T-Shirt Round Crew Neck where T-Shirt Round Crew Neck is the product name.',
        thumbnails: ['T-Shirt Round Crew Neck 01.jpg']
    }, {
        productId: 11,
        categoryId: 2,
        // sizeList: ['7','8','9','10','11'],
        maq:4,
        sizeList: [
        {id:1,label: '7', enabled:false},
        {id:2,label: '8', enabled:false},
        {id:3,label: '9'},
        {id:4,label: '10', default:true},
        {id:5,label: '11'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Black Shoe',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Black Shoe 01.jpg',
        productDescription: 'This is a sample description of the product Black Shoe where Black Shoe is the product name.',
        thumbnails: ['Black Shoe 01.jpg','Black Shoe 02.jpg']
    }, {
        productId: 12,
        categoryId: 2,
        // sizeList: ['7','8','9','10','11'],
        maq:4,
        sizeList: [
        {id:1,label: '7', enabled:false},
        {id:2,label: '8', enabled:false},
        {id:3,label: '9'},
        {id:4,label: '10', default:true},
        {id:5,label: '11'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Black Socks',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Black Socks 01.jpg',
        productDescription: 'This is a sample description of the product Black Socks where Black Socks is the product name.',
        thumbnails: ['Black Socks 01.jpg']
    }, {
        productId: 13,
        categoryId: 2,
        // sizeList: ['7','8','9','10','11'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Boot Laces',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Boot Laces 01.jpg',
        productDescription: 'This is a sample description of the product Boot Laces where Boot Laces is the product name.',
        thumbnails: ['Boot Laces 01.jpg']
    }, {
        productId: 14,
        categoryId: 2,
        // sizeList: ['7','8','9','10','11'],
        maq:4,
        sizeList: [
        {id:1,label: '7', enabled:false},
        {id:2,label: '8', enabled:false},
        {id:3,label: '9'},
        {id:4,label: '10', default:true},
        {id:5,label: '11'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Combat Boots',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Combat Boots 01.jpg',
        productDescription: 'This is a sample description of the product Combat Boots where Combat Boots is the product name.',
        thumbnails: ['Combat Boots 01.jpg','Combat Boots 02.jpg','Combat Boots 03.jpg','Combat Boots 04.jpg']
    }, {
        productId: 15,
        categoryId: 2,
        // sizeList: ['7','8','9','10','11'],
        maq:4,
        sizeList: [
        {id:1,label: '7', enabled:false},
        {id:2,label: '8', enabled:false},
        {id:3,label: '9'},
        {id:4,label: '10', default:true},
        {id:5,label: '11'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Green Socks',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Green Socks 01.jpg',
        productDescription: 'This is a sample description of the product Green Socks where Green Socks is the product name.',
        thumbnails: ['Green Socks 01.jpg','Green Socks 02.jpg','Green Socks 03.jpg']
    }, {
        productId: 16,
        categoryId: 2,
        // sizeList: ['7','8','9','10','11'],
        maq:4,
        sizeList: [
        {id:1,label: '7', enabled:false},
        {id:2,label: '8', enabled:false},
        {id:3,label: '9'},
        {id:4,label: '10', default:true},
        {id:5,label: '11'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Running Shoe',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Running Shoe 01.jpg',
        productDescription: 'This is a sample description of the product Running Shoe where Running Shoe is the product name.',
        thumbnails: ['Running Shoe 01.jpg']
    }, {
        productId: 17,
        categoryId: 3,
        // sizeList: ['210','215','220','225','230'],
        maq:4,
        sizeList: [
        {id:1,label: '6', enabled:false},
        {id:2,label: '6.25', enabled:false},
        {id:3,label: '6.5'},
        {id:4,label: '6.75', default:true}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Beret',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Beret 01.jpg',
        productDescription: 'This is a sample description of the product Beret where Beret is the product name.',
        thumbnails: ['Beret 01.jpg','Beret 02.jpg']
    }, {
        productId: 18,
        categoryId: 3,
        // sizeList: ['210','215','220','225','230'],
        maq:4,
        sizeList: [
        {id:1,label: '7', enabled:false},
        {id:2,label: '7.25', enabled:false},
        {id:3,label: '7.5'},
        {id:4,label: '7.75', default:true}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Pixelised Jockey Cap',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Pixelised Jockey Cap 01.jpg',
        productDescription: 'This is a sample description of the product Pixelised Jockey Cap where Pixelised Jockey Cap is the product name.',
        thumbnails: ['Pixelised Jockey Cap 01.jpg','Pixelised Jockey Cap 02.jpg']
    }, {
        productId: 23,
        categoryId: 4,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: '1WO'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'',
        sewableRestriction: null,
        productName: 'no3 1st Warrant Officer Pin',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no3 1st Warrant Officer Pin.jpg',
        productDescription: 'This is a sample description of the product no3 1st Warrant Officer Pin where no3 1st Warrant Officer Pin is the product name.',
        thumbnails: ['no3 1st Warrant Officer Pin.jpg']
    }, {
        productId: 24,
        categoryId: 4,
        maq:4,
        sizeList: [
        {id:1,label: '2LT'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'',
        sewableRestriction: null,
        productName: 'no3 2nd Lieutenant Collar Pin',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no3 2nd Lieutenant Collar Pin.jpg',
        productDescription: 'This is a sample description of the product no3 2nd Lieutenant Collar Pin where no3 2nd Lieutenant Collar Pin is the product name.',
        thumbnails: ['no3 2nd Lieutenant Collar Pin.jpg']
    }, {
        productId: 25,
        categoryId: 4,
        maq:4,
        sizeList: [
        {id:1,label: '2WO'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'',
        sewableRestriction: null,
        productName: 'no3 2nd Warrant Officer Pin',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no3 2nd Warrant Officer Pin.jpg',
        productDescription: 'This is a sample description of the product no3 2nd Warrant Officer Pin where no3 2nd Warrant Officer Pin is the product name.',
        thumbnails: ['no3 2nd Warrant Officer Pin.jpg']
    }, {
        productId: 26,
        categoryId: 4,
        maq:4,
        sizeList: [
        {id:1,label: 'CPT'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'',
        sewableRestriction: null,
        productName: 'no3 Captain Collar Pin',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no3 Captain Collar Pin.jpg',
        productDescription: 'This is a sample description of the product no3 Captain Collar Pin where no3 Captain Collar Pin is the product name.',
        thumbnails: ['no3 Captain Collar Pin.jpg']
    }, {
        productId: 27,
        categoryId: 4,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'LTA'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'',
        sewableRestriction: null,
        productName: 'no3 Lieutenant Collar Pin',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no3 Lieutenant Collar Pin.jpg',
        productDescription: 'This is a sample description of the product no3 Lieutenant Collar Pin where no3 Lieutenant Collar Pin is the product name.',
        thumbnails: ['no3 Lieutenant Collar Pin.jpg']
    }, {
        productId: 28,
        categoryId: 4,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'MWO'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'',
        sewableRestriction: null,
        productName: 'no3 Master Warrant Officer Pin',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no3 Master Warrant Officer Pin.jpg',
        productDescription: 'This is a sample description of the product no3 Master Warrant Officer Pin where no3 Master Warrant Officer Pin is the product name.',
        thumbnails: ['no3 Master Warrant Officer Pin.jpg']
    }, {
        productId: 29,
        categoryId: 5,
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'proficiencyBadge',
        sewableRestriction: null,
        productName: 'No3 Ranger',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'No3 Ranger 01.jpg',
        productDescription: 'This is a sample description of the product No3 Ranger where No3 Ranger is the product name.',
        thumbnails: ['No3 Ranger 01.jpg']
    }, {
        productId: 30,
        categoryId: 5,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'proficiencyBadge',
        sewableRestriction: null,
        productName: 'No4 Marksmanship',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'No4 Marksmanship 01.jpg',
        productDescription: 'This is a sample description of the product No4 Marksmanship where No4 Marksmanship is the product name.',
        thumbnails: ['No4 Marksmanship 01.jpg']
    }, {
        productId: 31,
        categoryId: 5,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'proficiencyBadge',
        sewableRestriction: null,
        productName: 'no4 master parachutist',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no4 master parachutist 01.jpg',
        productDescription: 'This is a sample description of the product no4 master parachutist where no4 master parachutist is the product name.',
        thumbnails: ['no4 master parachutist 01.jpg']
    }, {
        productId: 32,
        categoryId: 5,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        //var:sewableType is for sewable item only
        //to match, the item must be 'UNIFORM' and another item should be nameTag, proficiencyBadges...
        //Possible value:nameTag, proficiencyBadge, skillTab, vocationBadge, rank
        sewableType:'proficiencyBadge',
        sewableRestriction: null,
        productName: 'no4 Ranger',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'no4 Ranger 01.jpg',
        productDescription: 'This is a sample description of the product no4 Ranger where no4 Ranger is the product name.',
        thumbnails: ['no4 Ranger 01.jpg']
    }, {
        productId: 35,
        categoryId: 6,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Ear Plugs',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Ear Plugs 01.jpg',
        productDescription: 'This is a sample description of the product Ear Plugs where Ear Plugs is the product name.',
        thumbnails: ['Ear Plugs 01.jpg']
    }, {
        productId: 36,
        categoryId: 6,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Green Towel',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Green Towel 01.jpg',
        productDescription: 'This is a sample description of the product Green Towel where Green Towel is the product name.',
        thumbnails: ['Green Towel 01.jpg']
    }, {
        productId: 37,
        categoryId: 6,
        //sizeList: ['S','M','L','XL','XXL'],
        maq:4,
        sizeList: [
        {id:1,label: 'NA'}
        ],
        sewableType:'',
        sewableRestriction: null,
        productName: 'Kiwi Shoe Polish Black',
        onlinePrice: 16,
        outletPrice: 22.50,
        productPicture: 'Kiwi Shoe Polish Black 01.jpg',
        productDescription: 'This is a sample description of the product Kiwi Shoe Polish Black where Kiwi Shoe Polish Black is the product name.',
        thumbnails: ['Kiwi Shoe Polish Black 01.jpg']
    }
    ]
}