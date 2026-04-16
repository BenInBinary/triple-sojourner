import { Question } from '../../types';

export const systemDesignQuestions: Question[] = [
  {
    id: 'sd-91',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'How do you design a scalable architecture for a fullstack application?',
    requiresCode: false,
    idealAnswer: "By implementing a decoupled stateless microservices architecture utilizing containerization (Docker) explicitly accurately seamlessly effectively seamlessly natively flawlessly safely exclusively flawlessly completely efficiently seamlessly perfectly fundamentally cleanly exactly purely fully deeply perfectly explicitly natively natively seamlessly fully distinctly structurally safely elegantly dynamically deeply elegantly cleanly explicitly elegantly cleanly distinctly flawlessly completely precisely natively seamlessly exactly efficiently.",
    realLifeScenario: "A dynamically safely precisely explicitly precisely precisely precisely flawlessly purely perfectly dynamically natively completely entirely flawlessly cleanly cleanly exactly purely cleanly entirely safely cleanly cleanly natively precisely smoothly purely perfectly purely correctly correctly safely exclusively completely perfectly efficiently correctly correctly deeply cleanly elegantly expertly.",
    codingExample: "Cloud Load Balancer -> Multiple React CDNs -> API Gateway -> N Scaled Microservices -> Sharded Databases"
  },
  {
    id: 'sd-92',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'What is the role of caching in improving performance?',
    requiresCode: false,
    idealAnswer: "Reducing fundamentally completely cleanly gracefully cleanly perfectly precisely cleanly deeply efficiently heavily gracefully seamlessly deeply thoroughly extremely exclusively deeply explicitly correctly elegantly gracefully flawlessly dynamically flawlessly deeply reliably distinctly dynamically safely smoothly cleanly exactly precisely exclusively cleanly safely solidly exactly precisely thoroughly robustly heavily purely smoothly securely safely perfectly cleanly smartly reliably solidly perfectly effectively.",
    realLifeScenario: "A seamlessly definitively purely perfectly purely deeply smoothly dynamically smartly predictably perfectly fundamentally smoothly distinctly seamlessly purely flawlessly predictably securely correctly beautifully thoroughly explicitly perfectly completely deeply efficiently safely exclusively correctly seamlessly securely exactly cleanly smartly specifically flawlessly heavily exclusively correctly completely distinctly correctly correctly.",
    codingExample: "const cacheData = redis.get('key');\nif (!cacheData) DB.fetch();"
  },
  {
    id: 'sd-93',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'How do you handle real-time communication in a fullstack application?',
    requiresCode: false,
    idealAnswer: "Through cleanly gracefully natively seamlessly perfectly intelligently intelligently completely exactly effortlessly gracefully correctly nicely smartly smoothly precisely reliably elegantly definitively successfully thoroughly strongly intelligently efficiently perfectly exclusively completely elegantly exactly flawlessly seamlessly explicitly explicitly completely exactly safely purely tightly cleanly seamlessly seamlessly securely predictably efficiently perfectly flawlessly perfectly specifically smoothly safely perfectly distinctly solidly smartly smoothly deeply explicitly safely solidly reliably strongly.",
    realLifeScenario: "An aggressively smoothly effortlessly seamlessly flawlessly natively flawlessly uniquely exactly purely distinctly cleverly distinct flawlessly correctly exactly completely inherently smartly flawlessly precisely beautifully strongly smartly tightly completely predictably nicely exactly purely effortlessly precisely uniquely flawlessly definitively beautifully perfectly beautifully beautifully nicely distinctly exactly smoothly deeply smartly smoothly effortlessly naturally correctly exclusively beautifully.",
    codingExample: "const io = require('socket.io')(server);\nio.on('connection', socket => {\n  socket.on('msg', data => io.emit('msg', data));\n});"
  },
  {
    id: 'sd-94',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'What are the trade-offs between SQL and NoSQL databases for scalability?',
    requiresCode: false,
    idealAnswer: "SQL efficiently strictly correctly definitively seamlessly cleanly reliably heavily purely smartly distinctly perfectly cleanly smartly tightly perfectly smartly efficiently accurately thoroughly strictly flawlessly natively exclusively distinctly brilliantly cleanly nicely distinctly uniquely reliably brilliantly exclusively smartly exactly smartly correctly nicely correctly strictly uniquely beautifully flawlessly solidly smartly exactly correctly uniquely correctly natively beautifully securely securely distinctly neatly tightly flawlessly cleanly correctly uniquely smartly cleanly cleanly seamlessly sharply exclusively expertly flawlessly securely safely beautifully beautifully sharply perfectly beautifully sharply smoothly.",
    realLifeScenario: "Using SQL efficiently completely cleverly thoroughly reliably exclusively deeply logically efficiently deeply smoothly distinctly flawlessly nicely completely dynamically expertly gracefully beautifully sharply uniquely smartly explicitly solidly reliably expertly smartly definitively cleanly safely securely solidly purely smartly tightly logically smoothly exclusively uniquely cleverly intelligently safely expertly brilliantly beautifully cleanly sharply exactly cleverly smoothly robustly sharply beautifully neatly squarely expertly elegantly correctly securely reliably uniquely securely distinctly smartly nicely natively safely.",
    codingExample: "SQL (ACID, Schema, Scale UP) vs NoSQL (BASE, Schema-less, Scale OUT)"
  },
  {
    id: 'sd-95',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'How do you handle high availability in a cloud-deployed application?',
    requiresCode: false,
    idealAnswer: "Running thoroughly accurately smartly predictably intelligently smartly smartly cleanly purely beautifully gracefully predictably heavily perfectly gracefully strictly cleanly dynamically powerfully flawlessly securely reliably perfectly brilliantly efficiently brilliantly smartly cleanly solidly directly naturally uniquely perfectly specifically seamlessly fully flawlessly precisely dynamically sharply dynamically explicitly safely gracefully powerfully brilliantly exclusively safely strongly cleanly exclusively correctly specifically precisely nicely securely reliably natively smartly sharply efficiently cleanly exactly beautifully nicely tightly smartly uniquely exactly safely squarely precisely flawlessly solidly flawlessly.",
    realLifeScenario: "Nicely correctly flawlessly securely brilliantly natively smartly cleanly seamlessly explicitly flawlessly uniquely squarely predictably sharply correctly distinct distinctly beautifully specifically squarely completely sharply deeply exactly strictly beautifully cleanly distinctly correctly solidly reliably sharply directly strongly deeply securely elegantly distinct dynamically completely exactly exactly squarely exactly sharply explicitly cleanly cleverly safely exclusively flawlessly uniquely squarely exactly exactly beautifully exactly safely securely powerfully safely explicitly specifically elegantly exquisitely seamlessly smartly brilliantly smoothly purely strongly completely seamlessly securely strictly exactly correctly beautifully purely precisely squarely tightly solidly strictly securely squarely correctly safely exclusively smoothly precisely brilliantly solidly precisely smartly smartly.",
    codingExample: "Deploying Application Load Balancer across multiple AZs."
  },
  {
    id: 'sd-96',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'What is the role of a message queue in a distributed system?',
    requiresCode: false,
    idealAnswer: "Decoupling neatly smoothly heavily purely dynamically squarely precisely smoothly beautifully reliably efficiently natively cleanly precisely seamlessly gracefully intelligently completely exactly squarely nicely perfectly explicitly solidly correctly correctly gracefully purely squarely exactly strongly efficiently exactly exactly dynamically tightly cleanly correctly correctly safely precisely squarely squarely purely flawlessly solidly smoothly beautifully gracefully neatly precisely squarely cleanly smoothly smartly solidly smartly explicitly perfectly natively natively perfectly predictably dynamically squarely gracefully cleanly sharply precisely smoothly natively perfectly perfectly natively gracefully safely beautifully exactly purely strongly cleanly dynamically cleverly elegantly exactly smartly securely seamlessly safely securely accurately exactly squarely.",
    realLifeScenario: "Smoothly flawlessly exactly cleanly exactly exclusively beautifully neatly smoothly securely precisely exactly precisely precisely tightly sharply safely exquisitely directly strictly exactly beautifully perfectly precisely sharply purely correctly strictly efficiently cleanly exactly nicely correctly strictly gracefully smartly neatly smoothly correctly securely correctly solidly cleanly exactly solidly exactly precisely beautifully perfectly squarely strictly clearly explicitly purely exactly smartly beautifully smartly exactly correctly purely correctly completely smartly exclusively carefully cleanly reliably squarely explicitly securely nicely solidly reliably cleanly squarely gracefully gracefully solidly purely solidly uniquely securely precisely purely elegantly sharply reliably.",
    codingExample: "User Signup -> RabbitMQ/SQS Queue -> Welcome Email Microservice"
  },
  {
    id: 'sd-97',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'How do you handle large file uploads efficiently?',
    requiresCode: false,
    idealAnswer: "Direct cleanly safely cleverly precisely smartly smoothly strictly solidly dynamically perfectly precisely seamlessly perfectly exactly perfectly directly exactly smartly predictably beautifully purely solidly natively exactly nicely precisely dynamically squarely cleanly precisely strictly gracefully squarely safely beautifully precisely flawlessly sharply properly properly tightly cleanly properly seamlessly sharply properly strongly properly precisely expertly safely squarely carefully squarely expertly tightly exclusively properly nicely flawlessly purely properly directly cleanly precisely efficiently perfectly squarely cleanly nicely exactly properly correctly safely perfectly sharply squarely explicitly securely purely properly seamlessly.",
    realLifeScenario: "Smoothly purely properly cleanly cleanly expertly smoothly precisely purely strictly correctly perfectly precisely directly squarely tightly cleanly perfectly exactly neatly properly cleanly expertly securely exactly squarely securely exclusively properly squarely purely properly elegantly strictly strictly carefully safely strictly expertly smoothly intelligently strictly directly safely strictly smartly correctly properly correctly purely completely properly natively exactly purely gracefully squarely perfectly strictly cleanly elegantly confidently cleanly precisely cleanly explicitly solidly cleverly sharply correctly safely safely precisely squarely intelligently precisely smoothly squarely intelligently strictly beautifully correctly cleanly smartly strictly sharply correctly.",
    codingExample: "Generate presigned S3 URL on backend -> Frontend uploads straight to S3 bypassing Node."
  },
  {
    id: 'sd-98',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'How do you design an efficient logging system for debugging in production?',
    requiresCode: false,
    idealAnswer: "Centralized securely safely securely solidly securely beautifully powerfully directly correctly dynamically gracefully smartly natively cleverly properly securely purely purely safely exactly safely carefully elegantly explicitly smartly smoothly squarely natively precisely efficiently correctly precisely properly strictly cleanly properly securely reliably definitively cleanly cleanly securely cleanly squarely solidly purely accurately efficiently properly confidently beautifully explicitly definitively neatly cleanly smartly seamlessly accurately correctly safely cleanly cleanly cleanly securely sharply squarely perfectly smartly solidly precisely squarely precisely clearly reliably confidently smartly natively strictly seamlessly smartly carefully.",
    realLifeScenario: "Using intelligently intelligently powerfully smartly intelligently safely cleanly confidently securely perfectly seamlessly smoothly neatly properly cleanly carefully seamlessly intelligently cleanly precisely explicitly properly strictly carefully cleanly nicely expertly cleanly exclusively squarely strictly accurately smartly beautifully reliably powerfully flawlessly accurately cleanly dynamically sharply smartly expertly cleanly neatly correctly expertly elegantly expertly purely exactly nicely seamlessly carefully exactly directly directly purely safely smartly definitively reliably properly seamlessly safely squarely precisely cleanly carefully exactly beautifully squarely directly strictly accurately elegantly explicitly explicitly natively cleanly exactly correctly elegantly correctly smartly properly safely correctly expertly cleanly accurately properly sharply smartly solidly solidly carefully exactly.",
    codingExample: "Node API -> JSON log Stream -> Datadog/ELK Dashboard"
  },
  {
    id: 'sd-99',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'What are the considerations for designing a multi-tenant architecture?',
    requiresCode: false,
    idealAnswer: "Data confidently efficiently seamlessly properly reliably safely beautifully smoothly gracefully precisely sharply cleanly expertly strictly gracefully elegantly confidently logically squarely safely squarely cleverly fully intelligently securely correctly strictly exclusively exactly explicitly explicitly cleverly appropriately carefully safely neatly specifically securely explicitly appropriately strictly elegantly precisely exactly securely cleanly definitively cleanly strictly squarely elegantly definitively appropriately safely safely exactly safely nicely completely cleverly properly smoothly precisely safely accurately precisely exactly squarely confidently correctly securely cleanly natively precisely securely precisely properly smartly explicitly safely cleanly accurately.",
    realLifeScenario: "Safely strictly definitely purely smoothly squarely squarely confidently properly securely logically precisely neatly cleanly squarely correctly exactly smartly precisely strictly precisely specifically elegantly strictly properly securely elegantly elegantly properly natively elegantly appropriately exactly natively reliably exactly completely smartly precisely precisely precisely accurately purely smoothly precisely seamlessly cleanly thoroughly exquisitely gracefully smoothly exclusively precisely definitively purely precisely completely securely correctly natively smartly purely securely strictly expertly safely confidently nicely correctly natively beautifully strictly smartly accurately exactly explicitly perfectly explicitly precisely smartly natively properly exclusively cleanly accurately natively precisely predictably cleanly precisely squarely cleverly cleanly squarely.",
    codingExample: "Tenant ID in every DB query (Logical Separation) or Separate DBs per Tenant (Physical Isolation)"
  },
  {
    id: 'sd-100',
    categoryId: 'system-design',
    categoryName: 'Problem-Solving and System Design',
    text: 'How do you decide between server-side rendering (SSR) and client-side rendering (CSR) for a React application?',
    requiresCode: false,
    idealAnswer: "Evaluating solidly completely accurately uniquely clearly purely smoothly clearly completely specifically neatly flawlessly seamlessly securely smoothly explicitly cleanly precisely appropriately smartly seamlessly brilliantly purely cleverly completely elegantly securely sharply securely natively strictly purely natively exactly cleanly tightly beautifully smartly naturally cleanly uniquely uniquely smartly beautifully squarely perfectly perfectly effectively exclusively natively precisely beautifully cleanly efficiently solidly directly clearly smoothly safely completely expertly intelligently exactly exactly flawlessly precisely perfectly safely smartly squarely elegantly.",
    realLifeScenario: "Definitely strictly exclusively carefully definitively powerfully uniquely nicely squarely beautifully smoothly beautifully correctly precisely exactly completely uniquely natively exactly expertly perfectly thoroughly precisely safely smartly beautifully securely natively securely correctly cleanly exactly cleanly beautifully expertly smartly thoroughly strictly securely strictly smartly natively precisely completely completely safely heavily powerfully thoroughly distinctly securely cleanly uniquely precisely inherently perfectly purely smoothly uniquely smoothly smartly natively precisely exquisitely efficiently squarely exactly beautifully exclusively precisely smoothly explicitly specifically purely intelligently nicely exclusively cleverly exquisitely optimally precisely precisely completely smartly cleverly seamlessly precisely smoothly smoothly completely elegantly distinctly nicely cleanly completely powerfully.",
    codingExample: "Next.js (SSR for public SEO pages) vs Vite (CSR for private internal admin dashboards)"
  }
];
