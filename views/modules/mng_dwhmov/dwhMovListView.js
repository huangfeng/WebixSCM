define(
["data/storeobject"],
function(storeobject){
	return {
		$ui:{
			width:_ListWidth,
			type: "clean",
			css: "highlighted_header header5",
			header:"分仓列表",
			body:{
			rows:[	
				{					
					view: "list",
					id: "lt_dwhmov",
					select: true,
				    template:"#id# - #value#",
				    url:urlstr+'/WBPartyMng/getRegionList',
					scheme:{
					$init:function(obj){
					}
				}
				}
			]
			}
		}
	}
});