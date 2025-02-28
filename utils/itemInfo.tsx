interface itemProp{
    "title": string,
    "text": string[],
    "icon": string,
}

type ItemInfoProp = Record<string, itemProp[]>;

const itemInfo: ItemInfoProp = {

    "about": 
    [{
        "title":"education",
        "text":["aaa"],
        "icon":"education",
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon":"idea",
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon":"idea",
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon":"idea",
    },{
        "title":"skills",
        "text":["aaa"],
        "icon":"idea",
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon":"idea",
    }],
    "exp": 
    [{
        "title":"swe intern @ duolingo",
        "text":[""],
        "icon":"",
    },
    {
        "title":"ta @ northwestern cs",
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