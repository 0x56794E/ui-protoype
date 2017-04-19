    
/***********************/
/* Data for pie charts */
/***********************/

/* Raw data:
DG	16.7%
EXC	4.9%
GOOG	20.0%
VZ	20.0%
NEM	3.5%
CSC	14.8%
NVDA	20.0%
 */
var usStocksData = [
    {"type": "NEM", "pct": 3.6},
    {"type": "EXC", "pct": 4.9},
    {"type": "CSC", "pct": 14.8},
    {"type": "DG", "pct": 16.7},
    {"type": "VZ", "pct": 20.0},
    {"type": "NVDA", "pct": 20.0},
    {"type": "GOOG", "pct": 20.0},
];

/*
 BATS.L	1.9%
CNAL.L	20.0%
IMT.L	20.0%
NG.L	18.5%
SAN.PA	20.0%
SYNN.VX	4.9%
DG.PA	14.7%
 */

var euroLNDStocksData = [
    {"type": "BATS.L", "pct": 1.9},
    {"type": "SYNN.VX", "pct": 4.9},
    {"type": "DG.PA", "pct": 14.7},
    {"type": "NG.L", "pct": 18.5},
    {"type": "CNAL.L", "pct": 20.0},
    {"type": "IMT.L", "pct": 20.0},
    {"type": "SAN.PA", "pct": 20.0},
];

/*
601318.SS	100.00%
 */
var cnStocksData = [
    {"type": "601318.SS", "pct": 100}
];


var usBondsData = [
    {"type": "AGG", "pct": 100}
];

var intlBondsData = [
    {"type": "IAGG", "pct": 100}    
];

/*
 GLD	73.02%
JJT	13.23%
SGAR	11.64%
LD	2.12%
 */
var commodityData = [
    {"type": "LD", "pct": 2.12},
    {"type": "SGAR", "pct": 11.63},
    {"type": "JJT", "pct": 13.23},
    {"type": "GLD", "pct": 73.02}    
];

/*
CAD=X	15.1%
EUR=X	36.0%
EURCHF=X	0.2%
GBP=X	48.7%

 */
var forexData = [
    {"type": "EURCHF", "pct": 0.2},
    {"type": "CAD", "pct": 15.1},
    {"type": "EUR", "pct": 36.0},
    {"type": "GBP", "pct": 48.7}    
];


//Optimal allocaiton: summary
var optimalAlloc = [
    {"type": "U.S. Bonds", "pct": 8.9, "detail": usBondsData},
    {"type": "China Stocks", "pct": 11.3, "detail": cnStocksData},
    {"type": "Int\'l Bonds", "pct": 13.7, "detail": intlBondsData},
    {"type": "Forex", "pct": 15.1, "detail": forexData},
    {"type": "Euro/LDN Stocks", "pct": 15.7, "detail": euroLNDStocksData},
    {"type": "Commodities", "pct": 15.9, "detail": commodityData},
    {"type": "U.S. Stocks", "pct": 19.4, "detail": usStocksData},
];
    