from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

target = [""]


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/target", tags=["target"])
async def get_target() -> dict:
    print(f"Getting target", flush=True)
    return {"data": target[0]}


@app.post("/target", tags=["target"])
async def set_target(new_target: dict) -> dict:
    target[0] = new_target["target"]
    return {
        "data": {f"New target is {target[0]}"}
    }
