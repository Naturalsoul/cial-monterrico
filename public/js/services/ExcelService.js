angular.module("ExcelService", []).factory("ExcelService", [function(){
    return {
        tableToExcel: function (date, id, name) {
            
            let d = ""
            d += (date.getDate().toString().length < 2) ? "0" + date.getDate() : date.getDate()
            d += "-"
            d += ((date.getMonth() + 1).toString().length < 2) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
            d += "-"
            d += date.getFullYear()
            
            /*
            var sheetName = name + " " + d;
            var fileName = sheetName + ".xls";
            var fileRaw = document.getElementById(id).innerHTML;
            fileRaw = fileRaw.split("↑").join("");
            var file = fileRaw.split("↓").join("");
    
              var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>'
                , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    
                var toExcel = file;
                var ctx = {
                    worksheet: sheetName || '',
                    table: toExcel
                };
    
                var link = document.createElement('a');
                link.download = fileName;
                link.href = uri + base64(format(template, ctx));
                link.click();
            */
            
            $('#' + id).tableExport({type:'excel',escape:'false'});
        }
    }
}])