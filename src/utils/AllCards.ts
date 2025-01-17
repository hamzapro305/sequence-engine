import { EngineT } from "./SequenceEngine";

const AllCards: EngineT.Card[] = [
    {
        id: 1,
        img: "1B.svg",
        matches: [],
    },
    {
        id: 2,
        img: "2S.svg",
        matches: [2, 87],
    },
    {
        id: 3,
        img: "3S.svg",
        matches: [3, 86],
    },
    {
        id: 4,
        img: "4S.svg",
        matches: [4, 85],
    },
    {
        id: 5,
        img: "5S.svg",
        matches: [5, 84],
    },
    {
        id: 6,
        img: "6S.svg",
        matches: [6, 83],
    },
    {
        id: 7,
        img: "7S.svg",
        matches: [7, 82],
    },
    {
        id: 8,
        img: "8S.svg",
        matches: [8, 72],
    },
    {
        id: 9,
        img: "9S.svg",
        matches: [9, 62],
    },
    {
        id: 10,
        img: "1B.svg",
        matches: [],
    },
    {
        id: 11,
        img: "6C.svg",
        matches: [11, 33],
    },
    {
        id: 12,
        img: "5C.svg",
        matches: [12, 34],
    },
    {
        id: 13,
        img: "4C.svg",
        matches: [13, 35],
    },
    {
        id: 14,
        img: "3C.svg",
        matches: [14, 36],
    },
    {
        id: 15,
        img: "2C.svg",
        matches: [15, 37],
    },
    {
        id: 16,
        img: "AH.svg",
        matches: [16, 47],
    },
    {
        id: 17,
        img: "KH.svg",
        matches: [17, 57],
    },
    {
        id: 18,
        img: "QH.svg",
        matches: [18, 67],
    },
    {
        id: 19,
        img: "TH.svg",
        matches: [19, 66],
    },
    {
        id: 20,
        img: "TS.svg",
        matches: [20, 52],
    },
    {
        id: 21,
        img: "7C.svg",
        matches: [21, 43],
    },
    {
        id: 22,
        img: "AS.svg",
        matches: [22, 50],
    },
    {
        id: 23,
        img: "2D.svg",
        matches: [23, 60],
    },
    {
        id: 24,
        img: "3D.svg",
        matches: [24, 70],
    },
    {
        id: 25,
        img: "4D.svg",
        matches: [25, 80],
    },
    {
        id: 26,
        img: "5D.svg",
        matches: [26, 90],
    },
    {
        id: 27,
        img: "6D.svg",
        matches: [27, 99],
    },
    {
        id: 28,
        img: "7D.svg",
        matches: [28, 98],
    },
    {
        id: 29,
        img: "9H.svg",
        matches: [29, 65],
    },
    {
        id: 30,
        img: "QS.svg",
        matches: [30, 42],
    },
    {
        id: 31,
        img: "8C.svg",
        matches: [31, 53],
    },
    {
        id: 32,
        img: "KS.svg",
        matches: [32, 40],
    },
    {
        id: 33,
        img: "6C.svg",
        matches: [11, 33],
    },
    {
        id: 34,
        img: "5C.svg",
        matches: [12, 34],
    },
    {
        id: 35,
        img: "4C.svg",
        matches: [13, 35],
    },
    {
        id: 36,
        img: "3C.svg",
        matches: [14, 36],
    },
    {
        id: 37,
        img: "2C.svg",
        matches: [15, 37],
    },
    {
        id: 38,
        img: "8D.svg",
        matches: [38, 97],
    },
    {
        id: 39,
        img: "8H.svg",
        matches: [39, 64],
    },
    {
        id: 40,
        img: "KS.svg",
        matches: [32, 40],
    },
    {
        id: 41,
        img: "9C.svg",
        matches: [41, 63],
    },
    {
        id: 42,
        img: "QS.svg",
        matches: [30, 42],
    },
    {
        id: 43,
        img: "7C.svg",
        matches: [21, 43],
    },
    {
        id: 44,
        img: "6H.svg",
        matches: [44, 59],
    },
    {
        id: 45,
        img: "5H.svg",
        matches: [45, 69],
    },
    {
        id: 46,
        img: "4H.svg",
        matches: [46, 79],
    },
    {
        id: 47,
        img: "AH.svg",
        matches: [16, 47],
    },
    {
        id: 48,
        img: "9D.svg",
        matches: [48, 96],
    },
    {
        id: 49,
        img: "7H.svg",
        matches: [49, 54],
    },
    {
        id: 50,
        img: "AS.svg",
        matches: [22, 50],
    },
    {
        id: 51,
        img: "TC.svg",
        matches: [51, 73],
    },
    {
        id: 52,
        img: "TS.svg",
        matches: [20, 52],
    },
    {
        id: 53,
        img: "8C.svg",
        matches: [31, 53],
    },
    {
        id: 54,
        img: "7H.svg",
        matches: [49, 54],
    },
    {
        id: 55,
        img: "2H.svg",
        matches: [55, 88],
    },
    {
        id: 56,
        img: "3H.svg",
        matches: [56, 89],
    },
    {
        id: 57,
        img: "KH.svg",
        matches: [17, 57],
    },
    {
        id: 58,
        img: "TD.svg",
        matches: [58, 95],
    },
    {
        id: 59,
        img: "6H.svg",
        matches: [44, 59],
    },
    {
        id: 60,
        img: "2D.svg",
        matches: [23, 60],
    },
    {
        id: 61,
        img: "QC.svg",
        matches: [61, 74],
    },
    {
        id: 62,
        img: "9S.svg",
        matches: [9, 62],
    },
    {
        id: 63,
        img: "9C.svg",
        matches: [41, 63],
    },
    {
        id: 64,
        img: "8H.svg",
        matches: [39, 64],
    },
    {
        id: 65,
        img: "9H.svg",
        matches: [29, 65],
    },
    {
        id: 66,
        img: "TH.svg",
        matches: [19, 66],
    },
    {
        id: 67,
        img: "QH.svg",
        matches: [18, 67],
    },
    {
        id: 68,
        img: "QD.svg",
        matches: [68, 94],
    },
    {
        id: 69,
        img: "5H.svg",
        matches: [45, 69],
    },
    {
        id: 70,
        img: "3D.svg",
        matches: [24, 70],
    },
    {
        id: 71,
        img: "KC.svg",
        matches: [71, 75],
    },
    {
        id: 72,
        img: "8S.svg",
        matches: [8, 72],
    },
    {
        id: 73,
        img: "TC.svg",
        matches: [51, 73],
    },
    {
        id: 74,
        img: "QC.svg",
        matches: [61, 74],
    },
    {
        id: 75,
        img: "KC.svg",
        matches: [71, 75],
    },
    {
        id: 76,
        img: "AC.svg",
        matches: [76, 81],
    },
    {
        id: 77,
        img: "AD.svg",
        matches: [77, 92],
    },
    {
        id: 78,
        img: "KD.svg",
        matches: [78, 93],
    },
    {
        id: 79,
        img: "4H.svg",
        matches: [46, 79],
    },
    {
        id: 80,
        img: "4D.svg",
        matches: [25, 80],
    },
    {
        id: 81,
        img: "AC.svg",
        matches: [76, 81],
    },
    {
        id: 82,
        img: "7S.svg",
        matches: [7, 82],
    },
    {
        id: 83,
        img: "6S.svg",
        matches: [6, 83],
    },
    {
        id: 84,
        img: "5S.svg",
        matches: [5, 84],
    },
    {
        id: 85,
        img: "4S.svg",
        matches: [4, 85],
    },
    {
        id: 86,
        img: "3S.svg",
        matches: [3, 86],
    },
    {
        id: 87,
        img: "2S.svg",
        matches: [2, 87],
    },
    {
        id: 88,
        img: "2H.svg",
        matches: [55, 88],
    },
    {
        id: 89,
        img: "3H.svg",
        matches: [56, 89],
    },
    {
        id: 90,
        img: "5D.svg",
        matches: [26, 90],
    },
    {
        id: 91,
        img: "1B.svg",
        matches: [],
    },
    {
        id: 92,
        img: "AD.svg",
        matches: [77, 92],
    },
    {
        id: 93,
        img: "KD.svg",
        matches: [78, 93],
    },
    {
        id: 94,
        img: "QD.svg",
        matches: [68, 94],
    },
    {
        id: 95,
        img: "TD.svg",
        matches: [58, 95],
    },
    {
        id: 96,
        img: "9D.svg",
        matches: [48, 96],
    },
    {
        id: 97,
        img: "8D.svg",
        matches: [38, 97],
    },
    {
        id: 98,
        img: "7D.svg",
        matches: [28, 98],
    },
    {
        id: 99,
        img: "6D.svg",
        matches: [27, 99],
    },
    {
        id: 100,
        img: "1B.svg",
        matches: [],
    },
    {
        id: 101,
        img: "JD.png",
        matches: [],
    },
    {
        id: 102,
        img: "JD.png",
        matches: [],
    },
    {
        id: 103,
        img: "JC.png",
        matches: [],
    },
    {
        id: 104,
        img: "JC.png",
        matches: [],
    },
    {
        id: 105,
        img: "JS.png",
        matches: [],
    },
    {
        id: 106,
        img: "JS.png",
        matches: [],
    },
    {
        id: 107,
        img: "JH.png",
        matches: [],
    },
    {
        id: 108,
        img: "JH.png",
        matches: [],
    },
];

export default AllCards