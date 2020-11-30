var data = 

am4core.ready(function() {

    am4core.useTheme(am4themes_animated);

    var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.dataSource.url = "data.json";

    chart.dateFormatter.inputDateFormat = "yyyy";
    chart.responsive.enabled = true;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    valueAxis.numberFormatter = new am4core.NumberFormatter();
    valueAxis.numberFormatter.numberFormat = "#."; 

    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "Valor m2: [bold]{value.formatNumber('#.')}[/]"
    series.strokeWidth = 3;
    series.minBulletDistance = 15;
    series.stroke = am4core.color("#002162");

    series.tooltip.background.cornerRadius = 0;
    series.tooltip.background.strokeOpacity = 1;
    series.tooltip.getFillFromObject = false;
    series.tooltip.getStrokeFromObject = false;
    series.tooltip.pointerOrientation = "horizontal";
    series.tooltip.background.fill = am4core.color("#ffffff");
    series.tooltip.background.stroke = am4core.color("#002162");
    series.tooltip.background.strokeWidth = 2;
    series.tooltip.label.fill = am4core.color("#002162");
    series.tooltip.label.minWidth = 20;
    series.tooltip.label.fontSize = 14;
    series.tooltip.label.minHeight = 20;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomX";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.fullWidthLineX = false;
    chart.cursor.lineX.stroke = am4core.color("#CC0000");
    chart.cursor.lineX.strokeWidth = 1;
    chart.cursor.lineX.strokeOpacity = 1;
    chart.cursor.lineX.strokeDasharray = "";
    chart.cursor.lineY.disabled = true;

    valueAxis.cursorTooltipEnabled = false;

    dateAxis.start = 0;
    dateAxis.keepSelection = true;
    dateAxis.tooltip.background.fill = am4core.color("#CC0000");
    dateAxis.tooltip.background.stroke = am4core.color("#CC0000");
    dateAxis.tooltip.background.pointerLength = 0;
    dateAxis.gridIntervals.setAll([{ timeUnit: "year", count: 1 },{ timeUnit: "year", count: 3 }]);

    chart.responsive.rules.push({
        relevant: function(target){
            console.log(target);
            if(target.pixelWidth <= 769){
                return true;
            }
            return false;
        },
        state: function(target, stateId){
            if(target instanceof am4charts.DateAxis){
                let state = target.states.create(stateId);
                state.sprite.gridIntervals.setAll([{ timeUnit: "year", count: 1 },{ timeUnit: "year", count: 5 }])
            }
            if (target instanceof am4charts.AxisRendererY) {
                var state = target.states.create(stateId);
                state.properties.inside = true;
                return state;
            }
        }
    })
    /*
    chart.responsive.rules.push({
        relevant: function(target){
            if(target.pixelWidth <= 400){
                return true;
            }
            return false;
        },
        state: function(target, stateId){
            if(target instanceof am4charts.DateAxis){
                let state = target.states.create(stateId);
                dateAxis.gridIntervals.setAll([
                    { timeUnit: "year", count: 1 },
                    { timeUnit: "year", count: 10 },
                ]);
            }
        }
    })
    */


}); // end am4core.ready()