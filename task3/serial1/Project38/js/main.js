
var tableAction = {
    
    allData: [],

    createTable: function() {
        var firstTr = document.createElement("tr");
        for (var i = 0; i < data.colName.length; i++) {
            var curTh = document.createElement("th");
            curTh.innerHTML = (data.colName)[i];
            if (i > 0) {
                var i1 = document.createElement("i");
                var i2 = document.createElement("i");
                i1.className = "arrow-down";
                i2.className = "arrow-up";
                curTh.appendChild(i1);
                curTh.appendChild(i2);
            }
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

    sortTable: function(sortId, method) {
        tableAction.allData.sort(function(array1, array2) {
            if (method === "des") {
                return (parseInt(array1[sortId]) <= parseInt(array2[sortId]) ? 1 : -1);
            }
            else if (method === "asc") {
                return (parseInt(array1[sortId]) <= parseInt(array2[sortId]) ? -1 : 1);
            }
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
    for (var cur = 0; cur < $("i").length; cur++) {
        addEvent($("i")[cur], "click", function(cur) {
            if ($("i")[cur].className === "arrow-down") {
                return function(){return tableAction.sortTable(Math.floor(cur / 2) + 1, "asc")};
            }
            else if ($("i")[cur].className === "arrow-up") {
                return function(){return tableAction.sortTable(Math.floor(cur / 2) + 1, "des")};
            }
        }(cur));
    }
}

window.onload = function() {
    tableAction.createTable();
    delegateEvent();
    tableAction.sortTable(5, "des");
}