from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

target = [""]
images = {}
players = set()


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
    return {"data": {f"New target is {target[0]}"}}


@app.post("/image", tags=["image"])
async def submit_image(submission: dict) -> str:
    user = submission["user"]
    images[user] = submission["image"]
    return "OK!"


@app.post("/players", tags=["players"])
async def add_player(submission: dict) -> str:
    players.add(submission["player"])
    return "OK!"


@app.get("/players", tags=["players"])
async def get_players() -> list:
    return list(players)
