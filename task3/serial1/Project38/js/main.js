var allData = [];

var tableAction = {
    
    allData: [],

    createTable: function() {
        var firstTr = document.createElement("tr");
        for (var i = 0; i < data.colName.length; i++) {
            var curTh = document.createElement("th");
            curTh.innerHTML = (data.colName)[i];
            firstTr.appendChild(curTh);
        }
        $("#target-form").appendChild(firstTr);
        for (var i = 0; i < data.rowData.length; i++) {
            var curTr = document.createElement("tr");
            var curData = [];
            for (var j = 0; j < data.colName.length; j++) {
                var curTd = document.createElement("td");
                curTd.innerHTML = ((data.rowData)[i])[j];
                curData.push(((data.rowData)[i])[j]);
                curTr.appendChild(curTd);
            }
            tableAction.allData.push(curData);
            $("#target-form").appendChild(curTr);
        }
    },

    sortTable: function(sortId) {
        tableAction.allData.sort(function(array1, array2) {
            return (parseInt(array1[sortId]) <= parseInt(array2[sortId]) ? 1 : -1);
        });
        tableAction.redrawTable();
    },

    redrawTable: function() {
        var rows = $("tr");
        for (var i = 1; i < rows.length; i++) {
            rows[i].innerHTML = "";
            for (var j = 0; j < data.colName.length; j++) {
                var curTd = document.createElement("td");
                curTd.innerHTML = ((tableAction.allData)[i - 1])[j];
                rows[i].appendChild(curTd);
            }
        }
    }
}

function delegateEvent() {
    for (var cur = 0; cur < data.colName.length; cur++) {
        addEvent($("th")[cur], "click", function(cur) {
            return function(){return tableAction.sortTable(cur)};
        }(cur));
    }
}

window.onload = function() {
    tableAction.createTable();
    delegateEvent();
    tableAction.sortTable(5);
}