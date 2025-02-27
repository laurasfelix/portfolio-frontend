interface itemProp{
    "title": string,
    "text": string[],
    "icon": string,
}

type ItemInfoProp = Record<string, itemProp[]>;

const itemInfo: ItemInfoProp = {

    "about": 
    [{
        "title":"hi",
        "text":["aaa"],
        "icon":"education",
    },
    {
        "title":"hi",
        "text":["aaa"],
        "icon":"education",
    }],
    "exp": 
    [{
        "title":"",
        "text":[""],
        "icon":"",
    }],

    "www": 
    [{
        "title":"",
        "text":[""],
        "icon":"",
    }],

    "games": 
    [{
        "title":"",
        "text":[""],
        "icon":"",
    }],
    "contact": 
    [{
        "title":"",
        "text":[""],
        "icon":"",
    }],




}

export default itemInfo;