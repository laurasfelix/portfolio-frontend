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
        "icon": "/images/user_icon.svg",
    },
    {
        "title":"education",
        "text":["aaa"],
        "icon": "/images/education.svg",
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon": "/images/idea.svg",
    },
   ],
  
    [{
        "title":"swe intern @ duolingo",
        "text":[""],
        "icon": "/images/duolingo 1.svg",
    },
    {
        "title":"ta @ northwestern cs",
        "text":[""],
        "icon": "/images/northwestern 1.svg",
    },
    {
        "title":"scholar @ citadel",
        "text":[""],
        "icon": "/images/citadel.svg",
    },
    {
        "title":"bread",
        "text":[""],
        "icon": "/images/bread.svg",
    },
    {
        "title":"sunflower",
        "text":[""],
        "icon": "/images/sunflower.svg",
    },
    {
        "title":"pupally",
        "text":[""],
        "icon": "/images/puppy.svg",
    }],
    [{
        "title":"jane street",
        "text":[""],
        "icon": "/images/puppy.svg",
    }],

    [{
        "title":"folder",
        "text":[""],
        "icon": "/images/folder.svg",
    },
    {
        "title":"folder",
        "text":[""],
        "icon": "/images/folder.svg",
    }],
 
    [{
        "title":"email",
        "text":[""],
        "icon": "/images/email.svg",
    }],




]

export default itemInfo;