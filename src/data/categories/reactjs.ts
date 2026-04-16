import { Question } from '../../types';

export const reactjsQuestions: Question[] = [
  {
    id: 'reactjs-21',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'What is the virtual DOM, and how does it work in React?',
    requiresCode: false,
    idealAnswer: "The VDOM is a lightweight memory representation of the real DOM. React compares the new VDOM to the previous one (diffing), calculates changes, and efficiently batches updates to the real DOM.",
    realLifeScenario: "Rendering a large data table. Instead of rebuilding the entire HTML table when one row changes, React efficiently swaps out just that exact row node.",
    codingExample: "// Internal React implementation logic concept\n// React uses Fiber nodes to represent the VDOM tree\nconst element = React.createElement('h1', null, 'Hello');"
  },
  {
    id: 'reactjs-22',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'What are React hooks? Explain useState and useEffect.',
    requiresCode: true,
    idealAnswer: "Hooks let you use state and lifecycle features in functional components. `useState` stores mutable state. `useEffect` performs side effects (fetching data, DOM mutations).",
    realLifeScenario: "Fetching a user profile on mount. `useEffect` triggers the initial fetch on load, while `useState` stores the JSON response to render the UI.",
    codingExample: "const [user, setUser] = useState(null);\nuseEffect(() => {\n  fetch('/api/me').then(res => res.json()).then(setUser);\n}, []);"
  },
  {
    id: 'reactjs-23',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'What is the difference between controlled and uncontrolled components in React?',
    requiresCode: true,
    idealAnswer: "A controlled component has its state completely driven by React (value+onChange). An uncontrolled component stores its own state internally, accessed via a string or `useRef`.",
    realLifeScenario: "A massive multi-step form is usually controlled for immediate validation. A simple file upload input is often uncontrolled since the browser handles the file data naturally.",
    codingExample: "// Controlled\n<input value={text} onChange={e => setText(e.target.value)} />\n// Uncontrolled\nconst inputRef = useRef();\n<input ref={inputRef} />"
  },
  {
    id: 'reactjs-24',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'How do you handle forms in React?',
    requiresCode: false,
    idealAnswer: "Ideally, by keeping state managed in variables, using an `onSubmit` handler to prevent default behavior, and optionally using libraries like React Hook Form or Formik for complex validation.",
    realLifeScenario: "A signup form validating email formatting and password strength dynamically as the user types, using React Hook Form to prevent useless re-renders.",
    codingExample: "const handleSubmit = (e) => {\n  e.preventDefault();\n  submitData(formData);\n};\n<form onSubmit={handleSubmit}>...</form>"
  },
  {
    id: 'reactjs-25',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'What is Redux, and how does it work with React?',
    requiresCode: false,
    idealAnswer: "Redux is a predictable state container holding application-level state globally. React connects via `useSelector` and modifies state by dispatching pure action objects to reducers.",
    realLifeScenario: "An e-commerce cart accessible deeply nested in header components, checkout pages, and item cards. They all read from the same global Redux slice.",
    codingExample: "const cartItems = useSelector(state => state.cart.items);\ndispatch(addToCart({ id: 1, name: 'Shirt' }));"
  },
  {
    id: 'reactjs-26',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'How does the useReducer hook differ from Redux?',
    requiresCode: true,
    idealAnswer: "`useReducer` handles complex state locally within a component or context. Redux provides a global, highly optimized store with middleware (like thunks/sagas) and dev tools.",
    realLifeScenario: "Switching a massive, complex component's 5 `useState` calls into a single `useReducer` for clean local state management without involving the entire app's Redux architecture.",
    codingExample: "const [state, dispatch] = useReducer(reducer, initialState);\ndispatch({ type: 'INCREMENT' });"
  },
  {
    id: 'reactjs-27',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'Explain the React lifecycle methods and how they map to functional components.',
    requiresCode: false,
    idealAnswer: "Class lifecycles (componentDidMount, componentDidUpdate, componentWillUnmount) map primarily to `useEffect`. The dependency array dictates if it acts as Mount (empty array), Update (variables in array), or Unmount (returned cleanup function).",
    realLifeScenario: "Setting up a WebSocket connection. You connect in the effect body (DidMount), listen to prop changes to reconnect (DidUpdate), and explicitly close the socket in the cleanup return function (WillUnmount).",
    codingExample: "useEffect(() => {\n  const ws = new WebSocket('ws://..');\n  return () => ws.close();\n}, []);"
  },
  {
    id: 'reactjs-28',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'How do you implement routing in React applications?',
    requiresCode: true,
    idealAnswer: "By using libraries like React Router. You define a hierarchy of routes wrapping components, which conditionally render based on window location without performing a full page reload.",
    realLifeScenario: "Separating a public landing page `Route='/'` and a protected dashboard `Route='/admin'`, maintaining client-side state during navigation.",
    codingExample: "<BrowserRouter>\n  <Routes>\n    <Route path='/' element={<Home />} />\n    <Route path='/dashboard' element={<Dashboard />} />\n  </Routes>\n</BrowserRouter>"
  },
  {
    id: 'reactjs-29',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'What is React context, and when should you use it?',
    requiresCode: true,
    idealAnswer: "Context provides a way to pass data deeply through the component tree without passing props down manually at every level (Prop Drilling). Ideal for theme, auth, or locale state.",
    realLifeScenario: "Providing the deep dark mode 'Theme' state to deeply nested button components without having to pass `theme='dark'` through 10 intermediate layout containers.",
    codingExample: "const ThemeContext = createContext('light');\n// High up\n<ThemeContext.Provider value='dark'>\n// Deep down\nconst theme = useContext(ThemeContext);"
  },
  {
    id: 'reactjs-30',
    categoryId: 'reactjs',
    categoryName: 'ReactJS',
    text: 'How do you improve the performance of a React application?',
    requiresCode: false,
    idealAnswer: "Employ `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary renders. Implement Code Splitting via `React.lazy`. Optimize list rendering using windowing libraries like `react-window`.",
    realLifeScenario: "Wrapping a heavy SVG map component in `React.memo` so it doesn't repaint every time the user types a single key into a sibling text input.",
    codingExample: "const ExpensiveChart = React.memo(({ data }) => {\n  return <Chart data={data} />;\n});"
  }
];
