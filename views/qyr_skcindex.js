define([
	"data/prodobject",
	],
function(prodobject){
	
	checkauthorization(false);


	var titleBar = {
			view:"toolbar",
			css: "highlighted_header header5",
			paddingX:5,
			paddingY:5,
			height:35,
			cols:[
				{view:"select",name:"brandcode", width:200,align: "left", label: '品牌',	labelWidth:60,
					options:urlstr+"/WBProdMng/getBrandList"},
			    {view:"select", id:"yearcode",name:"yearcode",width:200,align:"left", label:'年份',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getYearList"},
			    	{view:"select", id:"seasoncode",name:"seasoncode",width:200,align:"left", label:'季节',labelWidth:60,
			    		options:urlstr+"/WBProdMng/getSeasonList"},
			    		
			    { view: "button", type: "iconButton", icon: "search", label: "查询", width: 70, 
				    click: function(){
				    	var values =this.getParentView().getValues();
				    	
				    	var postData ={};
				    	if(values.brandcode != 'all') postData.BrandName=values.brandcode;
				    	if(values.yearcode != 'all') postData.YearName=values.yearcode;
				    	if(values.seasoncode != 'all') postData.SeasonName=values.seasoncode;
				    	
					$$("dt_dimskc").clearAll();
					$$("dt_dimskc").parse(prodobject.getSKCIndex(postData));
				 }},
			    {},

		    ]
	};
	
	var grid_skc = {
		margin:10,
		rows:[
			{
				id:"dt_dimskc",
				view:"datatable", 
				editable:false,
				select:true,
				leftSplit:3,
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[
					{ id:"skccode",	header:"款色", sort:"string",width:100,css:'bgcolor2'},
					{ id:"yearname",	header:["年份 ",{content:"selectFilter"}], sort:"string",width:60,css:'bgcolor2'},
					{ id:"seasonname",	header:["季节 ",{content:"selectFilter"}], sort:"string",width:60,css:'bgcolor2'},
					{ id:"maintypename",header:["大类 ",{content:"selectFilter"}], sort:"string",width:60,css:'bgcolor2'},
					{ id:"subtypename",header:["小类 ",{content:"selectFilter"}],width:60,css:'bgcolor2'},
					
					{ id:"saletotal",header:[{text:"销量",colspan:6},"总销量"],sort:"int",width:70},
					{ id:"sale14days",header:[null,"14天销量"],sort:"int",width:85},
					{ id:"sale7days",header:[null,"7天销量"],sort:"int",width:85},
					{ id:"saleyesterday",header:[null,"昨天销量"],sort:"int",width:85},
					{ id:"saledailytdd",header:[null,"日均TDD"],sort:"int",width:85},
					{ id:"salediscount",header:[null,"折扣"],sort:"int",width:60},
					
					{ id:"salenumeverin",header:[{text:"门店铺货",colspan:4},"曾铺店"],sort:"int",width:70},
					{ id:"storenumcurin",header:[null,"现铺数"],sort:"int",width:70},
					{ id:"storenumeversold",header:[null,"动销店"],sort:"int",width:70},
					{ id:"storenumtotal",header:[null,"总店数"],sort:"int",width:70},
					
					
					{ id:"stockstoredeadglobalhot",header:[{text:"门店库存",colspan:4},"店死整畅"],sort:"int",width:85},
					{ id:"stockoverinstores",header:[null,"超额库存"],sort:"int",width:85},
					{ id:"stockshortinstores",header:[null,"缺口库存"],sort:"int",width:85},
					{ id:"stockdailyidd",header:[null,"日均IDD"],sort:"int",width:85},	
						
					{ id:"stocktotalqty",header:[{text:"库存分布",colspan:4},"总库存"],sort:"int",width:85},
					{ id:"stockinstoresqty",header:[null,"门店库存"],sort:"int",width:85},
					{ id:"stockinrgnqty",header:[null,"区域库存"],sort:"int",width:85},
					{ id:"stockincwhqty",header:[null,"总仓库存"],sort:"int",width:85},
					
					{ id:"stadayofinventory",header:[{text:"分析数据",colspan:7},"库存天数"],sort:"int",width:85},
					{ id:"stastoressellper",header:[null,"动销率"],sort:"int",width:70},
					{ id:"stastorescoverper",header:[null,"铺货率"],sort:"int",width:70},
					{ id:"stasellcompleteper",header:[null,"售罄率"],sort:"int",width:70},	
					{ id:"stashortsizeper",header:[null,"断码率"],sort:"int",width:70},
					{ id:"starepsuccessper",header:[null,"补货率"],sort:"int",width:70},
					{ id:"stasalewowper",header:[null,"周环比"],sort:"int",width:70}
					
				],
				export: true,
				on: {
					onAfterLoad: function(){
						this.select(1);		
					},
					onSelectChange:function()
					{
						var selRow = this.getSelectedItem();
						if(selRow)
						{
						var prezSKCRegionData = prodobject.getSKCIndexItem({SKUCode:selRow.skucode});
						$$("dt_skcregionitem").clearAll();
						$$("dt_skcregionitem").parse(prezSKCRegionData);
						}
					}
				},
//				pager:"skc_pagerA"
			}
		]

	};
	
	var grid_skcregion={
				id:"dt_skcregionitem",
				view:"datatable", 
				editable:false,
				select:true,
				leftSplit:1,
				rowHeight:_RowHeight,
				headerRowHeight:_HeaderRowHeight,
					headermenu:{
					    width:250,
					    autoheight:false,
					    scroll:true
					},
				columns:[
								{ id:"regionname",header:"区域",sort:"name",width:100},
								
								{ id:"saletotal",header:[{text:"销量",colspan:6},"总销量"],sort:"int",width:70},
								{ id:"sale14days",header:[null,"14天销量"],sort:"int",width:85},
								{ id:"sale7days",header:[null,"7天销量"],sort:"int",width:85},
								{ id:"saleyesterday",header:[null,"昨天销量"],sort:"int",width:85},
								{ id:"saledailytdd",header:[null,"日均TDD"],sort:"int",width:85},
								{ id:"salediscount",header:[null,"折扣"],sort:"int",width:70},
								
								{ id:"salenumeverin",header:[{text:"门店铺货",colspan:4},"曾铺店"],sort:"int",width:85},
								{ id:"storenumcurin",header:[null,"现铺数"],sort:"int",width:70},
								{ id:"storenumeversold",header:[null,"动销店"],sort:"int",width:70},
								{ id:"storenumtotal",header:[null,"总店数"],sort:"int",width:70},
										
								{ id:"stockstoredeadglobalhot",header:[{text:"门店库存",colspan:4},"店死整畅"],sort:"int",width:85},
								{ id:"stockoverinstores",header:[null,"超额库存"],sort:"int",width:85},
								{ id:"stockshortinstores",header:[null,"缺口库存"],sort:"int",width:85},
								{ id:"stockdailyidd",header:[null,"日均IDD"],sort:"int",width:85},	
									
								{ id:"stocktotalqty",header:[{text:"库存分布",colspan:4},"总库存"],sort:"int",width:70},
								{ id:"stockinstoresqty",header:[null,"门店库存"],sort:"int",width:85},
								{ id:"stockinrgnqty",header:[null,"区域库存"],sort:"int",width:85},
								{ id:"stockincwhqty",header:[null,"总仓库存"],sort:"int",width:85},
								
								{ id:"stadayofinventory",header:[{text:"分析数据",colspan:7},"库存天数"],sort:"int",width:85},
								{ id:"stastoressellper",header:[null,"动销率"],sort:"int",width:70},
								{ id:"stastorescoverper",header:[null,"铺货率"],sort:"int",width:70},
								{ id:"stasellcompleteper",header:[null,"售罄率"],sort:"int",width:70},	
								{ id:"stashortsizeper",header:[null,"断码率"],sort:"int",width:70},
								{ id:"starepsuccessper",header:[null,"补货率"],sort:"int",width:70},
								{ id:"stasalewowper",header:[null,"周环比"],sort:"int",width:70}
				],
				export: true,
//				pager:"skcregion_pagerA"
	};
	
	var layout = {
		type: "clean",
		rows:[
				titleBar,
				grid_skc,
//					{
//						view: "toolbar",
//						css: "highlighted_header header6",
//						paddingX:2,
//						paddingY:2,
//						height:30,
//						cols:[{
//							view:"pager", id:"skc_pagerA",
//							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
//							autosize:true,
//							height: 30,
//							group:5
//						}]
//					},
					{view:"resizer"},
					grid_skcregion,
//					{
//						view: "toolbar",
//						css: "highlighted_header header6",
//						paddingX:2,
//						paddingY:2,
//						height:30,
//						cols:[{
//							view:"pager", id:"skcregion_pagerA",
//							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
//							autosize:true,
//							height: 30,
//							group:5
//						}]
//					},
			]
	};
	

	return {
		$ui: layout,
	};

});