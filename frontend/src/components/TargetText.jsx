import React, { useEffect, useState } from "react";
import {
    Input,
    InputGroup,
} from "@chakra-ui/react";


export default function Target() {
  const [target, setTarget] = useState([])

  const fetchTarget = async () => {
    const response = await fetch("http://localhost:8000/target")
    const target_response = await response.json()
    setTarget(target_response.data)
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

  const handleInput = event => {
    setTarget(event.target.value)
  }

  useEffect(() => {
    fetchTarget()
  }, [])

  return (
    <div>
        <b>{target}</b>
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
    </div>
  )
}