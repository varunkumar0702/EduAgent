from authlib.integrations.starlette_client import OAuth
import os
from dotenv import load_dotenv

load_dotenv()
oauth = OAuth()

oauth.register(
    name="github",
    client_id=os.getenv("Ov23liCO8M7Dacl0RSEC"),
    client_secret=os.getenv("642d8d8219c2367b6da4121e3376d9788bb849d0"),
    authorize_url="https://github.com/login/oauth/authorize",
    access_token_url="https://github.com/login/oauth/access_token",
    client_kwargs={"scope": "read:user repo"},
)
