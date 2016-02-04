
new WellTabber("[data-aimNoNavAr]","[data-targetNoNavAr]","active");

new WellTabber("[data-aimNoNavAr_V]","[data-targetNoNavAr_V]","active");

//формат первых 2 параметров должен соответствовать CSS-селекторам (.class) и т.д..
//если селектор data-attr тогда соответственно JS - стандартам
var tabberWithTabs = new WellTabber("[data-aim]","[data-target]","active");
tabberWithTabs.activateNavArrow(".infoNavL",".infoNavR");




