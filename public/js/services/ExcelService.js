angular.module("ExcelService", []).factory("ExcelService", [function(){
    return {
        tableToExcel: function (date, id, name) {
            
            let d = ""
            d += (date.getDate().toString().length < 2) ? "0" + date.getDate() : date.getDate()
            d += "-"
            d += ((date.getMonth() + 1).toString().length < 2) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
            d += "-"
            d += date.getFullYear()
            
             var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
             tab_text = tab_text + "<meta charset = 'utf-8'>"
              tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
              tab_text = tab_text + '<x:Name>' + name + '</x:Name>';
              tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
              tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
              tab_text = tab_text + "<table border='1px'>";
              var exportTable = $('#' + id).clone();
              exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
              tab_text = tab_text + exportTable.html();
              tab_text = tab_text + '</table></body></html>';
              var fileName = name + ' ' + d + '.xls';
            
              //Save the file
              var blob = new Blob([tab_text], { type: "application/vnd.ms-excel;charset=utf-8" })
              window.saveAs(blob, fileName);

        }
    }
}])