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
        "text":[[`My class team and I had to write a visual story somehow related to San Francisco. I, of course, suggested a story that’d show how secure a building could be in the face of an earthquake, but my teammate had a more fun take: BREAD. San Francisco bread is pretty well-known, and eating bread for a grade sounds awesome, so we were in. But what would the story be about?
`], [`We had some goals for this project, like having a definite topic, and some kind of interactive element that’d be different from just pictures and text (which is fine, but we wanted to do something different for this class). `],
[` I have NO CLUE about ANYTHING journalism. My team was split up between me, a journalism major and a communications major, and so it was pretty clear from the start what each of our roles were going to be. Nonetheless, we didn’t want to leave this experience in SF without having learned something, so we mixed up some roles sometimes.
`, `Moreover, we had the added challenge of narrowing down our topic from bread. `, `From the wide range of ideas we had, from a little man walking around SF to a museum-like experience for our stories, it was hard to pick which ones we should, and, most importantly, COULD do. 
`], [`First, when it came time to interview people, I asked questions, which I know is not typical for people in my major. 
`, `In one of our interviews with a bakery owner, we realized how much effort she had been putting into Flour and Branch, her and her husband’s bakery. It was as if I had heard a little of her soul from the passion that she had, and that was a HUGE contrast from the CEO of a national bakery we interviewed with. And from those experiences, we came up with: “breaking bread: small bakeries in SF shape community”. `,
` I had to be really honest about what my capabilities were as a 20-year-old who sometimes struggles with semicolons in C++, and, with that, tried to find a sweet spot between “stuff I can learn” and “stuff I need a small company to do”. `,
`And from narrowing down some possibilities and creating others, my team and I came up with the idea of vertical-but-sometimes-horizontal scrollytelling structure for the stories, and some extra interactive elements that tie the story together. If you wanna check it out: https://bread-story.vercel.app/.`],],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"amazon music (class)",
        "text":[[`I spent my winter quarter at Northwestern’s San Francisco campus doing an intensive design program focused on user design and experience. In one of the classes, Bay Area Practicum, my team and I had to work with a client, a Principal Project Manager at Amazon Music, and help them conquer more of our demographic (college students). I was the only CS student, with the other members being journalism majors. `],
    [`My team and I set out a goal to make subscribing to Amazon Music easier and better. It’s no secret that Amazon Music is not wildly successful with people our age, and our goal was to make it slightly better. Our initial ideas were: add a Shazam component into AM; lower the price for college students or create bundles with Twitch (another Amazon product); an in-house data transfer from Spotify to AM, that I fully built out for our demos. `],
[`There were some roadblocks along the way:`, `one of our team members quit before our final showcase because of her internal concerns with Amazon`, `I really didn’t like someone’s ideas for the project, because it was something our client said he definitely wouldn’t do`,
    `Legal concerns with data transfer`, `the goal we set out initially was ambiguous`, `and we seemed to have no data initially (going off word of mouth rather than statistics)`, 
    `Not only that, I’m not the greatest public speaker, and we had to speak at Amazon for our final showcase. Yikes!!!`
],[`In order:`, `I ended up finding out the rest of the group also did not like that member’s idea, and she was the one that left, so we let her idea also go away. Sorry, queen. `, `I found out that the DRM (legal stuff) wasn’t against metadata transfer (song titles, artist name, playlist title, etc), which is what our product did. I pointed that out in our final presentation and got extra cookie points with Amazon employees. I’m sure they will hire me. `,
    `We ended up consolidating the way we presented our ideas more around lowering the burden of points of entry, and making sure our narrative was cohesive when we rehearsed. `,
    `We sent out a survey to ALL of our friends, which also included half the Brazilian population and someone from Ghana, and we found that, thankfully, our ideas worked. `,
    `We rehearsed a lot, and a lot. And I just had to internalize that it wasn’t that serious anyway, and as long as I didn’t say anything ridiculous, it’d be fine. And it was! `
]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"northwestern's formula racing",
        "text":[[`One of the first things I did as a freshman at Northwestern was to join Northwestern’s Formula Racing. I didn’t join out of passion for F1, but for a chance to learn and to prove myself in this club of amazing, hardworking people. They’d been working on their first electric car in the history of NFR, and they took me in under their wing. `], 
    [`As a member of the Software Team, my goal was straightforward (and slightly terrifying): make sure the battery didn’t explode. Kidding—but not kidding. Beyond that, I wanted to pick up real-world skills (my first git commit, push, and pull request) and own a critical slice of the car’s charging system.`],
[`I had some challenges!`, ` As a member of the Software Team, my goal was straightforward (and slightly terrifying): make sure the battery didn’t explode. Kidding—but not kidding. Beyond that, I wanted to pick up real-world skills (my first git commit, push, and pull request) and own a critical slice of the car’s charging system.`, `The chargers’ technical manuals ran dozens of pages—temperature limits, voltage thresholds, power and current specs—and any mistake could mean fried components or a literal exploding battery.
`, `I needed both hardware and firmware chops: writing code for CAN signals and coulomb counting, then jumping into late-night soldering sessions to make sure every connection was rock solid.`],
[`Then:`, ` I created the entire GitHub repo for the car’s ELCON charger, set up branch workflows, and handled my first pull requests.`, `I translated those long technical manuals into working code—developing needed safety measures, implementing CAN communication for both the ELCON and the GWP charger, and adding Coulomb-counting logic to control exactly when charging starts and stops.
`, `Under my mentor’s wing, I became “somewhat” of a soldering expert—logging countless late hours to solder circuit boards and actually work on the physical battery, which, happily, did not explode.`, 
`After a year of laborious work, I was elected Battery Management Team Lead—a role I ultimately didn’t accept due to summer commitments, but one that reflected the trust and impact I’d made on the team.`]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"puterfish (class)",
        "text":[[`I had to take a class called Design Thinking and Doing in order to go to Northwestern’s San Francisco campus for a quarter. And even though I was terrified of what it was going to be like, I enrolled in it.`,],
    [`DTD had only one goal for us: “to have an impact, no matter what you end up doing.” My class team and I took that to heart.`,
        `In our first mandatory shop training class, I couldn’t help but notice how confusing it was to figure out which materials were available, which ones were taken, and which ones were just trash. And speaking of trash—the bins were full of good, usable materials. What’s wrong with Northwestern students?`,
        `From that moment, the idea for Puterfish was born. We wanted to create something with a quantifiable impact on recycling in the shop—not just how to recycle, but where to recycle your materials. Given the nature of the shop, we focused on peer-to-peer recycling, and Puterfish became the embodiment of that idea. It contains recycling guidelines and a shopping center for any kind of design material.`,
    ], [` I had never deployed any project on Vercel before. I’d always relied on PythonAnywhere, GitHub Pages, or—let’s be honest—not deploying at all. So I decided to challenge myself to actually deploy this one.`,
        `Turns out, deploying a monorepo when you’re new to Vercel is a recipe for trial and error. I spent long hours just figuring out the file structure format.
`
    ],[`Eventually, after plenty of digging and debugging, I got it up and running. Puterfish went live, and I walked away with the added knowledge of Vercel fried into my brain. Now I know what to expect, and I’m a lot more confident handling deployments moving forward.`]
],
        "icon": "/images/bread.svg",
    },
    {
        "title":"designer",
        "company":"co2ture (class)",
        "text":[[` For another of my UX classes at NU’s SF campus, my team had to choose a problem we’d like to focus on alleviating. After a lot of back and forth, we decided that fashion sustainability was our project’s habitat. I’m not into fashion like my teammates are, but I still do face a problem of “wow, I do have a lot of clothes”. `],
    [`Make sure people wear their old clothes more often, know when to donate them, and make it easier to swap them. Our big-picture aim was to encourage fashion sustainability and minimize waste by increasing the lifespan of clothing through smarter decisions and community-based exchange.
`], [`We realized quickly that “sustainability” is a massive and abstract problem. One challenge was scope: how could we narrow this into something actionable and useful? 
`, `Our users also varied wildly: some were deeply invested in sustainable fashion, others definitely didn’t care, but still had overflowing closets. We also didn’t want to rely on guilt or shame as a motivator, especially because one of our initial ideas was to have a shaming leaderboard. 
`], [`We designed a mobile app concept called Co2ture. It combines closet tracking, donation reminders, and a friend-swap board. Users upload receipts or pictures, or tag items in their digital closet, and the app nudges them if a piece hasn’t been worn in a while, kind of like a digital closet ghosting detector. They can then choose to donate, keep, or list it for swap.
`, `We incorporated gamification by rewarding users for sustainable choices (e.g., swapping or donating instead of tossing) through something akin to the credit score system. We prototyped flows in Figma, validated the concept with user testing with the key demographic, and refined it based on feedback—like toning it down on the shaming.
`]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"bugsnacks (class)",
        "text":[[`In a computer science class named Agile Software Development, half the course was dedicated to a team of students building whatever they’d like, as long as it somehow fits the course theme of being a web dev product that uses Firebase and Vite.`], [`My team, all computer science students including myself, were interested in an array of ideas, from finding roommates, to job search, and somewhere in between we realized that bugs are annoying to find, especially as a team of students. And, we are very desperate for food, as people who usually feast upon cup noodles. There, we decided to build a web application that would help match bug finders with student dev teams, in exchange for meal exchanges or swipes at dining halls at Northwestern. `], 
    [`First, there’s always the challenge of working in a team, especially with people you’ve never met before in a class environment. Second, there’s the added element that my team ended up choosing Node.js for the backend, where I’m 100% more familiar with Python. So it was definitely a learning experience for me.
`], [`My team was definitely made of very hardworking, cool people, so it wasn’t hard for us to work and trust each other while doing so, and that helped our project immensely. Moreover, we overcommunicated a LOT whenever we did anything, and that’s how our project was born in 5 weeks. `]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"puppally (class)",
        "text":[[`In my design intensive at Northwestern’s SF campus, one of the several interesting homeworks my professor Pam Daniels gave me was:`], [`create a puppy-related chatbot, somehow. My intention was to fully build it out on Vercel using React (frontend) and Python (backend), and the overall idea was to create a puppy helper (akin to the puppy 101 subreddit), where you ask a question regarding your crazy, annoying puppy, and the chatbot answers.
`], [` it was my first time calling OpenAI’s api on my own: trying to figure out how to structure the input and the output, how to prompt engineer it so it’s not out of scope and how to ensure it looked like iMessenger to make the user feel more at home with the UI.`], [`Although I was nervous to call a big boy API like OpenAI’s, it ended up being a two-liner that didn’t give me any headache, so I could say that the solution was always within me, I just had to go for it. Prompt engineering it was a little more tricky, but it’s all just direction in the end, and as a CS student, you need to be able to give some direction.
`]],
        "icon": "/images/bread.svg",
    },
    {
        "title":"swe",
        "company":"sydney react (project)",
        "text":[[`It’s insanely near my girlfriend’s birthday, and the current website I made for her is outdated (made with HTML and basic JS), so, I thought, why not make a new version of her website?`],
    [`Build a better website for Sydney somehow, using React rather than whatever I was using before, and build a Sydney Wordle full of inside jokes we have!
`], [`I’ve never built a wordle before?? But that does sounds awesome. I was basically starting from zero on the game side of things.
`], [`I broke the game mechanics down piece by piece: figuring out the logic for checking letters, handling user input, and displaying the correct feedback (green, yellow, gray). I reused React hooks and state patterns I knew, but bent them in ways I hadn’t before. It took some prototyping (and a lot of laughing at our inside jokes), but in the end, I shipped a fully working Sydney Wordle.

`, `I also created around 114 words for her wordle, and whenever I think of more, I just add it on there 🙂
`]],
        "icon": "/images/sunflower.svg",
    },],
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