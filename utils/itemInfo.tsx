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
        "icon": require("@/public/images/user_icon.svg"),
    },
    {
        "title":"education",
        "text":["aaa"],
        "icon": require("@/public/images/education.svg"),
    },
    {
        "title":"skills",
        "text":["aaa"],
        "icon": require("@/public/images/idea.svg"),
    },
   ],
  
    [{
        "title":"swe intern @ duolingo",
        "text":[""],
        "icon": require("@/public/images/duolingo 1.svg"),
    },
    {
        "title":"ta @ northwestern cs",
        "text":[""],
        "icon": require("@/public/images/northwestern 1.svg"),
    },
    {
        "title":"scholar @ citadel",
        "text":[""],
        "icon": require("@/public/images/citadel.svg"),
    }],


    [{
        "title":"bread",
        "text":[""],
        "icon": require("@/public/images/bread.svg"),
    },
    {
        "title":"sunflower",
        "text":[""],
        "icon": require("@/public/images/sunflower.svg"),
    },
    {
        "title":"pupally",
        "text":[""],
        "icon": require("@/public/images/puppy.svg"),
    }],

    [{
        "title":"folder",
        "text":[""],
        "icon": require("@/public/images/folder.svg"),
    },
    {
        "title":"folder",
        "text":[""],
        "icon": require("@/public/images/folder.svg"),
    }],
 
    [{
        "title":"email",
        "text":[""],
        "icon": require("@/public/images/email.svg"),
    }],




]

export default itemInfo;