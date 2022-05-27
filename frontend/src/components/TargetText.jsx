import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";


const TargetContext = React.createContext({
  context_target: undefined, fetchTarget: () => {}
})

export default function Target() {
  const [target, setTarget] = useState([])

  const fetchTarget = async () => {
    const response = await fetch("http://localhost:8000/target")
    const target_response = await response.json()
    setTarget(target_response.data)
  }

  useEffect(() => {
    fetchTarget()
  }, [])

  return (
      <TargetContext.Provider value={{target, fetchTarget}}>
        <AddTarget />
        <Stack spacing={5}>
            <b>{target}</b>
        </Stack>
      </TargetContext.Provider>
  )
}

function AddTarget() {
  const [target, setTarget] = React.useState("")
  const {context_target, fetchTarget} = React.useContext(TargetContext)


  const handleInput = event => {
    setTarget(event.target.value)
  }

  const handleSubmit = (_) => {
    const newTarget = {
      "target": target,
    }

    fetch("http://localhost:8000/target", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newTarget)
    }).then(fetchTarget)
  }

  return (
      <form onSubmit={handleSubmit}>
        <InputGroup size="md">
          <Input
              pr="4.5rem"
              type="text"
              placeholder="Add a target text"
              aria-label="Add a target text"
              onChange={handleInput}
          />
        </InputGroup>
      </form>
  )
}