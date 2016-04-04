define([
	"data/stockobject",
	"views/modules/qry_dwhrepretorder/repretconditionview"
	],
function(stockobject,repretconditionview){
	
	checkauthorization(false);
	
		var enddate = new Date();
		enddate.setDate(enddate.getDate()-7);

	
	var grid = {
		margin:10,
		rows:[
			{
				id:"dt_dwhrepretorder",
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
					{id:"ordercode", header:"单号", sort:"string",fillspace:1.5},
					{ id:"partyname",	header:["分仓",{content:"selectFilter"}], sort:"string",fillspace:1.5},
					{ id:"parentname",	header:"中央仓", sort:"string",fillspace:1.5},
					{ id:"makedate",	header:"日期", sort:"string",fillspace:1.5},
					{ id:"orderqty",	header:"数量",sort:"int",fillspace:1},
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
						var ordertype = repretconditionview.getOrderType();
						var prezRepItemData = stockobject.getRepRetOrderItem({OrderType:ordertype,OrderCode:selRow.ordercode});
						$$("dt_dwhrepretorderitem").clearAll();
						$$("dt_dwhrepretorderitem").parse(prezRepItemData);
						}
					}
				},
				pager:"dwhrepret_pagerA"
			}
		]

	};
	
	var grid_orderitem={
				id:"dt_dwhrepretorderitem",
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
//					{ id:"ordercode",	header:"#", sort:"string",fillspace:2},			
					{ id:"skucode",	header:"SKU", sort:"string",fillspace:2},			
					{ id:"productcolorcode",	header:"款色", sort:"string",fillspace:1.5},
					{ id:"colorname",	header:"颜色", sort:"string",fillspace:1},
					{ id:"sizename",	header:"尺码", sort:"string",fillspace:1},				
					{ id:"yearname",	header:"年份", sort:"string",fillspace:1,hidden:true},
					{ id:"seasonname",	header:"季节", sort:"string",fillspace:1},
					{ id:"maintypename",	header:"大类", sort:"string",fillspace:2},
					{ id:"subtypename",	header:"小类", sort:"string",fillspace:2},		
					{ id:"ordertype",	header:"类型", fillspace:1},
					{ id:"orderqty",	header:"数量",align:"right", fillspace:1}
				],
				export: true,
				pager:"dwhrepretitem_pagerA"
	};
	
	var layout = {
		type: "clean",
		cols:[
			repretconditionview,
			{view:"resizer"},
			{
				rows:[
					grid,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"dwhrepret_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					},
					{view:"resizer"},
					grid_orderitem,
					{
						view: "toolbar",
						css: "highlighted_header header6",
						paddingX:2,
						paddingY:2,
						height:30,
						cols:[{
							view:"pager", id:"dwhrepretitem_pagerA",
							template:"{common.first()}{common.prev()}&nbsp; {common.pages()}&nbsp; {common.next()}{common.last()}",
							autosize:true,
							height: 30,
							group:5
						}]
					},
				]
			}
		]

	};
	

	return {
		$ui: layout,
	};

});