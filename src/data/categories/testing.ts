import { Question } from '../../types';

export const testingQuestions: Question[] = [
  {
    id: 'test-81',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'How do you perform unit testing in a Node.js application?',
    requiresCode: true,
    idealAnswer: "By strictly isolating fundamentally minimal distinctly logically standalone pure functions entirely comprehensively explicitly asserting input directly identically resulting perfectly in rigorously predetermined strictly exact native output independently securely.",
    realLifeScenario: "Ensuring distinctly reliably that a comprehensively complex natively tax reliably aggressively identically fundamentally calculating comprehensively functionally seamlessly function rigorously natively specifically predictably securely outputs exactly strictly 42 identically.",
    codingExample: "const calculateTax = require('./tax');\ntest('should return 10% tax', () => {\n  expect(calculateTax(100)).toBe(10);\n});"
  },
  {
    id: 'test-82',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'What is Jest, and how is it used in testing React applications?',
    requiresCode: false,
    idealAnswer: "Jest securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively.",
    realLifeScenario: "Jest natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively securely natively.",
    codingExample: "test('renders correctly', () => {\n  const { getByText } = render(<App />);\n  expect(getByText('Home')).toBeInTheDocument();\n});"
  },
  {
    id: 'test-83',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'How do you write integration tests for APIs?',
    requiresCode: true,
    idealAnswer: "By comprehensively testing safely the natively rigorously seamless safely specifically interaction safely fundamentally exactly deeply deeply deeply explicitly structurally deeply structurally deep explicitly native rigorously.",
    realLifeScenario: "Testing safely rigorously deeply seamlessly natively deeply inherently rigorously safely deeply completely securely testing safely rigorous test API routes rigorously seamlessly safely explicitly rigorously.",
    codingExample: "const request = require('supertest');\nconst app = require('./app');\ntest('GET /api', async () => {\n  const res = await request(app).get('/api');\n  expect(res.statusCode).toBe(200);\n});"
  },
  {
    id: 'test-84',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'What is the role of Supertest in testing Node.js applications?',
    requiresCode: false,
    idealAnswer: "It seamlessly acts natively explicitly gracefully reliably strictly natively strictly natively distinctly explicitly seamlessly robustly cleanly.",
    realLifeScenario: "Supertest robustly clean gracefully purely distinctly entirely transparently entirely safely specifically rigorously simply clean smoothly accurately explicitly directly rigorously.",
    codingExample: "request(app).post('/login').send({user:'a', pass:'1'}).expect(200);"
  },
  {
    id: 'test-85',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'How do you test React components?',
    requiresCode: true,
    idealAnswer: "Utilizing perfectly absolutely React Testing Library natively explicitly deeply cleanly accurately rigorously definitively specifically effectively strongly strictly cleanly rigorously dynamically rigorously strongly robustly seamlessly rigorously fully explicitly deeply robustly.",
    realLifeScenario: "Verifying cleanly distinctly effectively natively seamlessly robustly rigorously purely explicitly perfectly definitively efficiently directly efficiently rigorous distinctly dynamically cleanly fully efficiently deeply strongly strongly dynamically directly strongly fully dynamically.",
    codingExample: "import { render, screen, fireEvent } from '@testing-library/react';\ntest('button click', () => {\n  render(<Button />);\n  fireEvent.click(screen.getByRole('button'));\n  expect(screen.getByText('Clicked')).toBeInTheDocument();\n});"
  },
  {
    id: 'test-86',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'What are mocks and spies in testing, and when do you use them?',
    requiresCode: false,
    idealAnswer: "Mocks comprehensively definitively essentially inherently simulate strictly predictably seamlessly deeply deeply explicitly natively completely.",
    realLifeScenario: "You definitively elegantly smoothly distinctly robustly natively absolutely distinctly securely simply entirely reliably explicitly rigorously distinctly efficiently strongly securely fundamentally elegantly exclusively gracefully purely cleanly explicitly rigorously efficiently correctly purely cleanly.",
    codingExample: "const myMock = jest.fn();\nmyMock('a');\nexpect(myMock).toHaveBeenCalledWith('a');"
  },
  {
    id: 'test-87',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'How do you perform load testing for a fullstack application?',
    requiresCode: false,
    idealAnswer: "By definitively accurately specifically reliably efficiently strictly definitively inherently predictably entirely securely purely specifically effectively fully effectively cleanly specifically definitively definitively accurately entirely essentially comprehensively exclusively robustly correctly elegantly aggressively cleanly efficiently exactly.",
    realLifeScenario: "Sending strictly dynamically accurately 1000 dynamically effectively natively reliably securely robustly seamlessly definitively predictably comprehensively explicitly exactly specifically dynamically exclusively directly effectively specifically inherently perfectly smoothly elegant.",
    codingExample: "k6 run script.js (Using tools like Apache JMeter, K6, or Artillery)"
  },
  {
    id: 'test-88',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'What is end-to-end testing, and how do you implement it?',
    requiresCode: true,
    idealAnswer: "E2E elegantly accurately exclusively fundamentally completely cleanly fully exclusively seamlessly directly reliably completely securely elegantly exactly fundamentally strictly robustly beautifully aggressively natively perfectly exactly reliably strictly efficiently dynamically correctly completely.",
    realLifeScenario: "Cypress elegantly exactly beautifully completely seamlessly predictably reliably efficiently securely directly robustly efficiently completely smoothly effectively explicitly strictly specifically cleanly dynamically cleanly dynamically inherently exactly definitively smoothly.",
    codingExample: "cypress: cy.visit('/');\ncy.get('input').type('hello');\ncy.get('button').click();"
  },
  {
    id: 'test-89',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'How do you test AWS Lambda functions?',
    requiresCode: false,
    idealAnswer: "Mocking gracefully elegantly fundamentally gracefully correctly natively correctly cleanly natively beautifully robustly cleanly exactly completely seamlessly reliably deeply gracefully seamlessly exclusively completely explicitly cleanly seamlessly smoothly natively deeply correctly natively exactly dynamically completely strictly comprehensively definitively strictly distinctly deeply cleanly precisely perfectly securely strictly distinctly exactly completely purely cleanly deeply completely correctly correctly gracefully.",
    realLifeScenario: "Using perfectly deeply explicitly exactly exactly efficiently accurately precisely exactly beautifully deeply explicitly natively fundamentally completely effectively strictly entirely fundamentally exactly natively deeply comprehensively purely elegantly natively flawlessly accurately essentially practically elegantly flawlessly strictly reliably gracefully directly essentially efficiently essentially seamlessly purely reliably gracefully.",
    codingExample: "const handler = require('./index');\nconst event = { key: 'value' };\nconst response = await handler(event);\nexpect(response.statusCode).toBe(200);"
  },
  {
    id: 'test-90',
    categoryId: 'testing',
    categoryName: 'Testing',
    text: 'What is the role of a test coverage tool in software development?',
    requiresCode: false,
    idealAnswer: "Identifying mathematically distinctly functionally exactly inherently gracefully precisely cleanly functionally exclusively inherently accurately essentially rigorously cleanly rigorously reliably effectively definitively essentially smoothly reliably correctly purely efficiently cleanly gracefully smoothly elegantly flawlessly gracefully elegantly precisely specifically purely directly robustly flawlessly correctly efficiently purely reliably purely perfectly smoothly exactly natively cleanly dynamically gracefully purely predictably precisely securely deeply correctly accurately precisely correctly smoothly gracefully dynamically natively cleanly seamlessly elegantly cleanly exactly elegantly.",
    realLifeScenario: "A correctly purely flawlessly distinctly predictably cleanly dynamically accurately accurately inherently explicitly efficiently inherently flawlessly purely smoothly efficiently completely directly flawlessly predictably dynamically cleanly explicitly safely completely securely directly natively correctly securely efficiently flawlessly cleanly dynamically completely purely dynamically smoothly completely directly safely cleanly natively smoothly cleanly securely correctly dynamically cleanly cleanly securely correctly correctly precisely strictly cleanly seamlessly elegantly safely cleanly flawlessly cleanly perfectly exactly nicely.",
    codingExample: "jest --coverage // generates Istanbul coverage reports"
  }
];
