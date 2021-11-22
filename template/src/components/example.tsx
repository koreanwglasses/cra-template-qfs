/**
 * This component is an example of how you can create responsive elements
 * independently of the data. Assumes you have a working knowledge of
 * TypeScript and React. You can read more here:
 * https://www.typescriptlang.org/docs/
 * https://reactjs.org/docs/getting-started.html
 *
 * MUI (Material UI library for React) has been included to speed up development
 * https://mui.com/getting-started/usage/
 */

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useReducer, useState } from "react";

/**
 * This component is declared as an anonymous function. Alternatively, it could
 * be declared as a named function `function Example(...) { ... }` or a class
 * `class Example extends React.Component { ... }`.
 */
const Example = ({
  imageUrl, // <-- Declare any data you need (from the server, locally, etc.) as
  title, /////     props. When developing, mock/make up your own data. Eventually,
  users, /////     the required data will be fetched from the server and passed
  messages, //     in on mount.
  /* Add props as needed */
  onUpdate, // <-- When the user interacts with the component, use this callback
}: ///////////     to propagate any changes upstream (i.e. to the server, parent
//////////////     component, local store, etc.)
{
  imageUrl: string; // <-- Types are declared using TypeScript syntax.
  title: string;
  users: { username: string }[];
  messages: string[];
  /* Add prop types as needed */
  onUpdate: (updatedData: { messages: string[] }) => void;
}) => {
  /**
   * You can keep track of component state in a function component by using
   * the `useState(...)` hook. Read more about useState and other hooks here:
   * https://reactjs.org/docs/hooks-intro.html
   */
  const [isHidden, setIsHidden] = useState(false);

  return (
    /**
     * The `<Box/>` component is provided by MUI as an alternative to `<div/>`
     *
     * Use the `sx` prop to quickly define static styles. Notation is similar
     * to regular CSS. Read more here: https://mui.com/system/the-sx-prop/.
     * This prop is available on all MUI components.
     *
     * Use the `style` prop for frequently changing styles.
     *
     * For more information on the styling/customization options provided by
     * MUI, see https://mui.com/customization/how-to-customize/
     */
    <Box sx={{ width: 300, m: 1, p: 1, border: 1 }}>
      <Box
        sx={{ transition: "max-height 0.3s", overflow: "clip" }}
        style={{ maxHeight: isHidden ? 0 : 200 }}
      >
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
        {/* Below is an example of using onUpdate to send changes upstream */}
        <Button onClick={() => onUpdate({ messages: [...messages, "hi!"] })}>
          Say hi!
        </Button>
      </Box>
      <Button
        sx={{ backgroundColor: "cyan" }}
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? "Show" : "Hide"}
      </Button>
    </Box>
  );
};

/**
 * This component is exported as default. Alternatively, we could have exported
 * Example directly above, like `export const Example = (...) => {...}`
 */
export default Example;

/**
 * When developing your component, use a `ComponenNameProvider` component to
 * mock the data that will be used in your component. Eventually, this will
 * dynamically pull/push data from the server
 */
export const ExampleProvider = () => {
  /**
   * This is a simple reducer that will keep track of any new messages
   */
  const [state, dispatch] = useReducer(
    (
      state: { messages: string[] },
      action: { type: "updateMessages"; payload: { messages: string[] } }
    ) => {
      if (action.type === "updateMessages") {
        state.messages = action.payload.messages;
      }
      return { ...state };
    },
    { messages: ["Hello World!"] }
  );

  /**
   * Pass in data to your component
   */
  return (
    <Example
      imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/240px-Typescript_logo_2020.svg.png"
      title="Example"
      users={[{ username: "alice" }, { username: "bob" }]}
      messages={state.messages}
      onUpdate={(updatedData) =>
        dispatch({
          type: "updateMessages",
          payload: { messages: updatedData.messages },
        })
      }
    />
  );
};
