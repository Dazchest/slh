export const testGuide = {
    id: 154,
    name: "VLT",
    image: "https://blahblah",
    wikiLink: "https://wikiblahblah",
    editMode: true,
    waves: [
        {   camp: 1,
            wave: 1,
            id: 75,
            notes: "this is a tough camp",
            general: "YGG",
            troops: [
                {troopType:"Recruits", qty:100, loss:95},
                {troopType:"Cavalry", qty:150, loss:0},
                {troopType:"", qty:0, loss:0},
                {troopType:"", qty:0, loss:0},
                {troopType:"", qty:0, loss:0},
            ]
        },
        {   camp: 1,
            wave: 2,
            id: 76,
            notes: "this is a tough camp",
            general: "Doris",
            troops: [
                {troopType:"Recruits", qty:100, loss:45},
                {troopType:"Bowman", qty:50, loss:20},
                {troopType:"", qty:0, loss:0},
                {troopType:"", qty:0, loss:0},
                {troopType:"", qty:0, loss:0},
            ]
        },
        {   camp: 2,
            wave: 1,
            id: 79,
            notes: "no notes here",
            general: "Steady",
            troops: [
                {troopType:"Crossbow", qty:10, loss:5},
                {troopType:"Cannon", qty:150, loss:23},
                {troopType:"", qty:0, loss:0},
                {troopType:"", qty:0, loss:0},
                {troopType:"", qty:0, loss:0},
            ]
        }
    ]
}
