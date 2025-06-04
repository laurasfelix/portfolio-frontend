interface itemProp{
    "title": string,
    "text": string[][],
    "icon": string,
    "company"?: string,
    "pictures"?: string[],
    
}

type ItemInfoProp = itemProp[][];

const itemInfo: ItemInfoProp = [

  
    [{
        "title":"introduction",
        "text":[["aaa"]],
        "icon": "/images/user_icon.svg",
    },
    {
        "title":"education",
        "text":[["aaa"]],
        "icon": "/images/education.svg",
    },
    {
        "title":"skills",
        "text":[["aaa"]],
        "icon": "/images/idea.svg",
    },
   ],
  
    [{
        "title":"swe intern",
        "company": "duolingo",
        "text":[[`I interned at Duolingo during the summer of 2024 as a Thrive Software Engineer. The Thrive experience is meant to be a web development learning experience for sophomores – that is, our code doesn’t go into production, our projects can have a wide range of focuses, and we’re separated into intern teams to maximise learning and friendships :) `,
                `My intern team was three other interns and our manager, a L2 Software Engineer. Our project proposal was to create a web application where people could learn languages through songs, Duolingo-style. The tech stack used in this project was React for the frontend, Python for the backend, and DynamoDB for the database. `], 
       [`If you’ve ever used Duolingo, you know those little missing word/shuffle exercises, and that’s what the overall goal was: to make the user engage with the song content through little exercises so they learn. I implemented the missing word and shuffle exercises, but it wasn’t as clear-cut as it sounds. I had a little trouble getting used to the big component system that Duo has in their codebase, and it’s so expansive that they have a website to learn it: which I LOVED using. After some time, everything became easier to use, and I felt like a huge door opened itself to me. `],[
        `One of the biggest challenges I had was working in a group for coding, which I have done before, but not to this intensity and for this amount of time.  It was hard figuring out what was my task, other people’s task, and what we had to merge. And the key to understanding and fixing these conflicts was, as cliche as it sounds, overcommunicating. My team and I sat together, and we talked a lot, a lot, a lot, about what each of us was doing and how to make sure we’re not overstepping tasks, and how to help each other succeed in any way we could.`,
        `Coding-wise, the hardest part was uploading the songs, but not for the reason you think. In our backend, the songs need timestamps for every word and lyric,	their audio and translations for each of them. So, in order to upload a song, you need to have all of that figured out in one go, which is incredibly hard to do manually. In order to automate this process, we used a mix of Duolingo’s internal tools and GPT. First, we got all the lyrics from Google, then, using the language identifier Whisper model, we created a timestamp for every identifiable word in a lyric. Moreover, we also added a GPT-made translation for every word, and made it possible so that one or more words could be part of the same translation, such as:`,
        `“Estou andando até la” → “I am walking there”, where
Estou -> I am 
Andando -> walking
Até la -> there
`,
`Overall, it was an awesome experience! I loved my team, and we went to Picklesburgh, a cat cafe and a furry convention together. I left Duolingo the past summer with way more friends than before, and I’m excited to see how many I’ll gain this summer :)`, 

        

        ]],
        "icon": "/images/duolingo 1.svg",
    },
    {
        "title":"research assistant",
        "company": "northwestern cs",
        "text":[[` I’m a Research Assistant at the MU Collective, under PhD student Charles Cui, working on ways to make high school teachers’ work easier, specifically testing-wise.`],
            [`Work in a team of 10+ other students, professors and PhD candidates in this full-stack web development project using LLMs.`],
            [ ` Not having been super familiar with SQL before, working in a team of 10+ people, almost similar to a startup in a way.`],
            [`My supervisor and I met on a weekly basis to ensure communication was constantly flowing between us, and when the deadline started crunching, we met more often for longer periods of time. He also gave students free Ferrero Rocher, which I’m sure was a third of his budget`,
        ]],
        "icon": "/images/northwestern 1.svg",
    },
    {
        "title":"scholar & extern",
        "company": "citadel",
        "text":[[` I had recently been gotten my summer offer rescinded from Jane Street due to citizenship complications, and I was bummed out. As a result of that, in one of those nights where I suddenly felt like I need to be 300% productive, I ended up applying to Citadel Discovery days, where I talked to a lot of cool, interesting and smart people, recruiters and some c-level executives at Citadel. That experience for sure humbled me, but it made me more excited to learn more.`,

`I ended up emailing their CEO asking for more tips on how to learn, somehow he ended up putting me in contact with their recruiters, and boom, now I had something for the summer. At Citadel. My freshman year. So that was awesome.

`], [
    `My simple brief for the summer was: learn something. Over the first four in-person weeks, that meant pair-programming, building multiple websites, and tackling a final hackathon. (Oh, and I snuck in a side project—a website for my girlfriend—to test my new skills.)`
], [
    `Losing the Jane Street offer shook my confidence right as freshman summer was starting.`,
    `I had never done web development before`,
],
[  `A lot of pair-programming: I scheduled back-to-back coding sessions, absorbing best practices, and getting immediate feedback.
    `,
    `Built real projects: From homework websites to my girlfriend’s site, I applied new concepts (APIs, responsive layouts, basic state management) in concrete deliverables.`,
    `Did awesome in the hackathon: On the final day, I teamed up with other interns, ideated under pressure, and shipped a prototype—cementing everything I’d learned.`

]


],
        "icon": "/images/citadel.svg",
    },
    {
        "title":"swe",
        "company":"bread story (class)",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"amazon music (class)",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"northwestern's formula racing",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"puterfish (class)",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"designer",
        "company":"co2ture (class)",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"bugsnacks (class)",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"puppally (class)",
        "text":[[""]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"sydney react (project)",
        "text":[[""]],
        "icon": "/images/sunflower.svg",
    },
    {
        "title":"pupally",
        "text":[[""]],
        "icon": "/images/puppy.svg",
    }],
    [{
        "title":"jane street",
        "text":[[""]],
        "icon": "/images/puppy.svg",
    }],

    [{
        "title":"folder",
        "text":[[""]],
        "icon": "/images/folder.svg",
    },
    {
        "title":"folder",
        "text":[[""]],
        "icon": "/images/folder.svg",
    }],
 
    [{
        "title":"email",
        "text":[[""]],
        "icon": "/images/email.svg",
    }],




]

export default itemInfo;