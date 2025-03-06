interface itemProp{
    "title": string,
    "text": string[],
    "icon": string,
}

type ItemInfoProp = itemProp[][];

const itemInfo: ItemInfoProp = [

  
    [{
        "title":"introduction",
        "text":["aaa"],
        "icon":"user_icon",
    },
    {
        "title":"education",
        "text":["aaa"],
        "icon":"education",
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon":"idea",
    },
   ],
  
    [{
        "title":"swe intern @ duolingo",
        "text":[""],
        "icon":"duolingo 1",
    },
    {
        "title":"ta @ northwestern cs",
        "text":[""],
        "icon":"northwestern 1",
    },
    {
        "title":"scholar @ citadel",
        "text":[""],
        "icon":"citadel",
    }],


    [{
        "title":"bread",
        "text":[""],
        "icon":"bread",
    },
    {
        "title":"sunflower",
        "text":[""],
        "icon":"sunflower",
    },
    {
        "title":"pupally",
        "text":[""],
        "icon":"puppy",
    }],

    [{
        "title":"folder",
        "text":[""],
        "icon":"folder",
    },
    {
        "title":"folder",
        "text":[""],
        "icon":"folder",
    }],
 
    [{
        "title":"email",
        "text":[""],
        "icon":"email",
    }],




]

export default itemInfo;